"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = dynamic(
  () => import("@/components/ThemeToggle").then(mod => ({ default: mod.ThemeToggle })),
  {
    ssr: false,
    loading: () => <div className="w-10 h-10" />
  }
);

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false); // stays false now
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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

          // ❌ removed hide-on-scroll logic so navbar always stays visible
          // if (currentScrollY > lastScrollY && currentScrollY > 100) {
          //   setHidden(true);
          // } else if (currentScrollY < lastScrollY) {
          //   setHidden(false);
          // }

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
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}  // hidden is always false now → stays at 0
      transition={{
        duration: hidden ? 0.2 : 0.3,
        ease: hidden ? [0.4, 0, 1, 1] : [0, 0, 0.2, 1],
        type: "tween"
      }}
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
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center flex-shrink-0"
          >
            <button
              onClick={() => scrollToSection("#")}
              className="flex items-center gap-3 hover:scale-105 transition-transform"
            >
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
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors font-medium relative group px-3 py-2"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
            <ThemeToggle />
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
            >
              Get Started
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white dark:bg-black w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left text-xl font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors py-2"
                    >
                      {link.name}
                    </button>
                  ))}
                  <Button
                    onClick={() => scrollToSection("#contact")}
                    className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 w-full"
                  >
                    Get Started
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
