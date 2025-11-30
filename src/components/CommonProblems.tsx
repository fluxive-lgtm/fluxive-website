"use client";

import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

type Language = "nl" | "en" | "fr";

type ProblemCategory = {
    title: string;
    items: string[];
};

type CommonProblemsContent = {
    heading: string;
    subheading: string;
    categories: {
        hotels: ProblemCategory;
        business: ProblemCategory;
        home: ProblemCategory;
    };
    cta: string;
};

const content: Record<Language, CommonProblemsContent> = {
    en: {
        heading: "Does This Sound Familiar?",
        subheading: "If you're facing these issues, we can help.",
        categories: {
            hotels: {
                title: "For Hotels & Restaurants",
                items: [
                    "Guests complaining about slow or no Wi-Fi in certain rooms",
                    "You don't show up when people search for you on Google",
                    "You're losing bookings to competitors with better online presence",
                ],
            },
            business: {
                title: "For Businesses",
                items: [
                    "Employees can't connect in meeting rooms or certain offices",
                    "Worried about cybersecurity but don't know where to start",
                    "Outdated website that doesn't bring in customers",
                ],
            },
            home: {
                title: "For Homeowners",
                items: [
                    "Wi-Fi works downstairs but not upstairs",
                    "Buffering during Netflix, gaming, or video calls",
                    "No signal in the garden or basement",
                ],
            },
        },
        cta: "We solve these problems every day – Contact us",
    },
    nl: {
        heading: "Klinkt dit bekend?",
        subheading: "Als je deze problemen herkent, kunnen wij helpen.",
        categories: {
            hotels: {
                title: "Voor Hotels & Restaurants",
                items: [
                    "Gasten klagen over trage of geen wifi in bepaalde kamers",
                    "Je verschijnt niet wanneer mensen je zoeken op Google",
                    "Je verliest boekingen aan concurrenten met een betere online aanwezigheid",
                ],
            },
            business: {
                title: "Voor Bedrijven",
                items: [
                    "Werknemers hebben geen verbinding in vergaderzalen of kantoren",
                    "Bezorgd over cybersecurity maar weet niet waar te beginnen",
                    "Verouderde website die geen klanten oplevert",
                ],
            },
            home: {
                title: "Voor Huiseigenaren",
                items: [
                    "Wifi werkt beneden maar niet boven",
                    "Buffering tijdens Netflix, gamen of videogesprekken",
                    "Geen signaal in de tuin of kelder",
                ],
            },
        },
        cta: "Wij lossen deze problemen dagelijks op – Contacteer ons",
    },
    fr: {
        heading: "Cela vous dit quelque chose ?",
        subheading: "Si vous rencontrez ces problèmes, nous pouvons vous aider.",
        categories: {
            hotels: {
                title: "Pour Hôtels & Restaurants",
                items: [
                    "Les clients se plaignent du Wi-Fi lent ou absent dans certaines chambres",
                    "Vous n'apparaissez pas quand on vous cherche sur Google",
                    "Vous perdez des réservations au profit de concurrents mieux visibles",
                ],
            },
            business: {
                title: "Pour les Entreprises",
                items: [
                    "Les employés ne peuvent pas se connecter en salle de réunion",
                    "Inquiet pour la cybersécurité mais ne savez pas par où commencer",
                    "Site web obsolète qui n'apporte pas de clients",
                ],
            },
            home: {
                title: "Pour les Particuliers",
                items: [
                    "Le Wi-Fi fonctionne en bas mais pas à l'étage",
                    "Mise en mémoire tampon pendant Netflix, les jeux ou les appels vidéo",
                    "Pas de signal dans le jardin ou la cave",
                ],
            },
        },
        cta: "Nous résolvons ces problèmes tous les jours – Contactez-nous",
    },
};

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function CommonProblems() {
    const langContext = useLanguage();
    const rawLang = (langContext?.language as Language) || "nl";
    const language: Language =
        rawLang === "en" || rawLang === "fr" || rawLang === "nl" ? rawLang : "nl";

    const t = content[language];

    const scrollToContact = () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
                        {t.heading}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {t.subheading}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                >
                    {/* Hotels & Restaurants */}
                    <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-6">
                            <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-6">{t.categories.hotels.title}</h3>
                        <ul className="space-y-4">
                            {t.categories.hotels.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Business */}
                    <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6">
                            <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-6">{t.categories.business.title}</h3>
                        <ul className="space-y-4">
                            {t.categories.business.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Homeowners */}
                    <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-6">
                            <AlertCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-6">{t.categories.home.title}</h3>
                        <ul className="space-y-4">
                            {t.categories.home.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                    <span className="text-gray-600 dark:text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <Button
                        size="lg"
                        onClick={scrollToContact}
                        className="bg-primary-600 hover:bg-primary-700 text-white text-lg px-8 py-6 h-auto shadow-xl hover:shadow-primary-500/20 transition-all"
                    >
                        {t.cta}
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
