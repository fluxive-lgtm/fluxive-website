"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Loader2, ArrowLeft, Calendar, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Media {
    id: number;
    file_path: string;
    file_type: 'image' | 'video';
    display_order: number;
}

interface Project {
    id: number;
    title: string;
    title_nl?: string;
    title_fr?: string;
    description: string;
    description_nl?: string;
    description_fr?: string;
    content_en?: string;
    content_nl?: string;
    content_fr?: string;
    image_url: string;
    created_at: string;
    media?: Media[];
}

function CaseStudyContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { language } = useLanguage();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeMedia, setActiveMedia] = useState<Media | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            try {
                const response = await fetch(`/api/get_project.php?id=${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch project");
                }
                const data = await response.json();
                setProject(data);
                if (data.media && data.media.length > 0) {
                    setActiveMedia(data.media[0]);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (!id && !loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <h1 className="text-2xl font-bold mb-4">No Project Selected</h1>
                <Link href="/" className="text-primary-500 hover:underline flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
                <Link href="/" className="text-primary-500 hover:underline flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
            </div>
        );
    }

    // Determine content based on language
    const title = (language === 'nl' && project.title_nl) ? project.title_nl :
        (language === 'fr' && project.title_fr) ? project.title_fr : project.title;

    const description = (language === 'nl' && project.description_nl) ? project.description_nl :
        (language === 'fr' && project.description_fr) ? project.description_fr : project.description;

    const content = (language === 'nl' && project.content_nl) ? project.content_nl :
        (language === 'fr' && project.content_fr) ? project.content_fr : (project.content_en || "");

    return (
        <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed transition-colors duration-300">
            {/* Header Section */}
            <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Projects</span>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">Fluxive</span>
                        <span className="text-gray-300 dark:text-gray-700">|</span>
                        <span className="font-medium text-gray-600 dark:text-gray-400 hidden sm:inline truncate max-w-[200px]">
                            {title}
                        </span>
                    </div>
                    <Link
                        href="/#contact"
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm"
                    >
                        Get a Free Audit
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gray-900 text-white py-24 lg:py-32 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-30 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${project.image_url}')`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>

                <div className="relative max-w-5xl mx-auto px-4 text-center">
                    <div className="inline-block bg-primary-500/20 backdrop-blur-sm border border-primary-500/30 text-primary-200 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-8">
                        Case Study
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        {description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(project.created_at).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section - Just after Title/Hero as requested */}
            {project.media && project.media.length > 0 && (
                <section className="py-12 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-6 text-center">Project Gallery</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Main View */}
                                <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg relative group">
                                    {activeMedia ? (
                                        activeMedia.file_type === 'video' ? (
                                            <video
                                                src={activeMedia.file_path}
                                                controls
                                                className="w-full h-full object-contain bg-black"
                                            />
                                        ) : (
                                            <img
                                                src={activeMedia.file_path}
                                                alt="Gallery Preview"
                                                className="w-full h-full object-contain bg-black/5"
                                            />
                                        )
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">Select an image</div>
                                    )}
                                </div>

                                {/* Thumbnails Grid */}
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 content-start">
                                    {/* We can include the main cover image as a thumbnail option too if desired, 
                                        but sticking to gallery media for now */}
                                    {project.media.map((media) => (
                                        <button
                                            key={media.id}
                                            onClick={() => setActiveMedia(media)}
                                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeMedia?.id === media.id
                                                ? 'border-primary-500 ring-2 ring-primary-500/20'
                                                : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                                                }`}
                                        >
                                            {media.file_type === 'video' ? (
                                                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                                                    <Play className="w-8 h-8 text-white/80" />
                                                </div>
                                            ) : (
                                                <img
                                                    src={media.file_path}
                                                    alt="Thumbnail"
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Main Content */}
            <section className="py-16 lg:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <article className="prose prose-lg dark:prose-invert max-w-none 
                        prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white 
                        prose-p:text-gray-600 dark:prose-p:text-gray-300
                        prose-a:text-primary-600 dark:prose-a:text-primary-400 hover:prose-a:text-primary-500
                        prose-img:rounded-xl prose-img:shadow-lg">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                        >
                            {content}
                        </ReactMarkdown>
                    </article>

                    {/* Bottom CTA */}
                    <div className="mt-16 bg-primary-50 dark:bg-primary-900/10 rounded-2xl p-8 border border-primary-100 dark:border-primary-900/20 text-center">
                        <h3 className="text-xl font-bold text-primary-900 dark:text-primary-100 mb-2">Interested in similar results?</h3>
                        <p className="text-primary-800/80 dark:text-primary-200/70 text-base mb-6">
                            We can help you achieve the same transformation for your business.
                        </p>
                        <Link
                            href="/#contact"
                            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                        >
                            Start Your Project
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>}>
            <CaseStudyContent />
        </Suspense>
    );
}
