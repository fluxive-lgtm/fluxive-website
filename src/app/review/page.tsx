"use client";

import { useLanguage } from "@/context/LanguageContext";
import ReviewForm from "@/components/ReviewForm";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function ReviewPage() {
    const { language } = useLanguage();

    const content = {
        en: {
            title: "Share Your Experience",
            subtitle: "Your feedback helps us improve and serve you better.",
            badge: "Review Us",
        },
        nl: {
            title: "Deel uw Ervaring",
            subtitle: "Uw feedback helpt ons te verbeteren en u beter van dienst te zijn.",
            badge: "Beoordeel Ons",
        },
        fr: {
            title: "Partagez Votre Expérience",
            subtitle: "Vos commentaires nous aident à nous améliorer et à mieux vous servir.",
            badge: "Évaluez-nous",
        },
    };

    const t = content[language as keyof typeof content] || content.en;

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6"
                    >
                        <Star className="w-4 h-4 fill-current" />
                        {t.badge}
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6">
                        {t.title}
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {t.subtitle}
                    </p>
                </motion.div>

                <ReviewForm isEmbedded={true} />
            </div>
        </main>
    );
}
