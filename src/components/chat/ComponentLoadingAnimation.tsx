"use client"

import { motion } from "framer-motion"
import { Code, Sparkles, Zap } from "lucide-react"

export function ComponentLoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center justify-center gap-4 py-8 px-6 rounded-2xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20"
    >
      {/* Animated Icon Container */}
      <div className="relative">
        {/* Outer Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-20 h-20"
        >
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary" />
        </motion.div>

        {/* Inner Pulsing Circle */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center"
        >
          {/* Code Icon */}
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Code className="h-8 w-8 text-primary" />
          </motion.div>
        </motion.div>

        {/* Floating Sparkles */}
        <motion.div
          animate={{ 
            y: [-10, -20, -10],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          className="absolute -top-4 -right-4"
        >
          <Sparkles className="h-4 w-4 text-primary" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [-10, -20, -10],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          className="absolute -bottom-4 -left-4"
        >
          <Zap className="h-4 w-4 text-primary" />
        </motion.div>
      </div>

      {/* Animated Text */}
      <div className="text-center space-y-2">
        <motion.h3
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-lg font-semibold text-primary"
        >
          Generating
        </motion.h3>
        
        {/* Animated Dots */}
        <div className="flex items-center justify-center gap-1">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            className="text-muted-foreground"
          >
            Building
          </motion.div>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          >
            .
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          >
            .
          </motion.span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs h-1.5 bg-primary/10 rounded-full overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>
    </motion.div>
  )
}
