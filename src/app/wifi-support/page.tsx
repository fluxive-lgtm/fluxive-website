import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedBackground from "@/components/AnimatedBackground";
import { FloatingWifiSupport } from "@/components/FloatingWifiSupport";
import { WifiSupportForm } from "@/components/WifiSupportForm";

export const metadata = {
  title: "Wi-Fi Support | Fluxive",
  description:
    "Submit a Wi-Fi support request. Fluxive will investigate your network problem.",
};

export default function WifiSupportPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" id="main-content">
      <AnimatedBackground />
      <ScrollToTop />
      <Navbar />

      {/* 👇 ADD pt-32 so content starts below the fixed navbar */}
      <section className="relative z-10 flex items-center justify-center px-4 py-16 pt-32">
        <div className="w-full max-w-5xl">
          <WifiSupportForm />
        </div>
      </section>

      <Footer />
      <FloatingSocial />
      <FloatingWifiSupport />
    </main>
  );
}
