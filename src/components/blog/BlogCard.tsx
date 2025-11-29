"use client";

import Link from "next/link";
import { BlogPost, blogCategories } from "@/data/blogData";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    const context = useLanguage();
    const language = context?.language || "en";
    const category = blogCategories.find(c => c.id === post.category);
    const Icon = category?.icon;
    const categoryLabel = category?.label[language] || category?.label.en;

    return (
        <Link href={`/blog/view?slug=${post.slug}`} className="group h-full">
            <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-gray-900 flex flex-col">
                {/* Image Placeholder - In a real app, use Next.js Image */}
                <div className="h-48 w-full bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20`} />
                    {/* If we had real images, we'd render them here. For now, a colored block with category icon */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        {Icon && <Icon className="w-12 h-12 opacity-20" />}
                    </div>
                </div>

                <CardHeader className="p-6 pb-2">
                    <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 border-primary-200 dark:border-primary-800">
                            {categoryLabel}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {post.readingTime}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold font-display leading-tight group-hover:text-primary-500 transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                </CardHeader>

                <CardContent className="p-6 pt-2 flex-grow">
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                        {post.excerpt}
                    </p>
                </CardContent>

                <CardFooter className="p-6 pt-0 mt-auto">
                    <div className="flex items-center justify-between w-full text-sm font-medium text-primary-500">
                        <span className="flex items-center gap-2 text-gray-500 text-xs">
                            <Calendar className="w-3 h-3" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Read Article <ArrowRight className="w-4 h-4" />
                        </span>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    );
}
