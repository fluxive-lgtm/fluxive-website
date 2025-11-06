import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { MouseTrail } from "@/components/MouseTrail";
import { ParticleBackground } from "@/components/ParticleBackground";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'),
  title: "FLUXIVE - Premium IT Services & Solutions",
  description: "Transform your business with premium IT services, marketing solutions, AI automation, web development, penetration testing, and cybersecurity.",
  keywords: ["IT Services", "Marketing Solutions", "AI Automation", "Web Development", "Penetration Testing", "Cybersecurity"],
  icons: {
    icon: "/favicon.png",
    apple: "/fluxive-logo.png",
  },
  openGraph: {
    title: "FLUXIVE - Premium IT Services & Solutions",
    description: "Transform Your Business with Premium IT Solutions",
    type: "website",
    images: ["/fluxive-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress hydration warnings caused by browser extensions
              (function() {
                const originalError = console.error;
                console.error = function(...args) {
                  const firstArg = args[0];
                  if (typeof firstArg === 'string') {
                    // Check if it's a hydration error
                    if (
                      firstArg.includes('Hydration failed') ||
                      firstArg.includes('hydrated') ||
                      firstArg.includes('did not match') ||
                      firstArg.includes('A tree hydrated but some attributes')
                    ) {
                      // Check if it's related to browser extension attributes
                      const errorStr = args.join(' ');
                      if (
                        errorStr.includes('fdprocessedid') || 
                        errorStr.includes('__reactFiber') ||
                        errorStr.includes('__reactProps') ||
                        errorStr.includes('__reactEvents')
                      ) {
                        // Suppress this error
                        return;
                      }
                    }
                  }
                  originalError.apply(console, args);
                };
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
          <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ParticleBackground />
          <MouseTrail />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
