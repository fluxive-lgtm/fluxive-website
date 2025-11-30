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
    searchQuery: string;
}

export default function BlogList({ initialPosts, searchQuery }: BlogListProps) {
    const [activeCategory, setActiveCategory] = useState<BlogCategory>("all");
    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 6;

    // Reset to first page when category or search changes
    if (currentPage !== 1 && (activeCategory !== "all" || searchQuery)) {
        setCurrentPage(1);
    }

    const filteredPosts = initialPosts.filter(post => {
        const matchesCategory = activeCategory === "all" || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Separate featured post (first one) from the rest if showing all
    const featuredPost = activeCategory === "all" && !searchQuery && currentPage === 1 ? filteredPosts[0] : null;

    // If we have a featured post, we don't show it in the grid
    // If we are on page 1 and showing all categories, the first post is featured, so we slice from 1
    // Otherwise we slice from 0
    const postsToPaginate = (activeCategory === "all" && !searchQuery) ? filteredPosts.slice(1) : filteredPosts;

    const totalPages = Math.ceil(postsToPaginate.length / POSTS_PER_PAGE);

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const currentPosts = postsToPaginate.slice(startIndex, startIndex + POSTS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        document.getElementById('blog-grid')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="container mx-auto max-w-6xl" id="blog-grid">
            <CategoryFilter
                activeCategory={activeCategory}
                onSelectCategory={(category) => {
                    setActiveCategory(category);
                    setCurrentPage(1);
                }}
            />

            {/* Featured Post Section - Only on first page and when no search/filter */}
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
            {currentPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentPosts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500">
                    No posts found matching your criteria.
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-16 flex justify-center gap-2">
                    <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            className={currentPage === page ? "bg-primary-500 hover:bg-primary-600" : ""}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </Button>
                    ))}

                    <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
