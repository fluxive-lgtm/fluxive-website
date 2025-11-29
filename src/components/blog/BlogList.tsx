"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogPost, BlogCategory } from "@/data/blogData";
import CategoryFilter from "@/components/blog/CategoryFilter";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";

interface BlogListProps {
    initialPosts: BlogPost[];
}

export default function BlogList({ initialPosts }: BlogListProps) {
    const [activeCategory, setActiveCategory] = useState<BlogCategory>("all");

    const filteredPosts = activeCategory === "all"
        ? initialPosts
        : initialPosts.filter(post => post.category === activeCategory);

    // Separate featured post (first one) from the rest if showing all
    const featuredPost = activeCategory === "all" ? filteredPosts[0] : null;
    const gridPosts = activeCategory === "all" ? filteredPosts.slice(1) : filteredPosts;

    return (
        <div className="container mx-auto max-w-6xl">
            <CategoryFilter
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
            />

            {/* Featured Post Section */}
            {featuredPost && (
                <div className="mb-16">
                    <Link href={`/blog/view?slug=${featuredPost.slug}`} className="group block">
                        <div className="grid md:grid-cols-2 gap-8 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300">
                            <div className="h-64 md:h-auto bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />
                                {/* Placeholder for featured image */}
                                {featuredPost.image && (
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <div className="p-8 md:p-12 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider">
                                        Featured
                                    </span>
                                    <span className="text-sm text-gray-500">{featuredPost.date}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 group-hover:text-primary-500 transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-primary-600 font-bold group-hover:translate-x-2 transition-transform">
                                    Read Full Guide <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}

            {/* Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>

            {/* Pagination (Placeholder) */}
            <div className="mt-16 flex justify-center gap-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="default" className="bg-primary-500">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Next</Button>
            </div>
        </div>
    );
}
