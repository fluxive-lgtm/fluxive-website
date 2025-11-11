"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedBackground from "@/components/AnimatedBackground";
import FloatingWifiSupport from "@/components/FloatingWifiSupport";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function Home() {
  const [showWifiSupport, setShowWifiSupport] = useState(false);

  const openWifiSupport = () => setShowWifiSupport(true);
  const closeWifiSupport = () => setShowWifiSupport(false);

  return (
    <main className="relative overflow-x-hidden" id="main-content">
      <AnimatedBackground />
      <ScrollToTop />
      <Navbar />
      <Hero />

      {/* Regular sections */}
      <Services />
      <About />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingSocial />

      {/* Floating button – bottom-left, opens the popup */}
      <FloatingWifiSupport onClick={openWifiSupport} />

      {/* 24/7 Wi-Fi Troubleshooting Portal – POPUP MODAL */}
      {showWifiSupport && (
        <div
          id="wifi-support"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeWifiSupport}
          />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 w-full max-w-3xl"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl border border-primary-500/20 bg-white/95 dark:bg-slate-900/95">
              {/* Close button */}
              <button
                type="button"
                onClick={closeWifiSupport}
                className="absolute top-3 right-3 inline-flex items-center justify-center rounded-full p-1.5 border border-gray-300/70 dark:border-gray-600/70 bg-white/80 dark:bg-slate-900/80 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                aria-label="Close Wi-Fi support form"
              >
                <X className="w-4 h-4 text-gray-700 dark:text-gray-200" />
              </button>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-4">
                24/7 Wi-Fi Troubleshooting Portal
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200 mb-6">
                Experiencing slow Wi-Fi, random disconnects, or no internet?
                Submit a support request below — our technicians are alerted
                instantly by email (and WhatsApp if enabled) so we can assist
                you as fast as possible.
              </p>

              <form
                action="/wifi-support.php"
                method="POST"
                className="grid gap-4 sm:gap-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name *
                    </label>
                    <input
                      name="name"
                      required
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      WhatsApp number (e.g. +3247…) *
                    </label>
                    <input
                      name="whatsapp"
                      required
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Address / Location (optional)
                    </label>
                    <input
                      name="location"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Problem type
                  </label>
                  <select
                    name="issue_type"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="no_internet">No internet</option>
                    <option value="slow_wifi">Slow Wi-Fi</option>
                    <option value="wifi_drops">Wi-Fi keeps dropping</option>
                    <option value="coverage">Bad coverage</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Describe the problem *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Preferred contact method
                    </label>
                    <select
                      name="preferred"
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone call</option>
                    </select>
                  </div>
                  <div className="flex items-start pt-2">
                    <label className="flex items-start text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      <input
                        type="checkbox"
                        name="consent"
                        value="1"
                        required
                        className="mt-1 mr-2"
                      />
                      I agree that Fluxive may contact me about this Wi-Fi
                      support request and store my data for this purpose.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-sm sm:text-base font-semibold px-6 py-3 shadow-lg shadow-primary-600/30 transition"
                >
                  Submit 24/7 Wi-Fi Support Request
                </button>
              </form>

              <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                After submitting, your request is stored securely and sent
                directly to our support team for an immediate response.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
