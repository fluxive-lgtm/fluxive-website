"use client";

import { useState, useEffect } from "react";
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
  Lock,
  CheckCircle,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Language = "nl" | "en" | "fr";

type ServiceText = {
  title: string;
  description: string;
  features: string[];
  details: string;
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
          "Reliable IT infrastructure and Wi-Fi that just works – for hotels, restaurants, offices and small businesses.",
        features: [
          "Hotel & Restaurant Wi-Fi Design",
          "Coverage Fix for Dead Zones",
          "Cost-Effective Network Hardware",
          "Ongoing Remote Monitoring & Support",
        ],
        details:
          "Most small businesses, especially hotels and restaurants, struggle with unstable and slow Wi-Fi: some rooms have no signal, routers are badly placed, and the internet feels overloaded all the time. On top of that, many are paying too much for hardware that is not configured properly. At FLUXIVE, we design and install professional Wi-Fi setups for hotels, cafés, co-working spaces and offices – with separate guest and staff networks, full-building coverage, and stable performance. We choose cost-effective, business-grade access points and configure everything securely, so you get strong, stable Wi-Fi without wasting money on oversized or wrong equipment. We also help with routers, switches, backups and remote support, so you always have someone to call when something goes wrong.",
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
        details:
          "Veel kleinere bedrijven, zeker hotels en restaurants, hebben last van trage of onstabiele Wi-Fi: bepaalde kamers zonder bereik, verkeerd geplaatste routers en een netwerk dat constant overbelast lijkt. Daarbovenop betalen ze vaak te veel voor hardware die niet juist is ingesteld. Bij FLUXIVE ontwerpen en installeren we professionele Wi-Fi-oplossingen voor hotels, cafés, co-working spaces en kantoren – met aparte netwerken voor gasten en personeel, dekking in het hele gebouw en stabiele prestaties. We kiezen betaalbare, zakelijke access points en configureren alles veilig, zodat je sterke, stabiele Wi-Fi hebt zonder geld te verspillen aan verkeerde apparatuur. We helpen ook met routers, switches, backups en remote ondersteuning, zodat je altijd iemand hebt om op terug te vallen.",
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
        details:
          "De nombreuses petites entreprises, en particulier les hôtels et restaurants, souffrent d’un Wi-Fi instable et lent : certaines chambres n’ont pas de signal, les routeurs sont mal placés et le réseau est constamment surchargé. En plus, beaucoup paient trop cher pour du matériel mal configuré. Chez FLUXIVE, nous concevons et installons des réseaux Wi-Fi professionnels pour hôtels, cafés, espaces de coworking et bureaux – avec des réseaux séparés pour les clients et le personnel, une couverture complète du bâtiment et des performances stables. Nous choisissons du matériel professionnel mais abordable et configurons le tout de manière sécurisée, afin que vous bénéficiiez d’un Wi-Fi solide sans gaspiller votre budget. Nous vous aidons aussi pour les routeurs, switches, backups et le support à distance.",
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
          "Fix your visibility problems on Google and bring more guests and customers through the door.",
        features: [
          "Google Business Profile Fix & Setup",
          "Local SEO & Maps Ranking",
          "Campaigns for Hotels & Local Business",
          "Review & Reputation Strategy",
        ],
        details:
          "A lot of businesses have a great product but almost no online visibility: they are hard to find on Google Maps, the business is not showing up properly, or it appears below competitors. We help you fix your Google Business Profile so that your hotel, restaurant, salon or shop is correctly visible, verified and well-optimised. This includes categories, photos, descriptions, opening hours, services, keywords, and posts. On top of that, we work on local SEO so you rank higher when people search for ‘hotel in Bruges’, ‘restaurant near me’ or similar terms. For hotels and other local businesses, we build full digital strategies: online campaigns, remarketing, social media, and review management – all focused on more bookings and more direct customers instead of only relying on platforms.",
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
        details:
          "Veel bedrijven hebben een sterk product maar bijna geen online zichtbaarheid: moeilijk vindbaar op Google Maps, onvolledige info of lager dan concurrenten. Wij helpen je om je Google Business-profiel (Google Maps) correct en aantrekkelijk in orde te zetten voor je hotel, restaurant, salon of winkel: categorieën, foto’s, beschrijving, openingsuren, diensten, zoekwoorden en posts. Daarnaast werken we aan lokale SEO zodat je hoger scoort wanneer mensen zoeken naar ‘hotel in Brugge’, ‘restaurant in de buurt’ of gelijkaardige termen. Voor hotels en andere lokale bedrijven bouwen we volledige digitale strategieën: online campagnes, remarketing, sociale media en reviewbeheer – allemaal gericht op meer boekingen en meer directe klanten in plaats van alleen maar via platformen.",
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
        details:
          "Beaucoup d’entreprises ont un bon produit mais très peu de visibilité en ligne : difficile à trouver sur Google Maps, informations incomplètes ou en dessous des concurrents. Nous vous aidons à corriger et optimiser votre fiche Google Business pour que votre hôtel, restaurant, salon ou boutique soit bien visible, vérifié et attractif. Cela inclut les catégories, photos, descriptions, horaires, services, mots-clés et publications. Ensuite, nous travaillons le SEO local afin que vous remontiez dans les résultats lorsque quelqu’un cherche ‘hôtel à Bruges’ ou ‘restaurant près de chez moi’. Pour les hôtels et les commerces locaux, nous mettons en place des stratégies complètes : campagnes en ligne, remarketing, réseaux sociaux et gestion des avis – avec un objectif clair : plus de réservations et plus de clients directs.",
      },
    },
  },
  {
    id: "ai",
    icon: Bot,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    texts: {
      en: {
        title: "AI Automation & Custom Chatbots",
        description:
          "Automate boring tasks and add smart AI chatbots to your website – fully custom and more affordable.",
        features: [
          "Booking & Lead Automation",
          "AI Chatbots for Website & WhatsApp",
          "Automated Emails, Invoices & Reminders",
          "Custom AI Flows for Any Business",
        ],
        details:
          "Think of every repetitive task in your business: answering the same questions, manually handling bookings, sending confirmations, chasing invoices, replying to emails. With FLUXIVE, you can make almost anything automatic. We build custom AI automations that connect to your tools (email, CRM, calendar, booking engine) and handle workflows in the background. Our AI chatbots are not generic ‘plug & play’ bots – they are trained on your business, your FAQs, your services, your tone of voice, and can speak multiple languages if needed. They can be added to your website, landing pages or even WhatsApp and Messenger.",
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
        details:
          "Denk aan alle repetitieve taken in je bedrijf: dezelfde vragen beantwoorden, reservaties manueel opvolgen, bevestigingen versturen, achter onbetaalde facturen aan gaan, eindeloze e-mails. Met FLUXIVE kun je een groot deel daarvan automatiseren. We bouwen AI-automatisaties die koppelen met je tools (e-mail, CRM, agenda, boekingssysteem) en processen op de achtergrond afhandelen. Onze chatbots zijn geen standaard ‘plug & play’ widgets, maar worden getraind op jouw business, jouw FAQ, jouw diensten en jouw tone of voice – en kunnen indien nodig meertalig werken. Ze kunnen op je website, landingspagina’s of zelfs WhatsApp en Messenger geplaatst worden.",
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
        details:
          "Pensez à toutes les tâches répétitives dans votre entreprise : répondre aux mêmes questions, gérer manuellement les réservations, envoyer des confirmations, relancer les factures, traiter des e-mails sans fin. Avec FLUXIVE, une grande partie de cela peut être automatisée. Nous créons des automatisations IA qui se connectent à vos outils (e-mail, CRM, agenda, moteur de réservation) et gèrent les processus en arrière-plan. Nos chatbots ne sont pas des widgets génériques ‘plug & play’ : ils sont entraînés sur votre activité, vos FAQ, vos services et votre ton de communication – et peuvent fonctionner en plusieurs langues si nécessaire.",
      },
    },
  },
  {
    id: "webdev",
    icon: Code,
    color: "from-cyan-500 to-teal-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    texts: {
      en: {
        title: "Modern Web Design & Development",
        description:
          "Fast, modern websites that make your business look professional and convert visitors into customers.",
        features: [
          "Modern, Responsive Websites",
          "Booking & Contact Integrations",
          "SEO-Friendly Structure",
          "AI Chatbot & Analytics Integration",
        ],
        details:
          "Your website is often the first impression people get of your business. Many hotels, restaurants and small companies are stuck with outdated designs, slow loading times and confusing navigation. We build modern, clean, mobile-friendly websites that are easy to use and focused on what matters: bookings, leads, phone calls and messages. We can integrate booking engines, enquiry forms, AI chatbots, WhatsApp buttons and analytics so you actually see what visitors do.",
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
        details:
          "Je website is vaak de eerste indruk die iemand krijgt van je zaak. Veel hotels, restaurants en kmo’s hebben een verouderd design, trage laadtijden en een onduidelijke structuur. Wij bouwen moderne, strakke, mobielvriendelijke websites die focussen op wat telt: bookings, leads, telefoontjes en berichten. We kunnen booking engines, formulieren, AI-chatbots, WhatsApp-knoppen en analytics integreren zodat je ook echt ziet wat bezoekers doen.",
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
        details:
          "Votre site web est souvent la première impression que les gens ont de votre entreprise. Beaucoup d’hôtels, de restaurants et de petites entreprises ont un design dépassé, un chargement lent et une navigation confuse. Nous construisons des sites modernes, clairs et adaptés au mobile, centrés sur l’essentiel : réservations, demandes, appels et messages. Nous pouvons intégrer des moteurs de réservation, des formulaires, des chatbots IA, des boutons WhatsApp et des outils d’analytics pour suivre le comportement des visiteurs.",
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
          "Professional security testing for your websites, web apps and internal systems – before attackers get there.",
        features: [
          "Web Application Pentests",
          "Infrastructure & Network Testing",
          "Reports in Clear Business Language",
          "Prioritised Remediation Plan",
        ],
        details:
          "If your business handles bookings, payments, customer data or internal systems, you can’t afford to wait until a breach happens. With penetration testing, we perform controlled, ethical hacking against your websites, APIs and internal infrastructure to identify real vulnerabilities that an attacker could abuse. You don’t just receive a technical dump of issues: you get a clear report explaining what each finding means for your business, how critical it is, and how to fix it.",
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
        details:
          "Als je bedrijf werkt met bookings, betalingen, klantdata of interne systemen, kun je niet wachten tot er een incident gebeurt. Met penetratietesten voeren we gecontroleerde, ethische hacks uit op je websites, API’s en interne infrastructuur om echte kwetsbaarheden te vinden die een aanvaller kan misbruiken. Je krijgt geen onleesbare technische dump, maar een duidelijk rapport dat uitlegt wat elke bevinding betekent voor je business, hoe kritisch ze is en hoe je het kunt oplossen.",
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
        details:
          "Si votre entreprise gère des réservations, paiements, données clients ou systèmes internes, vous ne pouvez pas attendre qu’un incident arrive. Avec les tests d’intrusion, nous réalisons des attaques contrôlées et éthiques sur vos sites, API et infrastructures internes pour identifier de vraies failles exploitables. Vous ne recevez pas seulement un rapport technique illisible : nous expliquons clairement l’impact métier de chaque vulnérabilité, sa criticité et les mesures à prendre pour la corriger.",
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
        details:
          "Most small and medium businesses are not ready for a real cyber incident: weak passwords, no backups, no clear plan, and employees who are not trained to spot phishing. We help you build a realistic security baseline for your size and budget: from secure configurations and backups to endpoint protection, access control and awareness training. If something goes wrong, we support you with incident response guidance so you can contain, recover and learn from the event.",
      },
      nl: {
        title: "Cybersecurity & bescherming",
        description:
          "Eind-tot-eind beveiliging voor kmo’s – zonder onnodige complexiteit.",
        features: [
          "Security-baseline voor kmo’s",
          "Bescherming tegen phishing & e-mailaanvallen",
          "Ondersteuning bij incident response",
          "Policies, backups & best practices",
        ],
        details:
          "De meeste kmo’s zijn niet klaar voor een echt cyberincident: zwakke wachtwoorden, geen degelijke backups, geen duidelijk plan en medewerkers die phishing niet herkennen. Wij helpen je een realistische security-baseline op te bouwen, afgestemd op jouw grootte en budget: van veilige instellingen en backups tot endpointbeveiliging, toegangsbeheer en awareness-training. Als er toch iets fout loopt, begeleiden we je bij incident response zodat je sneller kunt reageren, herstellen en de juiste lessen trekt.",
      },
      fr: {
        title: "Cybersécurité & protection",
        description:
          "Sécurité de bout en bout pour les PME – sans complexité inutile.",
        features: [
          "Baseline sécurité pour PME",
          "Protection contre le phishing & les attaques e-mail",
          "Accompagnement en cas d’incident",
          "Politiques, backups & bonnes pratiques",
        ],
        details:
          "La plupart des petites et moyennes entreprises ne sont pas préparées à un véritable incident cyber : mots de passe faibles, peu ou pas de sauvegardes, aucun plan clair et des collaborateurs peu sensibilisés au phishing. Nous vous aidons à mettre en place une base de sécurité réaliste adaptée à votre taille et à votre budget : configurations sécurisées, sauvegardes, protection des postes, gestion des accès et sensibilisation. Et si un incident se produit, nous vous accompagnons dans la réponse afin de contenir, récupérer et tirer les bons enseignements.",
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

  // store only the ID so it works even after language change
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  const closeModal = () => setSelectedServiceId(null);

  const selectedService = selectedServiceId
    ? services.find((s) => s.id === selectedServiceId) ?? null
    : null;

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
            const isActive = selectedServiceId === service.id;

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="cursor-pointer flex"
                onClick={() => setSelectedServiceId(service.id)}
              >
                <TiltCard>
                  <Card
                    className={`glass-card group w-full flex flex-col border border-white/20 dark:border-white/10 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20 ${
                      isActive ? "ring-2 ring-primary-500" : ""
                    }`}
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
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Popout / Modal */}
      {selectedService && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl mx-auto glass-card 
                       bg-white/95 dark:bg-background/95
                       border border-primary-500/30 rounded-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/10 dark:bg-black/20 hover:bg-black/20 dark:hover:bg-black/30 text-gray-700 dark:text-gray-200"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {(() => {
              const t = selectedService.texts[language];
              const SelIcon = selectedService.icon;
              return (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`bg-gradient-to-br ${selectedService.color} p-3 rounded-xl`}
                    >
                      <SelIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
                        {t.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                        {t.description}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-gray-800 dark:text-gray-100 mb-4 leading-relaxed">
                    {t.details}
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {t.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs sm:text-sm
                                   bg-primary-500/5 dark:bg-primary-500/10
                                   border border-primary-500/30 
                                   text-primary-700 dark:text-primary-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
