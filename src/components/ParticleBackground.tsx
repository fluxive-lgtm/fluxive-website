"use client";

import { useEffect, useRef } from "react";

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ===== 🎛️ PARTICLE CONFIGURATION (ADJUST THESE!) =====
    const CONFIG = {
      particleCount: 100,           // Number of particles (50-200 recommended)
      baseSpeed: 3,                 // Initial speed multiplier (1-5 recommended)
      maxSpeed: 4,                  // Maximum speed limit (2-6 recommended)
      minSpeed: 0.5,                // Minimum speed to keep moving (0.3-1 recommended)
      friction: 0.992,              // Friction (0.99 = high, 0.995 = low, closer to 1 = faster)
      mouseRepelStrength: 0.8,      // How strong mouse pushes particles (0.3-1.5)
      mouseRepelRadius: 150,        // Mouse interaction radius in pixels (100-250)
      connectionDistance: 120,      // Max distance to draw lines between particles (80-150)
      randomNudgeChance: 0.98,      // How often to add random movement (0.95-0.99, higher = less random)
    };
    // ======================================================

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;

    // Create particles with configured speed
    for (let i = 0; i < CONFIG.particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * CONFIG.baseSpeed,
        vy: (Math.random() - 0.5) * CONFIG.baseSpeed,
        size: Math.random() * 2 + 1,
      });
    }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
    };

    // Reset mouse moving flag after a delay
    let mouseMoveTimeout: NodeJS.Timeout;
    const handleMouseMoveDebounced = (e: MouseEvent) => {
      handleMouseMove(e);
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Check current theme
      const isDark = document.documentElement.classList.contains("dark");
      const particleColor = isDark ? "#00DC82" : "#00643C";
      const connectionColor = isDark ? "0, 220, 130" : "0, 100, 60";

      // Draw particles and connections
      particles.forEach((particle, i) => {
        // Mouse interaction - repel particles
        if (isMouseMoving) {
          const dx = particle.x - mouseX;
          const dy = particle.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONFIG.mouseRepelRadius) {
            const force = (CONFIG.mouseRepelRadius - distance) / CONFIG.mouseRepelRadius;
            const angle = Math.atan2(dy, dx);
            particle.vx += Math.cos(angle) * force * CONFIG.mouseRepelStrength;
            particle.vy += Math.sin(angle) * force * CONFIG.mouseRepelStrength;
          }
        }

        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Apply friction
        particle.vx *= CONFIG.friction;
        particle.vy *= CONFIG.friction;

        // Keep particles within bounds with smooth bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Add subtle random movement occasionally
        if (Math.random() > CONFIG.randomNudgeChance) {
          particle.vx += (Math.random() - 0.5) * 0.1;
          particle.vy += (Math.random() - 0.5) * 0.1;
        }

        // Minimum speed to keep particles moving
        const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
        if (speed < CONFIG.minSpeed) {
          const angle = Math.random() * Math.PI * 2;
          particle.vx += Math.cos(angle) * CONFIG.minSpeed;
          particle.vy += Math.sin(angle) * CONFIG.minSpeed;
        }

        // Limit max speed
        if (speed > CONFIG.maxSpeed) {
          particle.vx = (particle.vx / speed) * CONFIG.maxSpeed;
          particle.vy = (particle.vy / speed) * CONFIG.maxSpeed;
        }

        // Draw particle with theme-aware color
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.shadowBlur = 5;
        ctx.shadowColor = particleColor;
        ctx.fill();

        // Draw connections to nearby particles
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONFIG.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(${connectionColor}, ${1 - distance / CONFIG.connectionDistance})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMouseMoveDebounced);
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMoveDebounced);
      window.removeEventListener("resize", handleResize);
      clearTimeout(mouseMoveTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
