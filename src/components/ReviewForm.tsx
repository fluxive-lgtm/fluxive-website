"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReviewForm() {
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
    <div className="flex justify-center mt-12">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Write a Review
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md glass-card p-8 rounded-2xl relative"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
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
                <h3 className="text-2xl font-bold text-white text-center mb-6">
                  Share Your Experience
                </h3>

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
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-6"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Submit Review"
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
