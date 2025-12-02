"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Language = "nl" | "en" | "fr";

type HeroCopy = {
  badge: string;
  headingHighlight: string;
  headingSuffix: string;
  subheading: string;
  supportingText: string;
  primaryCta: string;
  secondaryCta: string;
  scrollLabel: string;
};

const heroTexts: Record<Language, HeroCopy> = {
  nl: {
    badge: "Fluxive — IT, Cybersecurity & Marketing",
    headingHighlight: "IT & Marketing",
    headingSuffix: "onder één dak — Voor hotels, restaurants, kmo's & particulieren in België",
    subheading:
      "Stop met het jongleren met meerdere leveranciers. Krijg enterprise-grade Wi-Fi, cybersecurity en digitale marketing van één vertrouwde partner. Meer directe boekingen. Geen dode zones. Volledige gemoedsrust.",
    supportingText: "Vertrouwd door 15+ Belgische bedrijven, waaronder:",
    primaryCta: "Vraag je gratis audit aan",
    secondaryCta: "Bekijk onze diensten",
    scrollLabel: "Scroll naar beneden",
  },
  en: {
    badge: "Fluxive — Next-Gen IT & Cybersecurity",
    headingHighlight: "IT & Marketing",
    headingSuffix: "Under One Roof—For Hotels, Restaurants, SMEs & Homeowners in Belgium",
    subheading:
      "Stop juggling multiple vendors. Get enterprise-grade Wi-Fi, cybersecurity, and digital marketing from one trusted partner. More direct bookings. Zero dead zones. Complete peace of mind.",
    supportingText: "Trusted by 15+ Belgian businesses, including:",
    primaryCta: "Get Your Free Assessment",
    secondaryCta: "See Our Services",
    scrollLabel: "Scroll Down",
  },
  fr: {
    badge: "Fluxive — IT, Cybersécurité & Marketing digital",
    headingHighlight: "IT & Marketing",
    headingSuffix: "sous un même toit — Pour hôtels, restaurants, PME & particuliers en Belgique",
    subheading:
      "Arrêtez de jongler avec plusieurs fournisseurs. Obtenez un Wi-Fi de qualité entreprise, la cybersécurité et le marketing digital d'un partenaire de confiance. Plus de réservations directes. Zéro zone morte. Tranquillité d'esprit totale.",
    supportingText: "Recommandé par plus de 15 entreprises belges, dont :",
    primaryCta: "Obtenez votre audit gratuit",
    secondaryCta: "Voir nos services",
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
            <span className="gradient-text">{t.headingHighlight}</span> {t.headingSuffix}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            {t.subheading}
          </motion.p>

          {/* Supporting Text & Clients */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 font-medium mb-3">
              {t.supportingText}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
              <a
                href="http://www.hotel-koffieboontje.be/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
              >
                Hotel Koffieboontje
              </a>
              <a
                href="https://koffieboontjebudget.be/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
              >
                Koffieboontje Budget
              </a>
              <a
                href="http://www.bikerentalkoffieboontje.be/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
              >
                Adventure Bike Rental
              </a>
              <a
                href="http://www.fidelaccountants.be/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-500 transition-colors"
              >
                FIDEL Accountants
              </a>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
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
