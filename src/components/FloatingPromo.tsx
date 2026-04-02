"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Wifi, ArrowRight, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Language = "nl" | "en" | "fr";

const promoTexts: Record<Language, { label: string; title: string; desc: string; cta: string }> = {
    en: {
        label: "Free Consultation",
        title: "Free Wi-Fi & Website Audit",
        desc: "Get a comprehensive report on your network performance and online presence.",
        cta: "Get Audit Report",
    },
    nl: {
        label: "Gratis Advies",
        title: "Gratis Wi-Fi & Website Audit",
        desc: "Ontvang een uitgebreid rapport over uw netwerkprestaties en online aanwezigheid.",
        cta: "Krijg Audit Rapport",
    },
    fr: {
        label: "Consultation Gratuite",
        title: "Audit Wi-Fi & Site Web Gratuit",
        desc: "Obtenez un rapport complet sur les performances de votre réseau et votre présence en ligne.",
        cta: "Obtenir le rapport",
    },
};

export function FloatingPromo() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const langContext = useLanguage();
    const lang: Language =
        (langContext?.language as Language) === "en" ||
            (langContext?.language as Language) === "fr" ||
            (langContext?.language as Language) === "nl"
            ? (langContext?.language as Language)
            : "nl";

    const t = promoTexts[lang];

    useEffect(() => {
        // Auto-open after 1.5 seconds for a nice entrance animation
        const timer = setTimeout(() => {
            if (!isDismissed) {
                setIsOpen(true);
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [isDismissed]);

    if (isDismissed) return null;

    const handleCtaClick = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
    };

    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex items-start">
            {/* Main Trigger Button */}
            <motion.button
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={() => setIsOpen(!isOpen)}
                className="
          relative group flex flex-col items-center justify-center 
          bg-[#5DDB89] hover:bg-[#4bc978]
          text-white shadow-lg shadow-green-500/20
          rounded-r-lg py-6 px-2 cursor-pointer
          hover:pl-3 transition-all duration-300 w-10 hover:w-12
        "
            >
                {/* Pulse Animation Background */}
                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-r-xl" />

                {/* Icon */}
                <div className="relative z-10 mb-3">
                    <FileText className="w-5 h-5 animate-bounce" style={{ animationDuration: '3s' }} />
                </div>

                {/* Vertical Text */}
                <div className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">
                    {t.label}
                </div>
            </motion.button>

            {/* Expanded Content Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 4, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="
              ml-2 bg-white dark:bg-gray-900 
              border border-primary-500/20 
              rounded-xl shadow-2xl 
              p-5 w-72 md:w-80
              relative overflow-hidden
            "
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Content */}
                        <div className="flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-1">
                                <Wifi className="w-5 h-5" />
                            </div>

                            <h3 className="font-display font-bold text-lg leading-tight">
                                {t.title}
                            </h3>

                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                {t.desc}
                            </p>

                            <button
                                onClick={handleCtaClick}
                                className="
                  mt-2 flex items-center justify-center gap-2 
                  w-full bg-gradient-to-r from-primary-500 to-secondary-500 
                  hover:from-primary-600 hover:to-secondary-600 
                  text-white text-sm font-medium py-2.5 rounded-lg 
                  transition-all hover:shadow-lg hover:shadow-primary-500/25
                "
                            >
                                {t.cta}
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => setIsDismissed(true)}
                                className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-center mt-1 underline decoration-dotted"
                            >
                                Don't show again
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
