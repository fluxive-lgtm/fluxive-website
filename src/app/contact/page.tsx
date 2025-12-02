import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedBackground from "@/components/AnimatedBackground";
import { FloatingWifiSupport } from "@/components/FloatingWifiSupport";
import { FloatingPromo } from "@/components/FloatingPromo";

export default function ContactPage() {
    return (
        <main className="relative overflow-x-hidden" id="main-content">
            <AnimatedBackground />
            <ScrollToTop />
            <Navbar />

            {/* Add some top padding to account for the fixed navbar if necessary, 
          or rely on the Contact component's padding. 
          The Contact component has py-24, which should be sufficient. */}
            <div className="pt-20">
                <Contact />
            </div>

            <Footer />

            {/* Floating elements */}
            <FloatingSocial />
            <FloatingWifiSupport />
            <FloatingPromo />
        </main>
    );
}
