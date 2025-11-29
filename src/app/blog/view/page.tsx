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
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Share2, Linkedin, Facebook, Twitter, Mail } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, BlogPost } from "@/lib/blog";

function BlogPostContent() {
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!slug) return;
            try {
                const data = await getPostBySlug(slug);
                setPost(data);
            } catch (error) {
                console.error("Failed to fetch post:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div>Loading...</div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div>Post not found</div>
            </div>
        )
    }

    return (
        <>
            {/* Breadcrumb & Header */}
            <section className="pt-32 pb-12 px-4 relative z-10">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Badge variant="outline" className="text-gray-500 border-gray-300 dark:border-gray-700">Blog</Badge>
                        <span className="text-gray-400">/</span>
                        <Badge className="bg-primary-100 text-primary-700 hover:bg-primary-200 border-none">
                            {post.category}
                        </Badge>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight mb-6 text-gray-900 dark:text-white">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-gray-200">By {post.author.name}</span>
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

                    <div className="flex justify-center gap-2">
                        <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                            <Facebook className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 hover:text-blue-400 transition-colors">
                            <Twitter className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                            <Mail className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="px-4 mb-16 relative z-10">
                <div className="container mx-auto max-w-5xl">
                    <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 rounded-3xl overflow-hidden relative shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />
                        {/* Placeholder for real image */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">
                            {post.image ? (
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                            ) : (
                                <span>Featured Image: {post.title}</span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Layout */}
            <section className="px-4 pb-20 relative z-10">
                <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Sidebar (Left) */}
                    <aside className="lg:col-span-3 order-2 lg:order-1">
                        <TableOfContents />
                    </aside>

                    {/* Main Content (Center) */}
                    <article className="lg:col-span-9 order-1 lg:order-2 max-w-3xl mx-auto">
                        <div className="prose prose-lg dark:prose-invert prose-primary max-w-none">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </div>

                        <AuthorBio author={post.author} />

                        <ConversionCTA />

                        <RelatedPosts currentSlug={post.slug} category={post.category} />
                    </article>

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
