"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
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
  { name: { nl: "Home", en: "Home", fr: "Accueil" }, href: "#" },
  { name: { nl: "Diensten", en: "Services", fr: "Services" }, href: "#services" },
  { name: { nl: "Over ons", en: "About", fr: "À propos" }, href: "#about" },
  { name: { nl: "Contact", en: "Contact", fr: "Contact" }, href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false); // stays false now
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

          // Update scrolled state for background effect
          setScrolled(currentScrollY > 50);

          // hide-on-scroll logic removed → navbar always visible
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

    if (pathname === "/") {
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If not on home page, navigate to home page with hash
      router.push(`/${href === "#" ? "" : href}`);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{
        duration: hidden ? 0.2 : 0.3,
        ease: hidden ? [0.4, 0, 1, 1] : [0, 0, 0.2, 1],
        type: "tween",
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-black shadow-md ${scrolled ? "py-3" : "py-4"
        }`}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center flex-shrink-0"
          >
            <button
              onClick={() => scrollToSection("#")}
              className="flex items-center gap-3 hover:scale-105 transition-transform"
            >
              {mounted && (
                <div className="relative h-14 w-14 md:h-16 md:w-16 transition-opacity duration-300">
                  <Image
                    src={
                      resolvedTheme === "dark"
                        ? "/fluxive-logo-dark.png"
                        : "/fluxive-logo-light.png"
                    }
                    alt="Fluxive Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
              {!mounted && <div className="h-14 w-14 md:h-16 md:w-16" />}
              <span className="text-2xl md:text-3xl font-display font-bold gradient-text">
                FLUXIVE
              </span>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden md:flex items-center gap-8 ml-auto"
          >
            {navLinks.map((link, index) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors font-medium relative group px-3 py-2"
              >
                {link.name[language]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}

            {/* Language Switcher (right corner) */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full border border-primary-500/30">
              {(["nl", "en", "fr"] as Language[]).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={`px-2.5 py-1 text-xs sm:text-sm rounded-full transition ${language === lng
                    ? "bg-primary-500 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-primary-500/20"
                    }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>

            <ThemeToggle />

            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
            >
              {language === "nl"
                ? "Starten"
                : language === "fr"
                  ? "Commencer"
                  : "Get Started"}
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />

            {/* Small language switcher on mobile */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded-full border border-primary-500/30">
              {(["nl", "en", "fr"] as Language[]).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={`px-2 py-1 text-[10px] rounded-full transition ${language === lng
                    ? "bg-primary-500 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-primary-500/20"
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
              <SheetContent
                side="right"
                className="bg-white dark:bg-black w-[300px]"
              >
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left text-xl font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors py-2"
                    >
                      {link.name[language]}
                    </button>
                  ))}
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
