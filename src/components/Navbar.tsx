"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const ThemeToggle = dynamic(
  () =>
    import("@/components/ThemeToggle").then((mod) => ({
      default: mod.ThemeToggle,
    })),
  { ssr: false, loading: () => <div className="w-10 h-10" /> }
);

type Language = "nl" | "en" | "fr";

// navLinks: internal sections + Blog page
const navLinks = [
  { name: { nl: "Home", en: "Home", fr: "Accueil" }, href: "#", blog: false },
  {
    name: { nl: "Diensten", en: "Services", fr: "Services" },
    href: "#services",
    blog: false,
  },
  {
    name: { nl: "Over ons", en: "About", fr: "À propos" },
    href: "#about",
    blog: false,
  },
  {
    name: { nl: "Contact", en: "Contact", fr: "Contact" },
    href: "#contact",
    blog: false,
  },
  
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const langContext = useLanguage();
  const rawLang = (langContext?.language as Language) || "nl";
  const language: Language =
    rawLang === "en" || rawLang === "fr" || rawLang === "nl" ? rawLang : "nl";
  const setLanguage = langContext?.setLanguage ?? (() => {});

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);

    // If we are NOT on the home page, navigate to home with hash
    if (pathname !== "/") {
      if (href === "#") {
        router.push("/");
      } else if (href.startsWith("#")) {
        router.push(`/${href}`); // e.g. "/#services"
      } else {
        router.push(href);
      }
      return;
    }

    // We ARE on the home page → smooth scroll
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-black shadow-md ${
        scrolled ? "py-3" : "py-4"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center flex-shrink-0"
          >
            <button
              onClick={() => scrollToSection("#")}
              className="flex items-center gap-3 hover:scale-105 transition-transform"
            >
              {mounted && (
                <img
                  src={
                    resolvedTheme === "dark"
                      ? "/fluxive-logo-dark.png"
                      : "/fluxive-logo-light.png"
                  }
                  alt="Fluxive Logo"
                  className="h-14 w-14 md:h-16 md:w-16 transition-opacity duration-300"
                />
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
            className="hidden md:flex items-center gap-8 ml-auto"
          >
            {navLinks.map((link, index) =>
              link.blog ? (
                // BLOG → always go to /blog
                <Link
                  key={index}
                  href="/blog"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors font-medium relative group px-3 py-2"
                >
                  {link.name[language]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ) : (
                // Internal sections
                <button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors font-medium relative group px-3 py-2"
                >
                  {link.name[language]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300" />
                </button>
              )
            )}

            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded-full border border-primary-500/30">
              {(["nl", "en", "fr"] as Language[]).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={`px-2.5 py-1 text-xs sm:text-sm rounded-full transition ${
                    language === lng
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

            {/* Mobile language switcher */}
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded-full border border-primary-500/30">
              {(["nl", "en", "fr"] as Language[]).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={`px-2 py-1 text-[10px] rounded-full transition ${
                    language === lng
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
                  {navLinks.map((link, index) =>
                    link.blog ? (
                      <Link
                        key={index}
                        href="/blog"
                        onClick={() => setIsOpen(false)}
                        className="text-left text-xl font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors py-2"
                      >
                        {link.name[language]}
                      </Link>
                    ) : (
                      <button
                        key={index}
                        onClick={() => scrollToSection(link.href)}
                        className="text-left text-xl font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors py-2"
                      >
                        {link.name[language]}
                      </button>
                    )
                  )}

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
