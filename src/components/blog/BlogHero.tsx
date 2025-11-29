"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";

interface BlogHeroProps {
    searchQuery: string;
    onSearch: (query: string) => void;
}

export default function BlogHero({ searchQuery, onSearch }: BlogHeroProps) {
    const context = useLanguage();
    const language = context?.language || "en";

    const content = {
        en: {
            badge: "Fluxive Blog",
            title: "IT & Marketing Insights for",
            highlight: "Belgian Businesses",
            description: "Practical guides on Wi-Fi, local SEO, cybersecurity, and technology for hotels, restaurants, and small businesses across Belgium.",
            placeholder: "Search articles..."
        },
        nl: {
            badge: "Fluxive Blog",
            title: "IT & Marketing Inzichten voor",
            highlight: "Belgische Bedrijven",
            description: "Praktische gidsen over Wi-Fi, lokale SEO, cybersecurity en technologie voor hotels, restaurants en kleine bedrijven in België.",
            placeholder: "Zoek artikelen..."
        },
        fr: {
            badge: "Blog Fluxive",
            title: "Idées IT & Marketing pour",
            highlight: "Entreprises Belges",
            description: "Guides pratiques sur le Wi-Fi, le SEO local, la cybersécurité et la technologie pour les hôtels, restaurants et PME en Belgique.",
            placeholder: "Rechercher des articles..."
        }
    };

    const t = content[language];

    return (
        <section className="relative pt-32 pb-16 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary-500 to-accent-500" />
            <div className="container mx-auto px-4 relative z-10 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
                    {t.badge}
                </span>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                    {t.title} <span className="gradient-text">{t.highlight}</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                    {t.description}
                </p>

                <div className="max-w-md mx-auto relative">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder={t.placeholder}
                            className="pl-10 py-6 rounded-full border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-primary-500"
                            value={searchQuery}
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
