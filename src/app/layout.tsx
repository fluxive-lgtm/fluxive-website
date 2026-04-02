import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieBanner } from "@/components/CookieBanner";
import ChatWidgetWrapper from "@/components/ChatWidgetWrapper";
import { LanguageProvider } from "@/context/LanguageContext";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://fluxive.be"
  ),
  title: "FLUXIVE - IT Services, Cybersecurity & Wi-Fi in Belgium",
  description:
    "Transform your business with premium IT services, marketing solutions, AI automation, web development, penetration testing, and cybersecurity in Belgium.",
  keywords: [
    "IT Services",
    "Marketing Solutions",
    "AI Automation",
    "Web Development",
    "Penetration Testing",
    "Cybersecurity",
  ],
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "FLUXIVE - IT Services, Cybersecurity & Wi-Fi in Belgium",
    description: "Transform Your Business with Premium IT Solutions",
    type: "website",
    url: "https://fluxive.be",
    images: ["/fluxive-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FLUXIVE - IT Services, Cybersecurity & Wi-Fi in Belgium",
    description: "Transform Your Business with Premium IT Solutions",
    images: ["/fluxive-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl" // Default language: Dutch (NL)
      className={`${inter.variable} ${orbitron.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["ITService", "Organization", "LocalBusiness"],
                  name: "FLUXIVE",
                  url: "https://fluxive.be",
                  logo: "https://fluxive.be/fluxive-logo.png",
                  image: "https://fluxive.be/fluxive-logo.png",
                  description:
                    "Premium IT Services, Marketing Solutions, AI Automation, Web Development, Penetration Testing, and Cybersecurity",
                  email: "info@fluxive.be",
                  telephone: "+32472925741",
                  priceRange: "$$",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "BE",
                    addressLocality: "Ninove"
                  },
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "5.0",
                    reviewCount: "25",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+32472925741",
                    contactType: "customer service",
                    email: "info@fluxive.be",
                    availableLanguage: ["English", "Dutch", "French"],
                  },
                  sameAs: [
                    "https://github.com/fluxive",
                    "https://twitter.com/fluxive",
                    "https://www.instagram.com/fluxi_ve/",
                    "https://facebook.com/fluxive",
                  ],
                  areaServed: "Worldwide",
                  founder: {
                    "@type": "Person",
                    name: "Jaiamet",
                    jobTitle: "Founder & IT Consultant"
                  },
                  serviceType: [
                    "IT Services",
                    "Marketing Solutions",
                    "AI Automation",
                    "Web Development",
                    "Penetration Testing",
                    "Cybersecurity",
                    "Hotel Wi-Fi Solutions",
                    "Network Setup",
                  ],
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: "What services does Fluxive offer?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Fluxive provides a full mix of IT, cybersecurity and digital services including secure network and Wi-Fi design, firewall and router configuration, penetration testing, website and landing page development, SEO optimisation, online advertising and AI automation.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "Do you work with homeowners or only businesses?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "Both! We help hotels, restaurants, and offices with professional IT solutions, and we also assist homeowners with Wi-Fi problems, weak signals, and home network installation.",
                      },
                    },
                    {
                      "@type": "Question",
                      name: "How long does a typical project take?",
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: "A simple Wi-Fi optimisation or router setup can be completed in one day. A full website with content and tracking usually takes between 2 and 6 weeks. Larger projects are split into phases.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-gradient-to-r focus:from-primary-500 focus:to-secondary-500 focus:text-white focus:rounded-lg focus:font-semibold"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* 🔹 LanguageProvider wraps EVERYTHING that uses useLanguage */}
          <LanguageProvider>
            <CookieBanner />
            {children}
            <ChatWidgetWrapper />
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-81Y9857P2K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-81Y9857P2K');
          `}
        </Script>
      </body>
    </html>
  );
}
