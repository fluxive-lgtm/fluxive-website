"use client"

import { useEffect, useState } from "react";
import { BlogPost } from "@/data/blogData";
import { getPosts } from "@/lib/blog";
import BlogCard from "./BlogCard";

interface RelatedPostsProps {
    currentSlug: string;
    category: string;
}

export default function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const blogPosts = await getPosts();

                // Filter posts by same category, exclude current post, limit to 3
                const related = blogPosts
                    .filter(post => post.category === category && post.slug !== currentSlug)
                    .slice(0, 3);

                // If not enough related posts, fill with others
                if (related.length < 3) {
                    const others = blogPosts
                        .filter(post => post.slug !== currentSlug && !related.includes(post))
                        .slice(0, 3 - related.length);
                    related.push(...others);
                }

                setRelatedPosts(related);
            } catch (error) {
                console.error("Failed to fetch related posts:", error);
            }
        };

        fetchRelated();
    }, [currentSlug, category]);

    if (relatedPosts.length === 0) return null;

    return (
        <section className="py-12 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold font-display mb-8">You Might Also Like</h3>
            <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map(post => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>
        </section>
    );
}
