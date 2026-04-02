"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Lightbulb, Loader2 } from "lucide-react";
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

import { useState, useEffect } from "react";

export default function Hero() {
  const langContext = useLanguage();
  const lang: Language =
    (langContext?.language as Language) === "en" ||
      (langContext?.language as Language) === "fr" ||
      (langContext?.language as Language) === "nl"
      ? (langContext?.language as Language)
      : "nl";

  const t = heroTexts[lang];

  const [idea, setIdea] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmitIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setSubmitMessage("");

    if (!idea.trim()) {
      setSubmitStatus("error");
      setSubmitMessage(lang === "nl" ? "Vul a.u.b. een idee in." : lang === "fr" ? "Veuillez entrer une idée." : "Please enter an idea.");
      return;
    }

    if (!businessName.trim() && !email.trim()) {
      setSubmitStatus("error");
      setSubmitMessage(lang === "nl" ? "Vul een bedrijfsnaam of e-mail in." : lang === "fr" ? "Veuillez entrer un nom d'entreprise ou un e-mail." : "Please enter a business name or email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit_idea.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, businessName, email }),
      });
      const data = await response.json();
      if (response.ok && data.ok) {
        setSubmitStatus("success");
        setSubmitMessage(lang === "nl" ? "Idee succesvol verzonden!" : lang === "fr" ? "Idée soumise avec succès !" : "Idea submitted successfully!");
        setIdea("");
        setBusinessName("");
        setEmail("");
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Failed to submit idea.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-32">
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
                <a href="http://www.hotel-koffieboontje.be/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">
                  Hotel Koffieboontje
                </a>
                <a href="https://koffieboontjebudget.be/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">
                  Koffieboontje Budget
                </a>
                <a href="http://www.bikerentalkoffieboontje.be/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">
                  Adventure Bike Rental
                </a>
                <a href="http://www.fidelaccountants.be/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">
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

          {/* Right Ad Container (Absolute Floating in Margin only) */}
          <motion.div
            className="hidden xl:flex flex-col absolute top-auto bottom-[15%] xl:bottom-[40%] right-2 xl:right-4 2xl:right-8 xl:w-80 2xl:w-[400px] rounded-2xl overflow-hidden glass-card border border-white/20 dark:border-white/10 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] group z-20 hover:shadow-[0_20px_60px_rgba(8,_112,_184,_0.3)] transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Animated Glow Behind Media */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 via-transparent to-secondary-500/20 animate-pulse-slow pointer-events-none" />

            {/* Headline */}
            <div className="relative z-10 w-full bg-black/40 backdrop-blur-md border-b border-white/10 py-3 px-4 flex items-center justify-between">
              <span className="text-[10px] lg:text-xs font-bold tracking-widest text-white uppercase flex items-center gap-2 truncate pr-2">
                <Lightbulb className="w-4 h-4 text-primary-400 flex-shrink-0" />
                {lang === "nl" ? "Pitch Je Idee" : lang === "fr" ? "Proposez votre Idée" : "Pitch Your Idea"}
              </span>
              <span className="text-[10px] bg-primary-500 text-white px-2 py-0.5 rounded-full font-bold animate-pulse flex-shrink-0">
                NEW
              </span>
            </div>

            <div className="relative flex-1 w-full h-full p-4">
              <form onSubmit={handleSubmitIdea} className="flex flex-col gap-3">
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                  {lang === "nl" ? "Heb je een idee voor een digitale oplossing? Laat het ons weten. Vul je bedrijfsnaam óf e-mailadres in." : lang === "fr" ? "Avez-vous une idée de solution numérique ? Entrez le nom de votre entreprise ou votre e-mail." : "Have an idea for a digital solution? Pitch it to us. Enter your business name or email address to submit."}
                </p>

                <div>
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder={lang === "nl" ? "Jouw Idee..." : lang === "fr" ? "Votre Idée..." : "Your Idea..."}
                    required
                    rows={3}
                    className="w-full bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder={lang === "nl" ? "Bedrijfsnaam" : lang === "fr" ? "Nom de l'entreprise" : "Business Name"}
                    required={!email.trim()}
                    className="w-full bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={lang === "nl" ? "E-mailadres" : lang === "fr" ? "Adresse e-mail" : "Email Address"}
                    required={!businessName.trim()}
                    className="w-full bg-white/50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {submitMessage && (
                  <p className={`text-xs mt-1 font-medium ${submitStatus === "error" ? "text-red-500" : "text-green-500"}`}>
                    {submitMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-primary-600 hover:bg-primary-500 text-white shadow-lg transition-all border-none"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Lightbulb className="w-4 h-4 mr-2" />
                  )}
                  {isSubmitting ? (lang === "nl" ? "Verzenden..." : lang === "fr" ? "Envoi..." : "Submitting...") : (lang === "nl" ? "Idee indienen" : lang === "fr" ? "Soumettre l'idée" : "Submit Idea")}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={scrollToServices}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer group z-20"
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


    </>
  );
}
