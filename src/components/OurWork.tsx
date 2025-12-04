"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Project {
    id: number;
    title: string;
    description: string;
    image_url: string;
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
                const response = await fetch("/api/get_projects.php");
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

    if (loading) {
        return (
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 flex justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                </div>
            </section>
        );
    }

    if (projects.length === 0) {
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
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="glass-card overflow-hidden h-full hover:scale-[1.02] transition-transform duration-300 border-primary-500/20 hover:border-primary-500/40">
                                <div className="aspect-video relative overflow-hidden">
                                    <img
                                        src={project.image_url}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold font-display mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
