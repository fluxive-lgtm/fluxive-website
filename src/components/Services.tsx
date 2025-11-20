"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TiltCard } from "@/components/TiltCard";
import {
  Server,
  TrendingUp,
  Bot,
  Code,
  Shield,
  Lock,
  CheckCircle,
  X,
} from "lucide-react";

const services = [
  {
    icon: Server,
    title: "IT Services & Wi-Fi Solutions",
    description:
      "Reliable IT infrastructure and Wi-Fi that just works – for hotels, restaurants, offices and small businesses.",
    features: [
      "Hotel & Restaurant Wi-Fi Design",
      "Coverage Fix for Dead Zones",
      "Cost-Effective Network Hardware",
      "Ongoing Remote Monitoring & Support",
    ],
    details:
      "Most small businesses, especially hotels and restaurants, struggle with unstable and slow Wi-Fi: some rooms have no signal, routers are badly placed, and the internet feels overloaded all the time. On top of that, many are paying too much for hardware that is not configured properly. At FLUXIVE, we design and install professional Wi-Fi setups for hotels, cafés, co-working spaces and offices – with separate guest and staff networks, full-building coverage, and stable performance. We choose cost-effective, business-grade access points and configure everything securely, so you get strong, stable Wi-Fi without wasting money on oversized or wrong equipment. We also help with routers, switches, backups and remote support, so you always have someone to call when something goes wrong.",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing & Google Maps",
    description:
      "Fix your visibility problems on Google and bring more guests and customers through the door.",
    features: [
      "Google Business Profile Fix & Setup",
      "Local SEO & Maps Ranking",
      "Campaigns for Hotels & Local Business",
      "Review & Reputation Strategy",
    ],
    details:
      "A lot of businesses have a great product but almost no online visibility: they are hard to find on Google Maps, the business is not showing up properly, or it appears below competitors. We help you fix your Google Business Profile (Google Maps listing) so that your hotel, restaurant, salon or shop is correctly visible, verified and well-optimised. This includes categories, photos, descriptions, opening hours, services, keywords, and posts. On top of that, we work on local SEO so you rank higher when people search for ‘hotel in Bruges’, ‘restaurant near me’ or similar terms. For hotels and other local businesses, we build full digital strategies: online campaigns, remarketing, social media, and review management – all focused on more bookings and more direct customers instead of only relying on booking platforms or third-party apps.",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
  },
  {
    icon: Bot,
    title: "AI Automation & Custom Chatbots",
    description:
      "Automate boring tasks and add smart AI chatbots to your website – fully custom and more affordable.",
    features: [
      "Booking & Lead Automation",
      "AI Chatbots for Website & WhatsApp",
      "Automated Emails, Invoices & Reminders",
      "Custom AI Flows for Any Business",
    ],
    details:
      "Think of every repetitive task in your business: answering the same questions, manually handling bookings, sending confirmations, chasing invoices, replying to emails. With FLUXIVE, you can make almost anything automatic. We build custom AI automations that connect to your tools (email, CRM, calendar, booking engine) and handle workflows in the background. Our AI chatbots are not generic ‘plug & play’ bots – they are trained on your business, your FAQs, your services, your tone of voice, and can speak multiple languages if needed. They can be added to your website, landing pages or even WhatsApp and Messenger. Compared to big chatbot platforms that charge high monthly fees per seat or per conversation, we provide a more flexible and often cheaper solution, tailored to small and medium-sized businesses who need results without burning their budget.",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
  {
    icon: Code,
    title: "Modern Web Design & Development",
    description:
      "Fast, modern websites that make your business look professional and convert visitors into customers.",
    features: [
      "Modern, Responsive Websites",
      "Booking & Contact Integrations",
      "SEO-Friendly Structure",
      "AI Chatbot & Analytics Integration",
    ],
    details:
      "Your website is often the first impression people get of your business. Many hotels, restaurants and small companies are stuck with outdated designs, slow loading times and confusing navigation. We build modern, clean, mobile-friendly websites that are easy to use and focused on what matters: bookings, leads, phone calls and messages. We can integrate booking engines, enquiry forms, AI chatbots, WhatsApp buttons and analytics so you actually see what visitors do. Whether you’re a hotel, agency, freelancer, shop or any other business, we design your site to match your brand – and we keep it technically optimised so Google likes it too.",
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
  },
  {
    icon: Shield,
    title: "Penetration Testing",
    description:
      "Professional security testing for your websites, web apps and internal systems – before attackers get there.",
    features: [
      "Web Application Pentests",
      "Infrastructure & Network Testing",
      "Reports in Clear Business Language",
      "Prioritised Remediation Plan",
    ],
    details:
      "If your business handles bookings, payments, customer data or internal systems, you can’t afford to wait until a breach happens. With penetration testing, we perform controlled, ethical hacking against your websites, APIs and internal infrastructure to identify real vulnerabilities that an attacker could abuse. You don’t just receive a technical dump of issues: you get a clear report explaining what each finding means for your business, how critical it is, and how to fix it. This helps you protect both your reputation and your operations while showing customers and partners that you take security seriously.",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
  },
  {
    icon: Lock,
    title: "Cybersecurity & Protection",
    description:
      "End-to-end security for small and medium businesses – without enterprise-level complexity.",
    features: [
      "Baseline Security for SMEs",
      "Email & Phishing Protection",
      "Incident Response Guidance",
      "Policies, Backups & Best Practices",
    ],
    details:
      "Most small and medium businesses are not ready for a real cyber incident: weak passwords, no backups, no clear plan, and employees who are not trained to spot phishing. We help you build a realistic security baseline for your size and budget: from secure configurations and backups to endpoint protection, access control and awareness training. If something goes wrong, we support you with incident response guidance so you can contain, recover and learn from the event. Our goal is simple: reduce your risk significantly without making your daily work harder.",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
  },
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<null | (typeof services)[number]>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  const closeModal = () => setSelectedService(null);

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4 px-2">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Practical, real-world solutions for hotels, restaurants, agencies and other growing businesses.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = selectedService?.title === service.title;

            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="cursor-pointer flex"
                onClick={() => setSelectedService(service)}
              >
                <TiltCard>
                  <Card
                    className={`glass-card group w-full flex flex-col border border-white/20 dark:border-white/10 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20 ${
                      isActive ? "ring-2 ring-primary-500" : ""
                    }`}
                  >
                    <CardHeader className="p-4 sm:p-5 flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className={`bg-gradient-to-br ${service.color} p-2.5 rounded-lg`}>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-base sm:text-lg font-display mb-2 text-center min-h-[3rem] flex items-center justify-center">
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-center line-clamp-3 min-h-[4rem]">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-5 pt-0 flex-grow">
                      <ul className="space-y-1.5 sm:space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 mt-0.5 text-primary-500 flex-shrink-0" />
                            <span className="line-clamp-2">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Popout / Modal */}
      {selectedService && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl mx-auto glass-card 
                       bg-white/95 dark:bg-background/95
                       border border-primary-500/30 rounded-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/10 dark:bg-black/20 hover:bg-black/20 dark:hover:bg-black/30 text-gray-700 dark:text-gray-200"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={`bg-gradient-to-br ${selectedService.color} p-3 rounded-xl`}>
                <selectedService.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
                  {selectedService.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                  {selectedService.description}
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-100 mb-4 leading-relaxed">
              {selectedService.details}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {selectedService.features.map((feature, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs sm:text-sm
                             bg-primary-500/5 dark:bg-primary-500/10
                             border border-primary-500/30 
                             text-primary-700 dark:text-primary-200"
                >
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}