"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TiltCard } from "@/components/TiltCard";
import {
  Server,
  TrendingUp,
  Bot,
  Code,
  Shield,
  CheckCircle,
  Lock,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

type Language = "nl" | "en" | "fr";

type ServiceText = {
  title: string;
  description: string;
  features: string[];
  perfectFor: string;
};

type Service = {
  id: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  texts: Record<Language, ServiceText>;
};

const sectionTexts: Record<
  Language,
  { heading: string; accent: string; subheading: string }
> = {
  en: {
    heading: "Our",
    accent: "Services",
    subheading:
      "Practical, real-world solutions for hotels, restaurants, agencies and other growing businesses.",
  },
  nl: {
    heading: "Onze",
    accent: "Diensten",
    subheading:
      "Praktische, realistische oplossingen voor hotels, restaurants, agencies en andere groeiende bedrijven.",
  },
  fr: {
    heading: "Nos",
    accent: "Services",
    subheading:
      "Des solutions concrètes pour les hôtels, restaurants, agences et autres entreprises en croissance.",
  },
};

const services: Service[] = [
  {
    id: "it-wifi",
    icon: Server,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    texts: {
      en: {
        title: "IT Services & Wi-Fi Solutions",
        description:
          "Eliminate dead zones, boost productivity, and keep guests satisfied with enterprise-grade Wi-Fi.",
        features: [
          "Complete network design & optimization",
          "Eliminate dead zones",
          "Enterprise-grade security",
          "24/7 monitoring and support",
        ],
        perfectFor: "Perfect for: Hotels, Restaurants, Offices & Residential Homes",
      },
      nl: {
        title: "IT-diensten & Wi-Fi-oplossingen",
        description:
          "Stabiele IT-infrastructuur en Wi-Fi die gewoon werkt – voor hotels, restaurants, kantoren en kmo’s.",
        features: [
          "Wi-Fi ontwerp voor hotels & restaurants",
          "Oplossing voor dode zones en zwak bereik",
          "Kostenefficiënte netwerkhardware",
          "Doorlopende remote monitoring & support",
        ],
        perfectFor: "Ideaal voor: Hotels, Restaurants, Kantoren & Woningen",
      },
      fr: {
        title: "Services IT & Solutions Wi-Fi",
        description:
          "Une infrastructure IT et un Wi-Fi stables qui fonctionnent vraiment – pour hôtels, restaurants, bureaux et PME.",
        features: [
          "Conception Wi-Fi pour hôtels & restaurants",
          "Suppression des zones mortes",
          "Matériel réseau rentable",
          "Monitoring & support à distance continus",
        ],
        perfectFor: "Parfait pour : Hôtels, Restaurants, Bureaux & Résidences",
      },
    },
  },
  {
    id: "marketing",
    icon: TrendingUp,
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
    texts: {
      en: {
        title: "Digital Marketing & Google Maps",
        description:
          "Stop losing customers to competitors. Dominate local search with our proven digital marketing strategies.",
        features: [
          "Google Business Profile optimization",
          "Local SEO & Maps Ranking",
          "Reputation management",
          "Content marketing",
        ],
        perfectFor: "Perfect for: Hotels, Restaurants & Local Businesses",
      },
      nl: {
        title: "Digitale marketing & Google Maps",
        description:
          "Los je zichtbaarheid op Google op en haal meer gasten en klanten binnen.",
        features: [
          "Google Business-profiel optimalisatie",
          "Lokale SEO & betere Maps-ranking",
          "Campagnes voor hotels & lokale zaken",
          "Review- en reputatiestrategie",
        ],
        perfectFor: "Ideaal voor: Hotels, Restaurants & Lokale Bedrijven",
      },
      fr: {
        title: "Marketing digital & Google Maps",
        description:
          "Améliorez votre visibilité sur Google et attirez plus de clients et de visiteurs.",
        features: [
          "Optimisation de la fiche Google Business",
          "SEO local & positionnement sur Maps",
          "Campagnes pour hôtels & commerces locaux",
          "Stratégie d’avis et de réputation",
        ],
        perfectFor: "Parfait pour : Hôtels, Restaurants & Commerces Locaux",
      },
    },
  },
  {
    id: "ai-automation",
    icon: Bot,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    texts: {
      en: {
        title: "AI Automation & Custom Chatbots",
        description:
          "Save hours every week with AI-powered chatbots and smart workflows that handle inquiries 24/7.",
        features: [
          "Custom AI chatbots",
          "Lead qualification automation",
          "Booking automation",
          "FAQ automation",
        ],
        perfectFor: "Perfect for: Service Businesses & Agencies",
      },
      nl: {
        title: "AI-automatisatie & maatwerk chatbots",
        description:
          "Automatiseer repetitieve taken en voeg slimme AI-chatbots toe aan je website – volledig op maat.",
        features: [
          "Automatisatie van leads & bookings",
          "AI-chatbots voor website & WhatsApp",
          "Automatische e-mails, facturen & herinneringen",
          "Maatwerk AI-flows voor elk type bedrijf",
        ],
        perfectFor: "Ideaal voor: Dienstverleners & Agencies",
      },
      fr: {
        title: "Automatisation IA & chatbots sur mesure",
        description:
          "Automatisez les tâches répétitives et ajoutez des chatbots IA intelligents à votre site – adaptés à votre activité.",
        features: [
          "Automatisation des leads & réservations",
          "Chatbots IA pour site web & WhatsApp",
          "E-mails, factures & rappels automatisés",
          "Scénarios IA sur mesure pour chaque entreprise",
        ],
        perfectFor: "Parfait pour : Prestataires de Services & Agences",
      },
    },
  },
  {
    id: "web-design",
    icon: Code,
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    texts: {
      en: {
        title: "Modern Web Design & Development",
        description:
          "Lightning-fast websites that convert visitors into customers. Mobile-optimized and built for conversions.",
        features: [
          "Custom website design",
          "Lightning-fast loading",
          "Mobile-first development",
          "Conversion optimization",
        ],
        perfectFor: "Perfect for: Startups, SMEs & Rebranding",
      },
      nl: {
        title: "Moderne webdesign & development",
        description:
          "Snelle, moderne websites die je bedrijf professioneel laten overkomen en bezoekers omzetten in klanten.",
        features: [
          "Moderne, responsieve websites",
          "Integratie met bookings & contactformulieren",
          "SEO-vriendelijke structuur",
          "Integratie van AI-chatbots & analytics",
        ],
        perfectFor: "Ideaal voor: Startups, KMO's & Rebranding",
      },
      fr: {
        title: "Webdesign moderne & développement",
        description:
          "Des sites rapides et modernes qui valorisent votre image et transforment les visiteurs en clients.",
        features: [
          "Sites modernes et responsives",
          "Intégration de réservations & formulaires",
          "Structure optimisée pour le SEO",
          "Intégration de chatbots IA & analytics",
        ],
        perfectFor: "Parfait pour : Startups, PME & Rebranding",
      },
    },
  },
  {
    id: "pentest",
    icon: Shield,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    texts: {
      en: {
        title: "Penetration Testing",
        description:
          "Find your security vulnerabilities before hackers do. Professional testing for SMEs.",
        features: [
          "Website penetration testing",
          "Web application security testing",
          "Internal network testing",
          "Comprehensive reporting",
        ],
        perfectFor: "Perfect for: E-commerce, SaaS & Data-Heavy SMEs",
      },
      nl: {
        title: "Penetratietesten",
        description:
          "Professionele beveiligingstesten voor websites, webapps en interne systemen – vóórdat aanvallers dat doen.",
        features: [
          "Webapplicatie-pentests",
          "Infrastructuur- & netwerktesten",
          "Rapporten in duidelijke taal",
          "Geprioritiseerd actie- en verbeterplan",
        ],
        perfectFor: "Ideaal voor: E-commerce, SaaS & Data-intensieve KMO's",
      },
      fr: {
        title: "Tests d’intrusion",
        description:
          "Tests de sécurité professionnels pour vos sites, applications web et systèmes internes – avant les attaquants.",
        features: [
          "Pentests d’applications web",
          "Tests d’infrastructure & réseau",
          "Rapports clairs orientés métier",
          "Plan de remédiation priorisé",
        ],
        perfectFor: "Parfait pour : E-commerce, SaaS & PME gérant des données",
      },
    },
  },
  {
    id: "cyber",
    icon: Lock,
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    texts: {
      en: {
        title: "Cybersecurity & Protection",
        description:
          "End-to-end security for small and medium businesses – without enterprise-level complexity.",
        features: [
          "Baseline Security for SMEs",
          "Email & Phishing Protection",
          "Incident Response Guidance",
          "Policies, Backups & Best Practices",
        ],
        perfectFor: "Perfect for: SMEs, Offices & Retail",
      },
      nl: {
        title: "Cybersecurity & Bescherming",
        description:
          "Complete beveiliging voor kmo’s – zonder de complexiteit van enterprise-oplossingen.",
        features: [
          "Basisbeveiliging voor kmo’s",
          "E-mail & Phishing bescherming",
          "Hulp bij incidenten",
          "Beleid, back-ups & best practices",
        ],
        perfectFor: "Ideaal voor: KMO's, Kantoren & Retail",
      },
      fr: {
        title: "Cybersécurité & Protection",
        description:
          "Sécurité de bout en bout pour les PME – sans la complexité des grandes entreprises.",
        features: [
          "Sécurité de base pour PME",
          "Protection e-mail & phishing",
          "Assistance en cas d'incident",
          "Politiques, sauvegardes & bonnes pratiques",
        ],
        perfectFor: "Parfait pour : PME, Bureaux & Retail",
      },
    },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

export default function Services() {
  const langContext = useLanguage();
  const rawLang = (langContext?.language as Language) || "nl";
  const language: Language =
    rawLang === "en" || rawLang === "fr" || rawLang === "nl" ? rawLang : "nl";

  const section = sectionTexts[language];

  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4 px-2">
            {section.heading}{" "}
            <span className="gradient-text">{section.accent}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            {section.subheading}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const t = service.texts[language];

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="flex"
              >
                <Link href={`/services/${service.id}`} className="w-full">
                  <TiltCard>
                    <Card
                      className="glass-card group w-full h-full flex flex-col border border-white/20 dark:border-white/10 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20"
                    >
                      <CardHeader className="p-4 sm:p-5 flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <div
                            className={`bg-gradient-to-br ${service.color} p-2.5 rounded-lg`}
                          >
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                        </div>
                        <CardTitle className="text-base sm:text-lg font-display mb-2 text-center min-h-[3rem] flex items-center justify-center">
                          {t.title}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-center line-clamp-3 min-h-[4rem]">
                          {t.description}
                        </CardDescription>
                        {/* Perfect For Label */}
                        <div className="mt-2 text-center">
                          <span className="inline-block px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/20 text-[10px] sm:text-xs font-medium text-primary-700 dark:text-primary-300 border border-primary-100 dark:border-primary-800">
                            {t.perfectFor}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-5 pt-0 flex-grow">
                        <ul className="space-y-1.5 sm:space-y-2">
                          {t.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start text-xs sm:text-sm text-gray-700 dark:text-gray-300"
                            >
                              <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 mt-0.5 text-primary-500 flex-shrink-0" />
                              <span className="line-clamp-2">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
