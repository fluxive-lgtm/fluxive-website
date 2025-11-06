"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap, Target, Award } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert Team",
    description: "Seasoned professionals with years of industry experience",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Technology",
    description: "Latest tools and frameworks to deliver modern solutions",
  },
  {
    icon: Target,
    title: "Tailored Solutions",
    description: "Custom approaches designed for your specific needs",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "500+ successful projects and satisfied clients worldwide",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full filter blur-3xl" />
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
            Why Choose <span className="gradient-text">FLUXIVE</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We combine expertise, innovation, and dedication to deliver exceptional results
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="glass-strong h-full border-primary-500/30 group">
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

        {/* Additional Content */}
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
                At FLUXIVE, we're committed to empowering businesses with innovative technology solutions. 
                Our mission is to transform complex challenges into streamlined processes, helping you achieve 
                your goals faster and more efficiently. With a focus on quality, security, and customer satisfaction, 
                we deliver solutions that drive real business value.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
