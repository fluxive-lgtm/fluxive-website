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
    process.env.NEXT_PUBLIC_SITE_URL || "https://fluxive.com"
  ),
  title: "FLUXIVE - Premium IT Services & Solutions",
  description:
    "Transform your business with premium IT services, marketing solutions, AI automation, web development, penetration testing, and cybersecurity.",
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
  openGraph: {
    title: "FLUXIVE - Premium IT Services & Solutions",
    description: "Transform Your Business with Premium IT Solutions",
    type: "website",
    url: "https://fluxive.com",
    images: ["/fluxive-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FLUXIVE - Premium IT Services & Solutions",
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
      lang="nl" // default language = Dutch
      className={`${inter.variable} ${orbitron.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FLUXIVE",
              url: "https://fluxive.com",
              logo: "https://fluxive.com/fluxive-logo.png",
              description:
                "Premium IT Services, Marketing Solutions, AI Automation, Web Development, Penetration Testing, and Cybersecurity",
              email: "info@fluxive.be",
              telephone: "+32472925741",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+32472925741",
                contactType: "customer service",
                email: "info@fluxive.be",
                availableLanguage: ["English", "Dutch", "French"],
              },
              sameAs: [
                "https://github.com/fluxive",
                "https://linkedin.com/company/fluxive",
                "https://twitter.com/fluxive",
                "https://instagram.com/fluxive",
                "https://facebook.com/fluxive",
              ],
              areaServed: "Worldwide",
              serviceType: [
                "IT Services",
                "Marketing Solutions",
                "AI Automation",
                "Web Development",
                "Penetration Testing",
                "Cybersecurity",
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
