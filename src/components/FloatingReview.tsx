"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingReview() {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            company_name: formData.get("company_name"),
            review_text: formData.get("review_text"),
            rating: rating,
        };

        if (rating === 0) {
            setError("Please select a rating");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch("/api/submit_review.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to submit review");
            }

            setIsSuccess(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsSuccess(false);
                setRating(0);
            }, 3000);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Floating Trigger Button - Right Side */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="fixed top-32 right-0 z-40"
            >
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-l-full rounded-r-none bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg shadow-primary-500/20 flex items-center gap-2 pl-4 pr-3 py-6 transition-transform hover:-translate-x-1"
                >
                    <span className="font-bold tracking-wide">Reviews</span>
                    <Star className="w-4 h-4 fill-current" />
                </Button>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Form Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                        >
                            <div className="w-full max-w-md glass-card p-8 rounded-2xl relative pointer-events-auto bg-black/80 border border-white/10">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                                        >
                                            <Star className="w-10 h-10 text-white fill-current" />
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <h3 className="text-2xl font-bold text-white mb-4">Thank You So Much!</h3>
                                            <p className="text-gray-300 leading-relaxed">
                                                We truly appreciate you taking the time to share your experience. Your feedback helps us grow and serve you better.
                                            </p>
                                        </motion.div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="text-center mb-6">
                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                Write a Review
                                            </h3>
                                            <p className="text-gray-400 text-sm">
                                                Share your experience with us
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">
                                                Company Name
                                            </label>
                                            <Input
                                                name="company_name"
                                                required
                                                placeholder="e.g. TechCorp Inc."
                                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-500"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">
                                                Rating
                                            </label>
                                            <div className="flex gap-2 justify-center py-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onMouseEnter={() => setHoveredRating(star)}
                                                        onMouseLeave={() => setHoveredRating(0)}
                                                        onClick={() => setRating(star)}
                                                        className="focus:outline-none transition-transform hover:scale-110"
                                                    >
                                                        <Star
                                                            className={`w-8 h-8 ${star <= (hoveredRating || rating)
                                                                    ? "text-yellow-400 fill-current"
                                                                    : "text-gray-600"
                                                                }`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">
                                                Review
                                            </label>
                                            <Textarea
                                                name="review_text"
                                                required
                                                placeholder="Tell us about your experience..."
                                                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-500 min-h-[120px]"
                                            />
                                        </div>

                                        {error && (
                                            <p className="text-red-400 text-sm text-center">{error}</p>
                                        )}

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold py-6"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                "Submit Review"
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
