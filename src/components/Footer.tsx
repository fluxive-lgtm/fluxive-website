"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Linkedin, Instagram, Facebook } from "lucide-react";
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
  { icon: Linkedin, href: "https://www.linkedin.com/company/109784966", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/share/1GfaJ6614w/", label: "Facebook" },
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
    <footer className="relative py-12 mt-32">
      <Separator className="mb-12 bg-primary-500/20" />
      
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
                  className="h-10 w-10 md:h-12 md:w-12 transition-opacity duration-300"
                />
              )}
              {!mounted && (
                <div className="h-10 w-10 md:h-12 md:w-12" />
              )}
              <h3 className="text-xl md:text-2xl font-display font-bold gradient-text">
                FLUXIVE
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Transforming businesses with cutting-edge technology solutions.
              Your partner for digital excellence.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full glass-card border-primary-500/20 flex items-center justify-center hover:border-primary-500 hover:scale-110 transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors" />
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
            <h4 className="text-lg font-display font-bold mb-3">Services</h4>
            <ul className="space-y-1.5">
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
            <h4 className="text-lg font-display font-bold mb-3">Company</h4>
            <ul className="space-y-1.5">
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
            <h4 className="text-lg font-display font-bold mb-3">Legal</h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => openModal('privacy')}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors text-left text-sm"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('terms')}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors text-left text-sm"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal('cookies')}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors text-left text-sm"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </motion.div>
        </div>

        <Separator className="my-6 bg-primary-500/20" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 dark:text-gray-400 text-sm"
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
