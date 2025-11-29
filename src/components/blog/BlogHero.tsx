"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function BlogHero() {
    return (
        <section className="relative pt-32 pb-16 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary-500 to-accent-500" />
            <div className="container mx-auto px-4 relative z-10 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
                    Fluxive Blog
                </span>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                    IT & Marketing Insights for <span className="gradient-text">Belgian Businesses</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                    Practical guides on Wi-Fi, local SEO, cybersecurity, and technology for hotels, restaurants, and small businesses across Belgium.
                </p>

                <div className="max-w-md mx-auto relative">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search articles..."
                            className="pl-10 py-6 rounded-full border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
