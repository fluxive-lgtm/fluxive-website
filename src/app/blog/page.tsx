"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSocial from "@/components/FloatingSocial";
import ScrollToTop from "@/components/ScrollToTop";
import AnimatedBackground from "@/components/AnimatedBackground";
import { FloatingWifiSupport } from "@/components/FloatingWifiSupport";
import { useLanguage } from "@/context/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, Shield, Wifi, Globe2 } from "lucide-react";

type Lang = "nl" | "en" | "fr";

type BlogPost = {
  slug: string;
  date: string;
  readingTime: string;
  category: "wifi" | "security" | "marketing";
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
};

const posts: BlogPost[] = [
  {
    slug: "hotel-wifi-quick-wins",
    date: "2025-02-01",
    readingTime: "4 min",
    category: "wifi",
    title: {
      nl: "5 snelle Wi-Fi verbeteringen voor hotels en B&B’s",
      en: "5 Quick Wi-Fi Wins for Hotels and B&Bs",
      fr: "5 améliorations Wi-Fi rapides pour hôtels et B&B",
    },
    excerpt: {
      nl: "Wat kun je vandaag doen om het Wi-Fi netwerk in je hotel stabieler en sneller te maken, zonder meteen alles te vervangen?",
      en: "What can you do today to make your hotel Wi-Fi more stable and faster, without replacing everything at once?",
      fr: "Que pouvez-vous faire dès aujourd’hui pour rendre le Wi-Fi de votre hôtel plus stable et plus rapide, sans tout remplacer ?",
    },
  },
  {
    slug: "small-business-cyber-basics",
    date: "2025-02-05",
    readingTime: "5 min",
    category: "security",
    title: {
      nl: "Cybersecurity basics voor kleine ondernemingen",
      en: "Cybersecurity Basics for Small Businesses",
      fr: "Les bases de la cybersécurité pour les petites entreprises",
    },
    excerpt: {
      nl: "Geen tijd voor een volledig security team? Dit zijn de minimale maatregelen die elke KMO vandaag nodig heeft.",
      en: "No time for a full security team? These are the minimum controls every small business should have today.",
      fr: "Pas de temps pour une équipe de sécurité complète ? Voici les mesures minimales que chaque PME devrait avoir.",
    },
  },
  {
    slug: "local-seo-hotels-restaurants",
    date: "2025-02-10",
    readingTime: "3 min",
    category: "marketing",
    title: {
      nl: "Hoe lokale SEO je hotel of restaurant vult",
      en: "How Local SEO Fills Your Hotel or Restaurant",
      fr: "Comment le SEO local remplit votre hôtel ou restaurant",
    },
    excerpt: {
      nl: "Google Maps, reviews en de juiste zoekwoorden: zo zorg je dat gasten jou vinden, niet je concurrent.",
      en: "Google Maps, reviews and the right keywords: this is how guests find you instead of your competitor.",
      fr: "Google Maps, avis et bons mots-clés : voici comment les clients vous trouvent, et pas seulement vos concurrents.",
    },
  },
];

const labels: Record<
  Lang,
  {
    heading: string;
    subheading: string;
    readMore: string;
    wifiTag: string;
    securityTag: string;
    marketingTag: string;
  }
> = {
  nl: {
    heading: "Fluxive Blog",
    subheading:
      "Praktische tips over Wi-Fi, IT-infrastructuur, cybersecurity en digitale marketing voor hotels en KMO’s.",
    readMore: "Lees artikel",
    wifiTag: "Wi-Fi & netwerk",
    securityTag: "Cybersecurity",
    marketingTag: "Marketing & groei",
  },
  en: {
    heading: "Fluxive Blog",
    subheading:
      "Practical tips on Wi-Fi, IT infrastructure, cybersecurity and digital marketing for hotels and small businesses.",
    readMore: "Read article",
    wifiTag: "Wi-Fi & Network",
    securityTag: "Cybersecurity",
    marketingTag: "Marketing & Growth",
  },
  fr: {
    heading: "Blog Fluxive",
    subheading:
      "Conseils pratiques sur le Wi-Fi, l’infrastructure IT, la cybersécurité et le marketing digital pour hôtels et PME.",
    readMore: "Lire l’article",
    wifiTag: "Wi-Fi & Réseau",
    securityTag: "Cybersécurité",
    marketingTag: "Marketing & Croissance",
  },
};

function getCategoryIcon(category: BlogPost["category"]) {
  switch (category) {
    case "wifi":
      return <Wifi className="w-4 h-4" />;
    case "security":
      return <Shield className="w-4 h-4" />;
    case "marketing":
      return <Globe2 className="w-4 h-4" />;
  }
}

export default function BlogPage() {
  const { language } = useLanguage() ?? { language: "nl" };
  const lang: Lang =
    (language as Lang) === "en" ||
    (language as Lang) === "fr" ||
    (language as Lang) === "nl"
      ? (language as Lang)
      : "nl";

  const t = labels[lang];

  return (
    <main className="relative min-h-screen overflow-x-hidden" id="main-content">
      <AnimatedBackground />
      <ScrollToTop />
      <Navbar />

      {/* top spacing under fixed navbar */}
      <section className="relative z-10 px-4 pt-28 pb-16">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <header className="mb-10 text-center">
            <Badge className="glass-card border-primary-500/30 mb-3">
              Blog · Fluxive
            </Badge>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">
              {t.heading}
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              {t.subheading}
            </p>
          </header>

          {/* Posts grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="glass-card border border-primary-500/20 rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:shadow-lg hover:shadow-primary-500/15 transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary-500/10 border border-primary-500/30">
                      {getCategoryIcon(post.category)}
                      <span>
                        {
                          {
                            wifi: t.wifiTag,
                            security: t.securityTag,
                            marketing: t.marketingTag,
                          }[post.category]
                        }
                      </span>
                    </span>
                  </div>

                  <h2 className="text-lg md:text-xl font-semibold mb-2">
                    {post.title[lang]}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {post.excerpt[lang]}
                  </p>
                </div>

                {/* For now this button doesn't navigate anywhere – later we can add /blog/[slug] pages */}
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full justify-center glass-card border-primary-500/40"
                  >
                    {t.readMore}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingSocial />
      <FloatingWifiSupport />
    </main>
  );
}
