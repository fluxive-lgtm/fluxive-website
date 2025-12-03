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
import CommonProblems from "@/components/CommonProblems";

import { FloatingWifiSupport } from "@/components/FloatingWifiSupport";  // ← NEW IMPORT
import { FloatingPromo } from "@/components/FloatingPromo";
import { FloatingReview } from "@/components/FloatingReview";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden" id="main-content">
      <AnimatedBackground />
      <ScrollToTop />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <CommonProblems />
      <FAQ />
      <Contact />
      <Footer />

      {/* Existing floating social icons */}
      <FloatingSocial />

      {/* NEW: Floating 24/7 Wi-Fi Support button */}
      <FloatingWifiSupport />

      {/* NEW: Floating Promo (Free Consultation) */}
      <FloatingPromo />

      {/* NEW: Floating Review Icon */}
      <FloatingReview />

    </main>
  );
}
