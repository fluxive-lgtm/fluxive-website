"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const stats = [
  { label: "Projects Completed", value: 500, suffix: "+" },
  { label: "Happy Clients", value: 200, suffix: "+" },
  { label: "Years Experience", value: 10, suffix: "+" },
  { label: "Team Members", value: 50, suffix: "+" },
];

// Advanced animation variants with GPU optimization
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
    }
  }
};

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.8
    }
  }
};

const statsItemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number]  // Custom spring-like easing
    }
  }
};

export default function Hero() {

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Mesh Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Badge className="mb-4 sm:mb-6 text-sm sm:text-base px-4 py-1.5 sm:px-6 sm:py-2 glass-card border-primary-500/30 animate-float">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Next-Gen IT Solutions
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6 leading-tight px-2"
          >
            Transform Your Business with{" "}
            <span className="gradient-text">FLUXIVE</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 mb-8 sm:mb-12 max-w-3xl mx-auto px-2 leading-relaxed"
          >
            Premium IT Services, Marketing Solutions, AI Automation, Web Development, 
            Penetration Testing & Cybersecurity - All Under One Roof
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-base sm:text-lg px-6 py-5 sm:px-8 sm:py-6 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 group"
              onClick={scrollToContact}
            >
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto text-base sm:text-lg px-6 py-5 sm:px-8 sm:py-6 glass-card border-primary-500/30 hover:bg-primary-500/10"
              onClick={scrollToServices}
            >
              Explore Services
            </Button>
          </motion.div>

          {/* Animated Stats */}
          <motion.div
            variants={statsContainerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-12 sm:mt-16 md:mt-20 px-2"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={statsItemVariants}
                className="glass-card p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl hover:scale-105 transition-transform"
                style={{
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  WebkitFontSmoothing: "antialiased"
                }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold gradient-text mb-1 sm:mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Clickable */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer group"
        onClick={scrollToServices}
      >
        <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex items-start justify-center p-2 group-hover:border-primary-400 transition-colors group-hover:shadow-lg group-hover:shadow-primary-500/50">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-primary-500 rounded-full group-hover:bg-primary-400"
          />
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-center">
          Scroll Down
        </p>
      </motion.div>
    </section>
  );
}
