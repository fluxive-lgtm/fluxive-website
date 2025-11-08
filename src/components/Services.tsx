"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TiltCard } from "@/components/TiltCard";
import { 
  Server, 
  TrendingUp, 
  Bot, 
  Code, 
  Shield, 
  Lock,
  CheckCircle
} from "lucide-react";

const services = [
  {
    icon: Server,
    title: "IT Services",
    description: "Comprehensive IT solutions to streamline your operations and boost productivity.",
    features: [
      "Infrastructure Management",
      "Cloud Solutions",
      "IT Consulting",
      "24/7 Support"
    ],
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
  },
  {
    icon: TrendingUp,
    title: "Marketing Solutions",
    description: "Data-driven marketing strategies to amplify your brand and drive growth.",
    features: [
      "Digital Marketing",
      "SEO & SEM",
      "Social Media Management",
      "Brand Strategy"
    ],
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Leverage cutting-edge AI to automate workflows and enhance decision-making.",
    features: [
      "Process Automation",
      "Machine Learning",
      "Chatbot Development",
      "Predictive Analytics"
    ],
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Build stunning, high-performance websites and web applications.",
    features: [
      "Custom Web Apps",
      "E-commerce Solutions",
      "API Development",
      "Responsive Design"
    ],
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
  },
  {
    icon: Shield,
    title: "Penetration Testing",
    description: "Identify vulnerabilities before attackers do with comprehensive security testing.",
    features: [
      "Network Security Testing",
      "Web App Penetration Testing",
      "Social Engineering Tests",
      "Security Audits"
    ],
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
  },
  {
    icon: Lock,
    title: "Cybersecurity",
    description: "Protect your digital assets with enterprise-grade security solutions.",
    features: [
      "Threat Detection",
      "Incident Response",
      "Security Consulting",
      "Compliance Management"
    ],
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
      staggerChildren: 0.15, // Slightly longer delay for smoother sequential appearance
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // Smooth cubic bezier easing
    }
  },
};

export default function Services() {
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
            Comprehensive solutions tailored to your business needs
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
              >
                <TiltCard>
                  <Card className={`glass-card group h-full border ${service.borderColor} hover:border-opacity-60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20`}>
                  <CardHeader className="p-4 sm:p-5 md:p-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl ${service.bgColor} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                      <div className={`bg-gradient-to-br ${service.color} p-2 sm:p-2.5 md:p-3 rounded-md sm:rounded-lg`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-display mb-1.5 sm:mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-5 md:p-6 pt-0">
                    <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-sm sm:text-base text-gray-700 dark:text-gray-300"
                        >
                          <CheckCircle className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 flex-shrink-0 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
                          <span>{feature}</span>
                        </motion.li>
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
    </section>
  );
}
