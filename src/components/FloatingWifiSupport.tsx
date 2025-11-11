// src/components/FloatingWifiSupport.tsx
"use client";

import { motion } from "framer-motion";
import { LifeBuoy } from "lucide-react";

interface FloatingWifiSupportProps {
  onClick?: () => void;
}

export default function FloatingWifiSupport({
  onClick,
}: FloatingWifiSupportProps) {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      onClick={handleClick}
      className="fixed bottom-6 left-4 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-2 shadow-xl shadow-primary-500/40 hover:from-primary-600 hover:to-secondary-600 text-xs sm:text-sm md:text-base"
    >
      <LifeBuoy className="w-4 h-4" />
      24/7 Wi-Fi Support
    </motion.button>
  );
}
