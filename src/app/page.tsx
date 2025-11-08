import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="relative" id="main-content">
      <ScrollToTop />
      <Navbar />
      <Hero />
      <Services />
      <About />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingSocial />
    </main>
  );
}
