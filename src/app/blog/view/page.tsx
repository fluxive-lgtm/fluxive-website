"use client"

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedBackground from "@/components/AnimatedBackground";
import { FloatingWifiSupport } from "@/components/FloatingWifiSupport";
import TableOfContents from "@/components/blog/TableOfContents";
import AuthorBio from "@/components/blog/AuthorBio";
import RelatedPosts from "@/components/blog/RelatedPosts";
import ConversionCTA from "@/components/blog/ConversionCTA";
import NewsletterSignup from "@/components/blog/NewsletterSignup";
import ScrollProgress from "@/components/blog/ScrollProgress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Linkedin, Facebook, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, BlogPost } from "@/lib/blog";
import Link from "next/link";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

function BlogPostContent() {
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { language } = useLanguage();

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;
            setIsLoading(true);
            try {
                const data = await getPostBySlug(slug, language as 'en' | 'nl' | 'fr');
                setPost(data);
            } catch (error) {
                console.error("Failed to fetch post:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [slug, language]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 font-medium">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                    <Link href="/blog" className="text-primary-500 hover:underline">
                        Return to Blog
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <>
            <ScrollProgress />

            {/* Full Width Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    {post.image ? (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                    )}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Hero Content */}
                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back to Blog
                        </Link>

                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Badge className="bg-primary-500 text-white border-none px-3 py-1 text-sm font-medium">
                                {post.category}
                            </Badge>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6 text-white drop-shadow-lg">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                    <span className="font-bold text-xs">{post.author.name.charAt(0)}</span>
                                </div>
                                <span className="font-medium">{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readingTime} read</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Layout */}
            <section className="px-4 py-16 relative z-10 -mt-12">
                <div className="container mx-auto max-w-7xl">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 md:p-12 lg:p-16">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                            {/* Main Content (Center) */}
                            <article className="lg:col-span-8 lg:col-start-3">
                                <div className="prose prose-lg dark:prose-invert prose-primary max-w-none 
                                    prose-headings:font-display prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                                    prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                                    prose-li:text-gray-600 dark:prose-li:text-gray-300
                                    prose-strong:text-primary-600 dark:prose-strong:text-primary-400
                                    prose-img:rounded-2xl prose-img:shadow-lg">
                                    <ReactMarkdown>{post.content}</ReactMarkdown>
                                </div>

                                <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-bold font-display">Share this article</h3>
                                        <div className="flex gap-2">
                                            <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#0077b5] hover:text-white transition-all duration-300">
                                                <Linkedin className="w-5 h-5" />
                                            </button>
                                            <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-[#1877f2] hover:text-white transition-all duration-300">
                                                <Facebook className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <AuthorBio author={post.author} />
                                </div>
                            </article>

                            {/* Sidebar (Right - Sticky) */}
                            <aside className="hidden lg:block lg:col-span-2 relative">
                                <div className="sticky top-32 space-y-8">
                                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                                        <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4">Table of Contents</h4>
                                        <TableOfContents />
                                    </div>
                                </div>
                            </aside>

                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Sections */}
            <section className="bg-gray-50 dark:bg-gray-900/50 py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <ConversionCTA />
                    <div className="mt-20">
                        <h2 className="text-3xl font-display font-bold mb-10 text-center">Related Articles</h2>
                        <RelatedPosts currentSlug={post.slug} category={post.category} />
                    </div>
                </div>
            </section>
        </>
    );
}

export default function BlogPostPage() {
    return (
        <main className="relative min-h-screen overflow-x-hidden bg-white dark:bg-gray-950">
            <AnimatedBackground />
            <ScrollToTop />
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <BlogPostContent />
            </Suspense>
            <NewsletterSignup />
            <Footer />
            <FloatingSocial />
            <FloatingWifiSupport />
        </main>
    )
}
