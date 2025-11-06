"use client";

import { useEffect, useRef } from "react";

export function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
    }> = [];

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Create trail particles
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 10,
          y: mouseY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
          size: Math.random() * 3 + 1,
        });
      }

      // Limit particles
      if (particles.length > 100) {
        particles.splice(0, particles.length - 100);
      }
    };

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        p.vy += 0.1; // Gravity

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle with theme-aware colors
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Check current theme from DOM (not from hook - it won't update in animation loop)
        const isDark = document.documentElement.classList.contains("dark");
        const color = isDark ? "0, 220, 130" : "0, 80, 50"; // Bright green vs MUCH darker green
        ctx.fillStyle = `rgba(${color}, ${p.life * 0.8})`; // Reduced opacity in light mode
        ctx.fill();

        // Glow effect - stronger in dark, subtle in light
        ctx.shadowBlur = isDark ? 10 : 5;
        ctx.shadowColor = isDark ? "#00DC82" : "#005032";
      }

      ctx.shadowBlur = 0;
      requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ 
        mixBlendMode: "normal" // Changed from "screen" - screen makes everything too bright in light mode
      }}
    />
  );
}
