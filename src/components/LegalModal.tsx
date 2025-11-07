"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, FileText, Cookie } from "lucide-react";
import { useEffect } from "react";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'cookies';
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'privacy': return Shield;
      case 'terms': return FileText;
      case 'cookies': return Cookie;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms of Service';
      case 'cookies': return 'Cookie Policy';
    }
  };

  const Icon = getIcon();

  const getContent = () => {
    if (type === 'privacy') {
      return (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Welcome to FLUXIVE ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold mb-3">2.1 Personal Information</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>Contact us through our website forms</li>
              <li>Subscribe to our newsletter or marketing communications</li>
              <li>Request information about our services</li>
              <li>Engage with our customer support</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Belgian Data Protection Authority</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You have the right to lodge a complaint with the Belgian DPA:
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Belgian Data Protection Authority</strong></p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Drukpersstraat 35, 1000 Brussels, Belgium</p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Phone: +32 (0)2 274 48 00</p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Email: contact@apd-gba.be</p>
              <p className="text-gray-700 dark:text-gray-300">Website: www.dataprotectionauthority.be</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Company Information</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>FLUXIVE</strong></p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">VAT Number (BTW): BE1029968269</p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Email: privacy@fluxive.com</p>
              <p className="text-gray-700 dark:text-gray-300">Response time: Within 30 days (GDPR requirement)</p>
            </div>
          </section>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">
            <a href="/privacy" target="_blank" className="text-primary-500 hover:underline">
              View full Privacy Policy →
            </a>
          </p>
        </div>
      );
    }

    if (type === 'terms') {
      return (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              By accessing or using our website, services, or products, you agree to be bound by these Terms of Service. If you do not agree to these Terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Services Provided</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              FLUXIVE provides professional services including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              <li>IT Services and Infrastructure Management</li>
              <li>Marketing Solutions and Digital Strategy</li>
              <li>AI Automation and Machine Learning</li>
              <li>Web Development</li>
              <li>Penetration Testing and Cybersecurity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Belgian Law Compliance</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Legal Entity:</strong> FLUXIVE</p>
              <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>BTW Number:</strong> BE1029968269</p>
              <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Registration:</strong> Belgium</p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Belgian consumers have specific rights under the Belgian Code of Economic Law, including a 14-day cooling-off period for certain services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Contact Information</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-2">Email: legal@fluxive.com</p>
              <p className="text-gray-700 dark:text-gray-300">Response time: Within 48 hours</p>
            </div>
          </section>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">
            <a href="/terms" target="_blank" className="text-primary-500 hover:underline">
              View full Terms of Service →
            </a>
          </p>
        </div>
      );
    }

    // Cookies content
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. What Are Cookies?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Cookies are small text files stored on your device when you visit a website. They help us provide you with a better experience and understand how you use our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. Types of Cookies We Use</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Essential Cookies</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Necessary for the website to function. Cannot be disabled.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Functional Cookies</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Remember your preferences (theme, language) for a better experience.
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Analytics Cookies</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Help us understand how visitors use our website (e.g., Google Analytics).
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Marketing Cookies</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Used to deliver personalized content and measure ad effectiveness.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. Managing Cookies</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            You can control cookies through your browser settings or by using the cookie consent banner on our website. Note that blocking some cookies may affect website functionality.
          </p>
        </section>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">
          <a href="/cookies" target="_blank" className="text-primary-500 hover:underline">
            View full Cookie Policy →
          </a>
        </p>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-4xl max-h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold">{getTitle()}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {getContent()}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    BTW/VAT: BE1029968269 | Registered in Belgium
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-lg transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
