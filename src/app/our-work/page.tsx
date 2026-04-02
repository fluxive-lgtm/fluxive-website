"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

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
        nl: "Ontdek onze recente projecten en succesverhalen.",
        en: "Explore our recent projects and success stories.",
        fr: "Découvrez nos projets récents et nos réussites."
    },
    readMore: {
        nl: "Lees Meer",
        en: "Read More",
        fr: "Lire la suite"
    }
};

export default function OurWorkPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("/api/get_projects.php");
                if (response.ok) {
                    const text = await response.text();
                    try {
                        const data = JSON.parse(text);
                        setProjects(data);
                    } catch (e) {
                        console.warn("Could not parse API response. If you are developing locally, Next.js cannot execute PHP files. Upload the api folder to your live server.");
                        setProjects([]);
                    }
                }
            } catch (error) {
                console.warn("Failed to fetch projects (Network error or CORS).", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Helper for safe language access
    const lang = (language as keyof typeof translations.title) || 'nl';
    const t = translations;

    const filteredProjects = projects.filter(project => {
        // More lenient fallback content checking so projects still show up even if a field is missing.
        const hasNL = project.title_nl && project.title_nl.trim() !== "";
        const hasFR = project.title_fr && project.title_fr.trim() !== "";
        const hasAny = project.title && project.title.trim() !== "";

        if (lang === 'nl') return hasNL || hasAny;
        if (lang === 'fr') return hasFR || hasAny;
        return hasAny;
    });

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans selection:bg-primary-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-12 relative overflow-hidden bg-white dark:bg-black">
                <div className="container mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6">
                            {t.title[lang]}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {t.subtitle[lang]}
                        </p>
                    </motion.div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 left-0 right-0 h-full overflow-hidden pointer-events-none opacity-30">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-500/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-500/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 px-6 md:px-12">
                <div className="container mx-auto">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-primary-500" />
                        </div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            <p>No projects found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map((project, index) => {
                                // Strictly prioritize chosen language first, then fallback to other available languages
                                const displayTitle = (lang === 'nl' && project.title_nl) ? project.title_nl :
                                    (lang === 'fr' && project.title_fr) ? project.title_fr :
                                        (lang === 'en' && project.title) ? project.title :
                                            project.title_nl || project.title || project.title_fr || 'Project';

                                const displayDesc = (lang === 'nl' && project.description_nl) ? project.description_nl :
                                    (lang === 'fr' && project.description_fr) ? project.description_fr :
                                        (lang === 'en' && project.description) ? project.description :
                                            project.description_nl || project.description || project.description_fr || '';

                                return (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link href={`/case-studies/view?id=${project.id}`} className="block h-full group">
                                            <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 group-hover:-translate-y-1">
                                                <div className="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                    {project.media && project.media.length > 0 && project.media[0].type === 'video' ? (
                                                        <video
                                                            src={(project.media[0].path && !project.media[0].path.startsWith('http')) ? `https://fluxive.com${project.media[0].path}` : project.media[0].path}
                                                            autoPlay loop muted playsInline
                                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={project.image_url && project.image_url.startsWith('http') ? project.image_url : (project.image_url ? `https://fluxive.com${project.image_url}` : 'https://placehold.co/600x400/eeeeee/999999?text=Fluxive+Project')}
                                                            alt={displayTitle || 'Project Thumbnail'}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.src = 'https://placehold.co/600x400/f8fafc/94a3b8?text=Project+Media';
                                                            }}
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/10 transition-colors duration-300" />
                                                </div>
                                                <CardContent className="p-8">
                                                    <h3 className="text-2xl font-bold font-display mb-3 group-hover:text-primary-500 transition-colors">
                                                        {displayTitle}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 mb-6">
                                                        {displayDesc}
                                                    </p>
                                                    <div className="flex items-center text-primary-600 dark:text-primary-400 font-bold text-sm tracking-wide uppercase">
                                                        {t.readMore[lang]}
                                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
