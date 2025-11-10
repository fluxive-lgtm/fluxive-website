"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap, Target, Award } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Seasoned professionals with years of industry experience",
    details:
      "FLUXIVE is built on a mix of cybersecurity, web development, IT infrastructure and digital marketing expertise. That means when we design a solution for you, we’re not guessing – we’ve seen how things work in real environments: hotels, agencies, small businesses and enterprise projects. You get people who understand both the technical side and the business side, who can advise you on what is realistic, secure and sustainable instead of selling you buzzwords.",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Technology",
    description: "Latest tools and frameworks to deliver modern solutions",
    details:
      "We use modern stacks like Next.js, Tailwind CSS, cloud-native tools, AI models and best-in-class security tooling instead of outdated systems that slow you down. For you this means: faster websites, smarter automations, better analytics and stronger security – all built on technologies that are actively maintained and ready for the future. We don’t use tech just because it’s trendy; we pick what fits your business and keeps maintenance simple.",
  },
  {
    icon: Target,
    title: "Tailored Solutions",
    description: "Custom approaches designed for your specific needs",
    details:
      "Every business has different pain points: a hotel might struggle with bookings and Wi-Fi, a restaurant with Google Maps visibility, an agency with automation, a small shop with a basic but professional website. At FLUXIVE we don’t push one single package to everyone. We analyse your situation, budget and goals, then design a roadmap that fits you – whether that’s fixing Google Business Profile issues, deploying better Wi-Fi, building an AI chatbot, redesigning your site, or a mix of all of these.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "500+ successful projects and satisfied clients worldwide",
    details:
      "From local hotels and small businesses to larger international projects, we’ve worked on security assessments, websites, marketing campaigns and automation flows that actually shipped – not just concepts on paper. Our focus is always on measurable results: more bookings, more leads, more stability, better security and smoother operations. This real-world experience is what we bring into every new project, so you don’t have to learn everything the hard way yourself.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export default function About() {
  const [selectedFeature, setSelectedFeature] =
    useState<null | (typeof features)[number]>(null);

  const closeModal = () => setSelectedFeature(null);

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Why Choose <span className="gradient-text">FLUXIVE</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We combine expertise, innovation, and dedication to deliver exceptional results.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            const isActive = selectedFeature?.title === feature.title;

            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="cursor-pointer"
                onClick={() => setSelectedFeature(feature)}
              >
                <Card
                  className={`glass-strong h-full border-primary-500/30 group transition-all duration-300 ${
                    isActive ? "ring-2 ring-primary-500" : ""
                  }`}
                >
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-xl font-display">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <Card className="glass-card border-primary-500/20">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-3xl font-display font-bold mb-6 text-center">
                Our <span className="gradient-text">Mission</span>
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                At FLUXIVE, we're committed to empowering businesses with innovative
                technology solutions. Our mission is to transform complex challenges into
                streamlined processes, helping you achieve your goals faster and more
                efficiently. With a focus on quality, security, and customer satisfaction,
                we deliver solutions that drive real business value.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Popout / Modal */}
      {selectedFeature && (
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
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-3 rounded-xl">
                <selectedFeature.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
                  {selectedFeature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                  {selectedFeature.description}
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-100 leading-relaxed">
              {selectedFeature.details}
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
