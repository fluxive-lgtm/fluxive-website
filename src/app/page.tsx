import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import dynamic from 'next/dynamic';

const Services = dynamic(() => import("@/components/Services"));
const About = dynamic(() => import("@/components/About"));

const CommonProblems = dynamic(() => import("@/components/CommonProblems"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const OurWork = dynamic(() => import("@/components/OurWork"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Contact = dynamic(() => import("@/components/Contact"));
const FloatingWifiSupport = dynamic(() => import("@/components/FloatingWifiSupport").then(mod => mod.FloatingWifiSupport));
const FloatingPromo = dynamic(() => import("@/components/FloatingPromo").then(mod => mod.FloatingPromo));
const AnimatedBackground = dynamic(() => import("@/components/AnimatedBackground"));
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"));
const Footer = dynamic(() => import("@/components/Footer"));
const FloatingSocial = dynamic(() => import("@/components/FloatingSocial"));

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
      <Testimonials />
      <OurWork />
      <FAQ />
      <Contact />
      <Footer />

      {/* Existing floating social icons */}
      <FloatingSocial />

      {/* NEW: Floating 24/7 Wi-Fi Support button */}
      <FloatingWifiSupport />

      {/* NEW: Floating Promo (Free Consultation) */}
      <FloatingPromo />



    </main>
  );
}
