"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Language = "nl" | "en" | "fr";

type HeroCopy = {
  badge: string;
  headingPrefix: string;
  subheading: string;
  primaryCta: string;
  secondaryCta: string;
  scrollLabel: string;
};

const heroTexts: Record<Language, HeroCopy> = {
  nl: {
    badge: "Fluxive — IT, Cybersecurity & Marketing",
    headingPrefix: "Transformeer je bedrijf met",
    subheading:
      "Premium IT-diensten, netwerk- en Wi-Fi-optimalisatie, digitale marketing, AI-automatisatie, webdevelopment, penetratietesten en cybersecurity — allemaal onder één dak.",
    primaryCta: "Start je project",
    secondaryCta: "Bekijk de diensten",
    scrollLabel: "Scroll naar beneden",
  },
  en: {
    badge: "Fluxive — Next-Gen IT & Cybersecurity",
    headingPrefix: "Transform your business with",
    subheading:
      "Premium IT services, network and Wi-Fi optimisation, digital marketing, AI automation, web development, penetration testing and cybersecurity — all under one roof.",
    primaryCta: "Start Your Project",
    secondaryCta: "Explore Services",
    scrollLabel: "Scroll Down",
  },
  fr: {
    badge: "Fluxive — IT, Cybersécurité & Marketing digital",
    headingPrefix: "Transformez votre entreprise avec",
    subheading:
      "Services IT premium, optimisation réseau et Wi-Fi, marketing digital, automatisation IA, développement web, tests de pénétration et cybersécurité — le tout sous un même toit.",
    primaryCta: "Lancez votre projet",
    secondaryCta: "Découvrir nos services",
    scrollLabel: "Faire défiler",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

export default function Hero() {
  const langContext = useLanguage();
  const lang: Language =
    (langContext?.language as Language) === "en" ||
    (langContext?.language as Language) === "fr" ||
    (langContext?.language as Language) === "nl"
      ? (langContext?.language as Language)
      : "nl";

  const t = heroTexts[lang];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-float" />
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary-500 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <Badge className="mb-6 text-base px-6 py-3 glass-card border-primary-500/30 animate-float">
              <Sparkles className="w-4 h-4 mr-2" />
              {t.badge}
            </Badge>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
          >
            {t.headingPrefix} <span className="gradient-text">FLUXIVE</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            {t.subheading}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 px-8 py-6 text-lg"
              onClick={scrollToContact}
            >
              {t.primaryCta}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="glass-card border-primary-500/30 hover:bg-primary-500/10 px-8 py-6 text-lg"
              onClick={scrollToServices}
            >
              {t.secondaryCta}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToServices}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer group"
      >
        <div className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center p-2 group-hover:border-primary-400">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-primary-500 rounded-full group-hover:bg-primary-400"
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center opacity-0 group-hover:opacity-100 transition">
          {t.scrollLabel}
        </p>
      </motion.div>
    </section>
  );
}
