"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

interface Project {
    id: number;
    title: string;
    title_nl?: string;
    title_fr?: string;
    description: string;
    description_nl?: string;
    description_fr?: string;
    content_en?: string;
    image_url: string;
    media?: { type: 'image' | 'video', path: string }[];
    created_at: string;
}

const translations = {
    title: {
        nl: "Ons Werk",
        en: "Our Work",
        fr: "Notre Travail"
    },
    subtitle: {
        nl: "Bekijk enkele van onze recente projecten en succesverhalen.",
        en: "Check out some of our recent projects and success stories.",
        fr: "Découvrez certains de nos projets récents et histoires de réussite."
    }
};

export default function OurWork() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Use PHP API endpoint
                const response = await fetch("/api/projects");
                const contentType = response.headers.get("content-type");

                if (response.ok && contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    setProjects(data);
                } else {
                    console.warn("API returned non-JSON response. Using empty state.");
                    setProjects([]);
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const t = translations;
    const currentLang = (language as keyof typeof translations.title) || 'en';

    // Filter projects based on current language content availability
    const filteredProjects = projects.filter(project => {
        // More lenient fallback content checking so projects still show up even if a field is missing.
        const hasNL = project.title_nl && project.title_nl.trim() !== "";
        const hasFR = project.title_fr && project.title_fr.trim() !== "";
        const hasAny = project.title && project.title.trim() !== "";

        if (currentLang === 'nl') return hasNL || hasAny;
        if (currentLang === 'fr') return hasFR || hasAny;
        return hasAny;
    });

    if (loading) {
        return (
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                </div>
            </section>
        );
    }

    if (filteredProjects.length === 0) {
        return null; // Don't show section if no projects
    }

    return (
        <section id="our-work" className="py-24 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        {t.title[currentLang].split(" ")[0]} <span className="gradient-text">{t.title[currentLang].split(" ").slice(1).join(" ")}</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {t.subtitle[currentLang]}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => {
                        const displayTitle = (currentLang === 'nl' && project.title_nl) ? project.title_nl :
                            (currentLang === 'fr' && project.title_fr) ? project.title_fr :
                                (currentLang === 'en' && project.title) ? project.title :
                                    project.title_nl || project.title || project.title_fr || 'Project';

                        const displayDesc = (currentLang === 'nl' && project.description_nl) ? project.description_nl :
                            (currentLang === 'fr' && project.description_fr) ? project.description_fr :
                                (currentLang === 'en' && project.description) ? project.description :
                                    project.description_nl || project.description || project.description_fr || '';

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link href={`/case-studies/view?id=${project.id}`} className="block h-full group">
                                    <Card className="glass-card overflow-hidden h-full hover:scale-[1.02] transition-transform duration-300 border-primary-500/20 hover:border-primary-500/40">
                                        <div className="aspect-video relative overflow-hidden bg-white dark:bg-gray-950 flex items-center justify-center p-4">
                                            {project.media && project.media.length > 0 && project.media[0].type === 'video' ? (
                                                <video
                                                    src={(project.media[0].path && !project.media[0].path.startsWith('http')) ? `https://fluxive.com${project.media[0].path}` : project.media[0].path}
                                                    autoPlay loop muted playsInline preload="metadata"
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                />
                                            ) : (
                                                <img
                                                    src={project.image_url && project.image_url.startsWith('http') ? project.image_url : (project.image_url ? `https://fluxive.com${project.image_url}` : 'https://placehold.co/600x400/eeeeee/999999?text=Fluxive+Project')}
                                                    alt={displayTitle || 'Project Thumbnail'}
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = 'https://placehold.co/600x400/f8fafc/94a3b8?text=Project+Media';
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <CardContent className="p-6">
                                            <h3 className="text-xl font-bold font-display mb-2 group-hover:text-primary-500 transition-colors duration-300">
                                                {displayTitle}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                                                {displayDesc}
                                            </p>
                                            <div className="mt-4 text-primary-500 text-sm font-medium flex items-center">
                                                {currentLang === 'nl' ? 'Lees Meer' : (currentLang === 'fr' ? 'Lire la suite' : 'Read More')}
                                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
