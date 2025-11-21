"use client";

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

// NEW — Floating Wi-Fi Support button
import { FloatingWifiSupport } from "@/components/FloatingWifiSupport";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden" id="main-content">
      <AnimatedBackground />
      <ScrollToTop />
      <Navbar />

      {/* Main sections */}
      <Hero />
      <Services />
      <About />
      <FAQ />
      <Contact />
      <Footer />

      {/* Floating social icons */}
      <FloatingSocial />

      {/* NEW: Floating Wi-Fi Support 24/7 button */}
      <FloatingWifiSupport />
    </main>
  );
}
