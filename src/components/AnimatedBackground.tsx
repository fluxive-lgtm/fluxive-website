"use client";

import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Floating Orbs - Professional and Subtle with Green Brand Colors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-float-slow opacity-60 dark:bg-primary/5" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl animate-pulse-slow opacity-50 dark:bg-emerald-400/5" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-teal-400/8 rounded-full blur-3xl animate-float-slow opacity-55 dark:bg-teal-400/5" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-primary/6 rounded-full blur-3xl animate-pulse-slow opacity-45 dark:bg-primary/4" style={{ animationDelay: "3s" }} />
      
      {/* Additional subtle orbs for depth with green tones */}
      <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-green-400/6 rounded-full blur-3xl animate-float-slow opacity-40 dark:bg-green-400/4" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-1/2 right-1/2 w-48 h-48 bg-emerald-500/6 rounded-full blur-3xl animate-pulse-slow opacity-35 dark:bg-emerald-500/4" style={{ animationDelay: "2.5s" }} />
    </div>
  );
}
