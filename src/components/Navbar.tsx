"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";

const ThemeToggle = dynamic(
  () => import("@/components/ThemeToggle").then(mod => ({ default: mod.ThemeToggle })),
  { ssr: false }
);

const navLinks = [
  { name: { nl: "Home", en: "Home", fr: "Accueil" }, href: "#" },
  { name: { nl: "Diensten", en: "Services", fr: "Services" }, href: "#services" },
  { name: { nl: "Over ons", en: "About", fr: "À propos" }, href: "#about" },
  { name: { nl: "Contact", en: "Contact", fr: "Contact" }, href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  const { language, setLanguage } = useLanguage() || {
    language: "nl",
    setLanguage: () => {},
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black shadow-md ${
        scrolled ? "py-3" : "py-4"
      } transition-all`}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-6">

          {/* Logo */}
          <button onClick={() => scrollToSection("#")} className="flex items-center gap-3">
            {mounted && (
              <img
                src={
                  resolvedTheme === "dark"
                    ? "/fluxive-logo-dark.png"
                    : "/fluxive-logo-light.png"
                }
                alt="Fluxive Logo"
                className="h-14 w-14 md:h-16 md:w-16"
              />
            )}
            {!mounted && <div className="h-14 w-14 md:h-16 md:w-16" />}
            <span className="text-2xl md:text-3xl font-display font-bold gradient-text">
              FLUXIVE
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 ml-auto">

            {/* Nav Links */}
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors font-medium px-3 py-2 relative group"
              >
                {link.name[language]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all" />
              </button>
            ))}

            {/* LANGUAGE SWITCHER */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full border border-primary-500/30">
              {(["nl", "en", "fr"] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={`px-2.5 py-1 text-sm rounded-full transition ${
                    language === lng
                      ? "bg-primary-500 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-primary-500/20"
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* CTA Button */}
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
            >
              {language === "nl" ? "Starten" : language === "fr" ? "Commencer" : "Get Started"}
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />

            {/* LANGUAGE SWITCHER MOBILE */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full border border-primary-500/30">
              {(["nl", "en", "fr"] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={`px-2 py-1 text-xs rounded-full transition ${
                    language === lng
                      ? "bg-primary-500 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-primary-500/20"
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="bg-white dark:bg-black w-[300px]">
                <div className="flex flex-col gap-6 mt-8">

                  {/* Mobile Nav Links */}
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left text-xl font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 py-2"
                    >
                      {link.name[language]}
                    </button>
                  ))}

                  {/* CTA */}
                  <Button
                    onClick={() => scrollToSection("#contact")}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 w-full"
                  >
                    {language === "nl"
                      ? "Starten"
                      : language === "fr"
                      ? "Commencer"
                      : "Get Started"}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
