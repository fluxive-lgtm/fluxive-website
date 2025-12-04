"use client";

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  writeReview: {
    nl: "Schrijf een Review",
    en: "Write a Review",
    fr: "Écrire un Avis"
  },
  shareExperience: {
    nl: "Deel uw ervaring met ons",
    en: "Share your experience with us",
    fr: "Partagez votre expérience avec nous"
  },
  companyName: {
    nl: "Bedrijfsnaam",
    en: "Company Name",
    fr: "Nom de l'entreprise"
  },
  companyPlaceholder: {
    nl: "bijv. TechCorp B.V.",
    en: "e.g. TechCorp Inc.",
    fr: "ex. TechCorp S.A."
  },
  rating: {
    nl: "Beoordeling",
    en: "Rating",
    fr: "Évaluation"
  },
  review: {
    nl: "Review",
    en: "Review",
    fr: "Avis"
  },
  reviewPlaceholder: {
    nl: "Vertel ons over uw ervaring...",
    en: "Tell us about your experience...",
    fr: "Racontez-nous votre expérience..."
  },
  submit: {
    nl: "Review Versturen",
    en: "Submit Review",
    fr: "Soumettre l'Avis"
  },
  successTitle: {
    nl: "Hartelijk Dank!",
    en: "Thank You So Much!",
    fr: "Merci Beaucoup !"
  },
  successMessage: {
    nl: "We waarderen het enorm dat u de tijd neemt om uw ervaring te delen. Uw feedback helpt ons te groeien en u beter van dienst te zijn.",
    en: "We truly appreciate you taking the time to share your experience. Your feedback helps us grow and serve you better.",
    fr: "Nous apprécions vraiment que vous preniez le temps de partager votre expérience. Vos commentaires nous aident à grandir et à mieux vous servir."
  },
  error: {
    nl: "Er is iets misgegaan. Probeer het opnieuw.",
    en: "Something went wrong. Please try again.",
    fr: "Une erreur s'est produite. Veuillez réessayer."
  },
  ratingError: {
    nl: "Selecteer een beoordeling",
    en: "Please select a rating",
    fr: "Veuillez sélectionner une note"
  }
};

export default function ReviewForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const { language } = useLanguage();

  const t = translations;
  const currentLang = (language as keyof typeof translations.writeReview) || 'en';

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
      setError(t.ratingError[currentLang]);
      setIsSubmitting(false);
      return;
    }

    try {
      // Use PHP API route
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
      setError(t.error[currentLang]);
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
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-bold py-6 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Star className="w-5 h-5 fill-current" />
              {t.writeReview[currentLang]}
            </Button>
          </motion.div>
        ) : (
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
                      <h3 className="text-2xl font-bold text-white mb-4">{t.successTitle[currentLang]}</h3>
                      <p className="text-gray-300 leading-relaxed">
                        {t.successMessage[currentLang]}
                      </p>
                    </motion.div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {t.writeReview[currentLang]}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {t.shareExperience[currentLang]}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        {t.companyName[currentLang]}
                      </label>
                      <Input
                        name="company_name"
                        required
                        placeholder={t.companyPlaceholder[currentLang]}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">
                        {t.rating[currentLang]}
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
                        {t.review[currentLang]}
                      </label>
                      <Textarea
                        name="review_text"
                        required
                        placeholder={t.reviewPlaceholder[currentLang]}
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
                        t.submit[currentLang]
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
