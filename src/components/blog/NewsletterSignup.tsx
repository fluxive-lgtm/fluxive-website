"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function NewsletterSignup() {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-accent-500" />

                    <div className="relative z-10">
                        <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
                            <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                        </div>

                        <h2 className="text-3xl font-bold font-display mb-4">
                            Get IT & Marketing Tips Delivered to Your Inbox
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join 500+ Belgian business owners receiving monthly guides on Wi-Fi, SEO, and technology. No spam, just value.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <Input
                                type="email"
                                placeholder="your@email.com"
                                className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                required
                            />
                            <Button type="submit" size="lg" className="h-12 rounded-xl px-8 font-bold">
                                Subscribe
                            </Button>
                        </form>
                        <p className="text-xs text-gray-400 mt-4">
                            Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
