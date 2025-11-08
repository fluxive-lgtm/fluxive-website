"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import { useTheme } from "next-themes";
import { LegalModal } from "@/components/LegalModal";

const footerLinks = {
  services: [
    { name: "IT Services", href: "#services" },
    { name: "Marketing Solutions", href: "#services" },
    { name: "AI Automation", href: "#services" },
    { name: "Web Development", href: "#services" },
    { name: "Penetration Testing", href: "#services" },
    { name: "Cybersecurity", href: "#services" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#about" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
];

export default function Footer() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'cookies'>('privacy');
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  const openModal = (type: 'privacy' | 'terms' | 'cookies') => {
    setModalType(type);
    setModalOpen(true);
  };

  const scrollToSection = (href: string) => {
    if (href === "#") return;
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 mt-24">
      <Separator className="mb-16 bg-primary-500/20" />
      
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              {mounted && (
                <img 
                  src={resolvedTheme === "dark" ? "/fluxive-logo-dark.png" : "/fluxive-logo-light.png"}
                  alt="Fluxive Logo" 
                  className="h-14 w-14 md:h-16 md:w-16 transition-opacity duration-300"
                />
              )}
              {!mounted && (
                <div className="h-14 w-14 md:h-16 md:w-16" />
              )}
              <h3 className="text-2xl md:text-3xl font-display font-bold gradient-text">
                FLUXIVE
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Transforming businesses with cutting-edge technology solutions.
              Your partner for digital excellence.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full glass-card border-primary-500/20 flex items-center justify-center hover:border-primary-500 hover:scale-110 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-display font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-display font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-display font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => openModal('privacy')}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('terms')}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('cookies')}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors text-left"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </motion.div>
        </div>

        <Separator className="my-8 bg-primary-500/20" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 dark:text-gray-400"
        >
          <p className="mb-2">© {currentYear || 2024} FLUXIVE. All rights reserved.</p>
          <p className="text-sm mb-2">BTW/VAT: BE1029968269 | Registered in Belgium</p>
          <button
            onClick={() => {
              localStorage.removeItem('cookie-consent');
              window.location.reload();
            }}
            className="text-xs text-gray-500 dark:text-gray-500 hover:text-primary-500 transition-colors"
          >
            Cookie Settings
          </button>
        </motion.div>
      </div>

      {/* Legal Modal */}
      <LegalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </footer>
  );
}
