"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Settings, Cookie } from "lucide-react";
import { LegalModal } from "@/components/LegalModal";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'cookies'>('cookies');
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    functional: false,
    analytics: false,
    marketing: false,
  });

  const openModal = (type: 'privacy' | 'terms' | 'cookies') => {
    setModalType(type);
    setModalOpen(true);
  };

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    console.log('🍪 CookieBanner: Checking consent...', { hasConsent: !!consent });
    
    if (!consent) {
      console.log('🍪 CookieBanner: No consent found - will show banner in 1 second');
      setTimeout(() => {
        console.log('🍪 CookieBanner: Showing banner now!');
        setShowBanner(true);
      }, 1000);
    } else {
      console.log('🍪 CookieBanner: Consent already exists:', JSON.parse(consent));
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const rejectNonEssential = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(essentialOnly));
    setShowBanner(false);
  };

  const savePreferences = () => {
    const consentData = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setShowBanner(false);
    setShowSettings(false);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'essential') return; // Can't disable essential
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
            onClick={() => {/* Prevent closing on backdrop click */}}
          />
          
          {/* Cookie banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
          >
            <div className="container mx-auto max-w-6xl">
              <div className="glass-strong rounded-2xl shadow-2xl border border-primary-500/20 overflow-hidden">
              {!showSettings ? (
                // Main Banner
                <div className="p-4 md:p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Cookie className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-display font-bold mb-2">
                        We Value Your Privacy
                      </h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                        By clicking "Accept All", you consent to our use of cookies.
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Belgian Law:</strong> We require your explicit consent before placing non-essential cookies per GDPR and ePrivacy Directive.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={acceptAll}
                      className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
                    >
                      Accept All
                    </Button>
                    <Button
                      onClick={rejectNonEssential}
                      variant="outline"
                      className="flex-1 glass-card border-primary-500/30"
                    >
                      Only Essential
                    </Button>
                    <Button
                      onClick={() => setShowSettings(true)}
                      variant="ghost"
                      className="flex-1"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Customize
                    </Button>
                  </div>

                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <button onClick={() => openModal('cookies')} className="text-primary-500 hover:underline mr-4">
                      Cookie Policy
                    </button>
                    <button onClick={() => openModal('privacy')} className="text-primary-500 hover:underline">
                      Privacy Policy
                    </button>
                  </div>
                </div>
              ) : (
                // Settings Panel
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl md:text-2xl font-display font-bold">
                      Cookie Preferences
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Essential Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                      <div className="flex-1 mr-4">
                        <h4 className="font-semibold mb-1">Essential Cookies (Required)</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Necessary for the website to function properly. These cannot be disabled.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={true}
                          disabled
                          className="w-5 h-5 rounded accent-primary-500"
                        />
                      </div>
                    </div>

                    {/* Functional Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex-1 mr-4">
                        <h4 className="font-semibold mb-1">Functional Cookies</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Remember your preferences (e.g., language, theme) for a better experience.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.functional}
                          onChange={() => togglePreference('functional')}
                          className="w-5 h-5 rounded accent-primary-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Analytics Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex-1 mr-4">
                        <h4 className="font-semibold mb-1">Analytics Cookies</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Help us understand how visitors use our website to improve performance.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={() => togglePreference('analytics')}
                          className="w-5 h-5 rounded accent-primary-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex-1 mr-4">
                        <h4 className="font-semibold mb-1">Marketing Cookies</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Used to deliver personalized content and measure ad campaign effectiveness.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={() => togglePreference('marketing')}
                          className="w-5 h-5 rounded accent-primary-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={savePreferences}
                      className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white"
                    >
                      Save Preferences
                    </Button>
                    <Button
                      onClick={() => setShowSettings(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
        </>
      )}

      {/* Legal Modal */}
      <LegalModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </AnimatePresence>
  );
}
