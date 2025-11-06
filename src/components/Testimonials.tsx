"use client";

import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO, TechCorp",
    company: "TechCorp Inc.",
    content: "FLUXIVE transformed our IT infrastructure completely. Their team's expertise and dedication to our project exceeded all expectations. The results speak for themselves - 50% improvement in system performance.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, StartupX",
    company: "StartupX",
    content: "The marketing solutions provided by FLUXIVE helped us grow from 0 to 100K users in just 6 months. Their data-driven approach and creative campaigns are unmatched.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "VP of Operations, InnovateCo",
    company: "InnovateCo",
    content: "AI automation implemented by FLUXIVE saved us 40 hours per week in manual processes. The ROI was visible within the first month. Absolutely fantastic work!",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: 4,
    name: "David Park",
    role: "CEO, SecureNet",
    company: "SecureNet Solutions",
    content: "FLUXIVE's penetration testing services identified critical vulnerabilities that we never knew existed. Their comprehensive approach to cybersecurity gave us peace of mind.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
  {
    id: 5,
    name: "Jessica Williams",
    role: "Product Manager, CloudScale",
    company: "CloudScale",
    content: "The web development team at FLUXIVE built us a stunning, high-performance platform that our users love. Fast, responsive, and exactly what we envisioned.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it - hear from some of our satisfied clients
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <Card className="glass-card border-primary-500/20 h-full hover:border-primary-500/40 transition-all group">
                    <CardContent className="p-8">
                      <Quote className="w-12 h-12 text-primary-500 mb-4 group-hover:scale-110 transition-transform" />
                      
                      <p className="text-gray-300 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                        "{testimonial.content}"
                      </p>

                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full border-2 border-primary-500"
                        />
                        <div>
                          <div className="font-display font-bold text-foreground">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.role}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-500">
                            {testimonial.company}
                          </div>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex gap-1 mt-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { label: "Client Satisfaction", value: "98%" },
            { label: "Projects Delivered", value: "500+" },
            { label: "Years Experience", value: "10+" },
            { label: "Team Members", value: "50+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-xl text-center hover:scale-105 transition-transform"
            >
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
