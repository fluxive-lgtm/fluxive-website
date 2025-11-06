"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services does FLUXIVE offer?",
    answer: "FLUXIVE offers a comprehensive suite of IT services including IT infrastructure management, marketing solutions, AI automation, web development, penetration testing, and cybersecurity services. We provide end-to-end solutions tailored to your business needs.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on scope and complexity. Small projects like website development typically take 4-8 weeks, while comprehensive IT infrastructure projects can take 3-6 months. We provide detailed timelines during the initial consultation phase.",
  },
  {
    question: "Do you work with startups or only established companies?",
    answer: "We work with businesses of all sizes! From early-stage startups to Fortune 500 companies, we tailor our services to match your budget, timeline, and specific requirements. Our flexible pricing models make premium IT services accessible to everyone.",
  },
  {
    question: "What makes FLUXIVE different from other IT service providers?",
    answer: "FLUXIVE combines cutting-edge technology with personalized service. We don't believe in one-size-fits-all solutions. Our team of experts works closely with you to understand your unique challenges and creates custom solutions that drive real business value. Plus, our proven track record speaks for itself with 500+ successful projects.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer: "Absolutely! We offer comprehensive maintenance and support packages to ensure your systems run smoothly. Our 24/7 support team is always available to address any issues, implement updates, and provide technical assistance whenever you need it.",
  },
  {
    question: "How do you ensure the security of our data?",
    answer: "Security is our top priority. We implement industry-leading security practices including end-to-end encryption, regular security audits, penetration testing, and compliance with international standards like ISO 27001 and SOC 2. Your data is protected at every level.",
  },
  {
    question: "What is your pricing model?",
    answer: "We offer flexible pricing models including fixed-price projects, monthly retainers, and hourly rates depending on your needs. During our initial consultation, we'll provide a detailed quote based on your specific requirements. We're transparent about costs with no hidden fees.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer: "Yes! We specialize in system integration and have experience working with a wide range of platforms, tools, and technologies. Our team will assess your current infrastructure and create a seamless integration plan that minimizes disruption to your operations.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Got questions? We've got answers. Can't find what you're looking for? Contact us!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="glass-card border-primary-500/20 rounded-xl px-6 hover:border-primary-500/40 transition-all"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-lg hover:no-underline hover:text-primary-500">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Still have questions? We're here to help!
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById("contact");
              contactSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-lg font-medium transition-all hover:scale-105"
          >
            Contact Us
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
