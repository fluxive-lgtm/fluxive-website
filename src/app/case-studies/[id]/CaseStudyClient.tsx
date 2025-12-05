"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Loader2, ArrowLeft, Calendar, Globe, Play } from "lucide-react";
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
    description: string;
    description_nl?: string;
    content_en?: string;
    content_nl?: string;
    image_url: string;
    created_at: string;
    media?: Media[];
}

export default function CaseStudyClient() {
    const { id } = useParams();
    const { language } = useLanguage();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeMedia, setActiveMedia] = useState<Media | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
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

        if (id) {
            fetchProject();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <Loader2 className="w-8 h-8 animate-spin text-sky-900" />
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 text-stone-800">
                <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
                <Link href="/" className="text-sky-600 hover:underline flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
            </div>
        );
    }

    // Determine content based on language
    const title = (language === 'nl' && project.title_nl) ? project.title_nl : project.title;
    const description = (language === 'nl' && project.description_nl) ? project.description_nl : project.description;
    const content = (language === 'nl' && project.content_nl) ? project.content_nl : (project.content_en || "");

    return (
        <main className="min-h-screen bg-stone-50 text-stone-800 font-sans leading-relaxed">
            {/* Header Section */}
            <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 text-stone-600 hover:text-sky-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Projects</span>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-sky-900">Fluxive</span>
                        <span className="text-stone-400">|</span>
                        <span className="font-medium text-stone-600 hidden sm:inline">
                            {title}
                        </span>
                    </div>
                    <button
                        onClick={() =>
                            document
                                .getElementById("contact")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="bg-sky-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-sky-800 transition-colors shadow-sm"
                    >
                        Get a Free Audit
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-stone-900 text-white py-24 lg:py-32 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${project.image_url}')`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent"></div>

                <div className="relative max-w-5xl mx-auto px-4 text-center">
                    <div className="inline-block bg-sky-500/20 backdrop-blur-sm border border-sky-500/30 text-sky-200 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-8">
                        Case Study
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-stone-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        {description}
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-400">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(project.created_at).toLocaleDateString()}
                        </div>
                        {/* Add more metadata if available */}
                    </div>
                </div>
            </section>

            {/* Main Content & Gallery Grid */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-12">

                        {/* Left Column: Content (8 cols) */}
                        <div className="lg:col-span-8 space-y-12">
                            <div className="prose prose-lg prose-stone max-w-none prose-headings:font-bold prose-headings:text-sky-900 prose-a:text-sky-600 hover:prose-a:text-sky-500 prose-img:rounded-xl prose-img:shadow-lg">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                >
                                    {content}
                                </ReactMarkdown>
                            </div>
                        </div>

                        {/* Right Column: Gallery & Info (4 cols) */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Gallery Widget */}
                            {project.media && project.media.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm sticky top-24">
                                    <h3 className="text-lg font-bold text-stone-900 mb-4">Project Gallery</h3>

                                    {/* Main Preview */}
                                    <div className="aspect-video w-full bg-stone-100 rounded-lg overflow-hidden mb-4 relative group">
                                        {activeMedia ? (
                                            activeMedia.file_type === 'video' ? (
                                                <video
                                                    src={activeMedia.file_path}
                                                    controls
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <img
                                                    src={activeMedia.file_path}
                                                    alt="Gallery Preview"
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            )
                                        ) : (
                                            <img
                                                src={project.image_url}
                                                alt="Main Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>

                                    {/* Thumbnails */}
                                    <div className="grid grid-cols-4 gap-2">
                                        {/* Always show main image as first option if not in media list, 
                                            but here we just use media list. 
                                            If media list is empty, this block won't render. 
                                        */}
                                        {project.media.map((media) => (
                                            <button
                                                key={media.id}
                                                onClick={() => setActiveMedia(media)}
                                                className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${activeMedia?.id === media.id
                                                        ? 'border-sky-600 ring-2 ring-sky-100'
                                                        : 'border-transparent hover:border-stone-300'
                                                    }`}
                                            >
                                                {media.file_type === 'video' ? (
                                                    <div className="w-full h-full bg-stone-900 flex items-center justify-center">
                                                        <Play className="w-6 h-6 text-white/80" />
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
                            )}

                            {/* Contact Widget */}
                            <div className="bg-sky-50 rounded-2xl p-6 border border-sky-100">
                                <h3 className="text-lg font-bold text-sky-900 mb-2">Interested in similar results?</h3>
                                <p className="text-sky-800/80 text-sm mb-6">
                                    We can help you achieve the same transformation for your business.
                                </p>
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById("contact")
                                            ?.scrollIntoView({ behavior: "smooth" })
                                    }
                                    className="w-full bg-sky-900 text-white px-4 py-3 rounded-lg text-sm font-bold hover:bg-sky-800 transition-colors shadow-sm"
                                >
                                    Start Your Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action / Footer */}
            <section id="contact" className="bg-stone-900 text-stone-300 py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Ready to Upgrade Your Infrastructure?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Contact us today for a free consultation and audit of your current setup.
                    </p>
                    <div className="bg-stone-800 rounded-xl p-8 inline-block w-full max-w-md border border-stone-700">
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Contact Fluxive Today
                        </h3>
                        <div className="space-y-4">
                            <a
                                href="#"
                                className="block w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                            >
                                Schedule Free Site Survey
                            </a>
                            <p className="text-sm text-stone-400">
                                Or email us directly to discuss your specific challenges.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
