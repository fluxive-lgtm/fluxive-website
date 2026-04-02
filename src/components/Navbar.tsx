"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const ThemeToggle = dynamic(
  () => import("@/components/ThemeToggle").then((mod) => ({ default: mod.ThemeToggle })),
  {
    ssr: false,
    loading: () => <div className="w-10 h-10" />,
  }
);

type Language = "nl" | "en" | "fr";

const navLinks = [
  { name: { nl: "Home", en: "Home", fr: "Accueil" }, href: "/" },
  { name: { nl: "Diensten", en: "Services", fr: "Services" }, href: "/#services" },
  { name: { nl: "Ons Werk", en: "Our Work", fr: "Notre Travail" }, href: "/our-work" },
  // { name: { nl: "Blog", en: "Blog", fr: "Blogue" }, href: "/blog" },
  { name: { nl: "Over ons", en: "About", fr: "À propos" }, href: "#about" },
  { name: { nl: "Contact", en: "Contact", fr: "Contact" }, href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const langContext = useLanguage();
  const rawLang = (langContext?.language as Language) || "nl";
  const language: Language =
    rawLang === "en" || rawLang === "fr" || rawLang === "nl" ? rawLang : "nl";
  const setLanguage = langContext?.setLanguage ?? (() => { });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 20);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }
    if (pathname === "/") {
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(`/${href === "#" ? "" : href}`);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform 
        ${scrolled
          ? "py-4 bg-white/90 dark:bg-black/80 backdrop-blur-xl shadow-lg shadow-primary-500/5"
          : "py-6 bg-transparent"
        }`}
    >
      {/* Colorful Gradient Border Bottom when scrolled */}
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-500 to-transparent transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo - BIGGER */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center flex-shrink-0"
          >
            <button
              onClick={() => scrollToSection("#")}
              className="group flex items-center gap-3 hover:scale-105 transition-transform duration-300"
            >
              {mounted && (
                <div className="relative h-14 w-52 md:h-16 md:w-64 transition-all duration-300">
                  {/* Glow effect behind logo */}
                  <div className="absolute inset-0 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Image
                    src="/favicon.svg"
                    alt="Fluxive Logo"
                    fill
                    className="object-contain relative z-10"
                    priority
                  />
                </div>
              )}
              {!mounted && <div className="h-14 w-52 md:h-16 md:w-64" />}
            </button>
          </motion.div>

          {/* Desktop Navigation - BIGGER & COLORFUL */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`hidden lg:flex flex-1 justify-center items-center gap-1 px-4 py-2.5 rounded-full transition-all duration-300 ${scrolled ? "" : "bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10"}`}
          >
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="relative px-3 py-2 text-sm font-bold tracking-wide text-gray-700 dark:text-gray-200 transition-all duration-300 font-display group overflow-hidden rounded-full hover:bg-white/60 dark:hover:bg-white/10"
              >
                {/* Colorful Text Gradient on Hover */}
                <span className="relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-accent-600 transition-colors duration-300">
                  {link.name[language]}
                </span>

                {/* Subtle Indicator Dot */}
                <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
              </button>
            ))}
          </motion.div>

          {/* Desktop Actions - BIGGER BUTTON */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden md:flex items-center gap-5"
          >
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white/60 dark:bg-black/60 p-1.5 rounded-full border border-primary-500/20 backdrop-blur-md">
              {(["nl", "en", "fr"] as Language[]).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${language === lng
                    ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-500/30"
                    : "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                    }`}
                >
                  <span className="notranslate">{lng.toUpperCase()}</span>
                </button>
              ))}
            </div>

            <ThemeToggle />

            <Button
              onClick={() => scrollToSection("#contact")}
              className="relative group bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 hover:from-primary-500 hover:to-accent-400 text-white shadow-xl shadow-primary-500/30 rounded-full px-6 py-3 overflow-hidden transition-all duration-300 hover:scale-105"
            >

              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />

              <span className="relative z-10 text-sm font-bold tracking-wide flex items-center gap-2">
                {language === "nl"
                  ? "Starten"
                  : language === "fr"
                    ? "Commencer"
                    : "Get Started"}
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </span>
            </Button>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-12 w-12 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl">
                  <Menu className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-white/95 dark:bg-gray-950/95 w-[320px] border-l border-primary-500/20 backdrop-blur-2xl"
              >
                <div className="flex flex-col gap-8 mt-12">
                  {/* Mobile Logo */}
                  <div className="relative h-12 w-48 mx-auto -mt-4 mb-4">
                    <Image
                      src="/favicon.svg"
                      alt="Fluxive"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left py-4 px-6 text-xl font-bold font-display text-gray-800 dark:text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-primary-600 hover:to-accent-600 rounded-2xl transition-all shadow-sm hover:shadow-lg hover:shadow-primary-500/30"
                    >
                      {link.name[language]}
                    </button>
                  ))}

                  <div className="mt-auto mb-8 space-y-6">
                    {/* Mobile Language */}
                    <div className="flex justify-center">
                      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 p-2 rounded-2xl">
                        {(["nl", "en", "fr"] as Language[]).map((lng) => (
                          <button
                            key={lng}
                            onClick={() => setLanguage(lng)}
                            className={`px-5 py-3 text-sm font-bold rounded-xl transition-all ${language === lng
                              ? "bg-white dark:bg-gray-800 text-primary-600 shadow-md"
                              : "text-gray-500 dark:text-gray-400"
                              }`}
                          >
                            <span className="notranslate">{lng.toUpperCase()}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => scrollToSection("#contact")}
                      className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl py-7 text-xl font-bold shadow-xl shadow-primary-500/30 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {language === "nl" ? "Starten" : language === "fr" ? "Commencer" : "Get Started"}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
