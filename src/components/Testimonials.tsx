"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import { useLanguage } from "@/context/LanguageContext";

interface Review {
  id: number;
  company_name: string;
  review_text: string;
  rating: number;
  created_at: string;
}

const translations = {
  title: {
    nl: "Wat Onze Klanten Zeggen",
    en: "What Our Clients Say",
    fr: "Ce Que Disent Nos Clients"
  },
  subtitle: {
    nl: "Geloof ons niet zomaar op ons woord - hoor het van enkele van onze tevreden klanten",
    en: "Don't just take our word for it - hear from some of our satisfied clients",
    fr: "Ne nous croyez pas sur parole - écoutez certains de nos clients satisfaits"
  },
  verified: {
    nl: "Geverifieerde Klant",
    en: "Verified Client",
    fr: "Client Vérifié"
  }
};

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch from new Next.js API
        const response = await fetch("/api/reviews", {
          cache: 'no-store',
          headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
          }
        });

        const contentType = response.headers.get("content-type");
        const text = await response.text();

        try {
          const data = JSON.parse(text);

          // Map DB fields to component fields
          const mappedReviews = data.map((review: any) => {
            // Determine content (default to review_text)
            let content = review.review_text;

            return {
              id: review.id,
              name: review.company_name, // Using company name as name for now
              role: translations.verified[language as keyof typeof translations.verified] || "Verified Client",
              company: review.company_name,
              content: content,
              rating: review.rating,
              avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${review.company_name}`,
            };
          });

          setReviews(mappedReviews);
        } catch (e) {
          console.warn("API returned non-JSON response:", text.substring(0, 100));
          // If we are in dev mode and it's PHP source code, use empty state
          setReviews([]);
        }
      } catch (error) {
        console.error("Failed to fetch reviews", error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [language]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const t = translations;
  const currentLang = (language as keyof typeof translations.title) || 'en';

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary-500 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent-500 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {t.title[currentLang].split(" ").slice(0, -2).join(" ")} <span className="gradient-text">{t.title[currentLang].split(" ").slice(-2).join(" ")}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.subtitle[currentLang]}
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {reviews.length > 0 ? reviews.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <Card
                    className={`glass-card h-full transition-all duration-300 group hover:-translate-y-2 ${["Hotel Koffieboontje", "Koffieboontje Budget", "Adventure Bike Rental", "FIDEL Accountants"].some(vip => testimonial.company.includes(vip))
                      ? "border-yellow-500/50 hover:border-yellow-500 shadow-[0_0_30px_-10px_rgba(234,179,8,0.3)]"
                      : "border-white/10 hover:border-primary-500/30 hover:shadow-[0_0_30px_-10px_rgba(var(--primary-rgb),0.2)]"
                      }`}
                  >
                    <CardContent className="p-8 h-full flex flex-col relative overflow-hidden">
                      {/* Decorative Quote Background */}
                      <Quote className="absolute top-4 right-4 w-24 h-24 text-primary-500/5 rotate-12 pointer-events-none" />

                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>

                      <p className="text-gray-700 dark:text-gray-200 text-lg mb-8 leading-relaxed flex-grow font-medium italic relative z-10">
                        "{testimonial.content}"
                      </p>

                      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
                        <div className="relative">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-14 h-14 rounded-full border-2 border-white dark:border-gray-800 shadow-md"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-primary-500 rounded-full p-1 border-2 border-white dark:border-gray-800">
                            <Quote className="w-3 h-3 text-white fill-current" />
                          </div>
                        </div>

                        <div>
                          <div className="font-display font-bold text-foreground text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                            {testimonial.role}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">
                            {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )) : (
                <div className="w-full text-center py-12 text-gray-500">
                  No reviews yet. Be the first to leave one!
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="glass-card border-primary-500/30 hover:border-primary-500 hover:scale-110 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="glass-card border-primary-500/30 hover:border-primary-500 hover:scale-110 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Review Form Section */}
        <ReviewForm />

        {/* Stats */}
      </div>
    </section>
  );
}
