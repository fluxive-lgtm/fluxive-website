"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub", color: "hover:bg-gray-700" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-blue-600" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "hover:bg-sky-500" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-pink-600" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "hover:bg-blue-700" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0 },
};

export default function FloatingSocial() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 space-y-4 hidden md:flex flex-col"
    >
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <motion.div
            key={social.label}
            variants={itemVariants}
            whileHover={{ scale: 1.1, x: -5 }}
            animate={{
              y: [0, -10, 0],
              x: 0, // Explicitly set x to 0 so whileHover doesn't break
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
              },
            }}
          >
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <Button
                variant="outline"
                size="icon"
                className={`glass-card border-primary-500/30 ${social.color} transition-all duration-300`}
              >
                <Icon className="w-5 h-5" />
              </Button>
              
              {/* Tooltip */}
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {social.label}
              </span>
            </a>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
