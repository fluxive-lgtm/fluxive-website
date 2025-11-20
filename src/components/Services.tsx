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

type Language = "en" | "nl" | "fr";

type Service = {
  icon: any;
  title: string;
  description: string;
  features: string[];
  details: string;
  color: string;
  bgColor: string;
  borderColor: string;
};

type ServicesContent = {
  heading: string;
  subheading: string;
  services: Service[];
};

const servicesByLang: Record<Language, ServicesContent> = {
  en: {
    heading: "Our Services",
    subheading:
      "Practical, real-world solutions for hotels, restaurants, agencies and other growing businesses.",
    services: [
      {
        icon: Server,
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
        color: "from-cyan-500 to-blue-500",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30",
      },
      {
        icon: TrendingUp,
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
          "A lot of businesses have a great product but almost no online visibility: they are hard to find on Google Maps, the business is not showing up properly, or it appears below competitors. We help you fix your Google Business Profile (Google Maps listing) so that your hotel, restaurant, salon or shop is correctly visible, verified and well-optimised. This includes categories, photos, descriptions, opening hours, services, keywords, and posts. On top of that, we work on local SEO so you rank higher when people search for ‘hotel in Bruges’, ‘restaurant near me’ or similar terms. For hotels and other local businesses, we build full digital strategies: online campaigns, remarketing, social media, and review management – all focused on more bookings and more direct customers instead of only relying on booking platforms or third-party apps.",
        color: "from-teal-500 to-cyan-500",
        bgColor: "bg-teal-500/10",
        borderColor: "border-teal-500/30",
      },
      {
        icon: Bot,
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
          "Think of every repetitive task in your business: answering the same questions, manually handling bookings, sending confirmations, chasing invoices, replying to emails. With FLUXIVE, you can make almost anything automatic. We build custom AI automations that connect to your tools (email, CRM, calendar, booking engine) and handle workflows in the background. Our AI chatbots are not generic ‘plug & play’ bots – they are trained on your business, your FAQs, your services, your tone of voice, and can speak multiple languages if needed. They can be added to your website, landing pages or even WhatsApp and Messenger. Compared to big chatbot platforms that charge high monthly fees per seat or per conversation, we provide a more flexible and often cheaper solution, tailored to small and medium-sized businesses who need results without burning their budget.",
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30",
      },
      {
        icon: Code,
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
          "Your website is often the first impression people get of your business. Many hotels, restaurants and small companies are stuck with outdated designs, slow loading times and confusing navigation. We build modern, clean, mobile-friendly websites that are easy to use and focused on what matters: bookings, leads, phone calls and messages. We can integrate booking engines, enquiry forms, AI chatbots, WhatsApp buttons and analytics so you actually see what visitors do. Whether you’re a hotel, agency, freelancer, shop or any other business, we design your site to match your brand – and we keep it technically optimised so Google likes it too.",
        color: "from-cyan-500 to-teal-500",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30",
      },
      {
        icon: Shield,
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
          "If your business handles bookings, payments, customer data or internal systems, you can’t afford to wait until a breach happens. With penetration testing, we perform controlled, ethical hacking against your websites, APIs and internal infrastructure to identify real vulnerabilities that an attacker could abuse. You don’t just receive a technical dump of issues: you get a clear report explaining what each finding means for your business, how critical it is, and how to fix it. This helps you protect both your reputation and your operations while showing customers and partners that you take security seriously.",
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
      },
      {
        icon: Lock,
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
          "Most small and medium businesses are not ready for a real cyber incident: weak passwords, no backups, no clear plan, and employees who are not trained to spot phishing. We help you build a realistic security baseline for your size and budget: from secure configurations and backups to endpoint protection, access control and awareness training. If something goes wrong, we support you with incident response guidance so you can contain, recover and learn from the event. Our goal is simple: reduce your risk significantly without making your daily work harder.",
        color: "from-red-500 to-pink-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
      },
    ],
  },

  nl: {
    heading: "Onze Services",
    subheading:
      "Praktische, realistische oplossingen voor hotels, restaurants, agencies en andere groeiende bedrijven.",
    services: [
      {
        icon: Server,
        title: "IT-diensten & Wi-Fi-oplossingen",
        description:
          "Betrouwbare IT-infrastructuur en Wi-Fi die gewoon werkt – voor hotels, restaurants, kantoren en kmo’s.",
        features: [
          "Wi-Fi-ontwerp voor hotels & restaurants",
          "Oplossingen voor dode zones in dekking",
          "Kostenefficiënte netwerkhardware",
          "Doorlopende remote monitoring & support",
        ],
        details:
          "Veel kleine bedrijven, vooral hotels en restaurants, hebben last van onstabiele en trage Wi-Fi: sommige kamers hebben geen bereik, routers staan slecht geplaatst en het internet lijkt constant overbelast. Daarbovenop betalen veel zaken te veel voor hardware die niet juist geconfigureerd is. Bij FLUXIVE ontwerpen en installeren we professionele Wi-Fi-opstellingen voor hotels, cafés, coworkingruimtes en kantoren – met gescheiden gast- en personeelsnetwerken, dekking in het volledige gebouw en stabiele prestaties. We kiezen kostenefficiënte, business-grade access points en configureren alles veilig, zodat je sterke, stabiele Wi-Fi hebt zonder geld te verspillen aan te grote of verkeerde toestellen. We helpen ook met routers, switches, back-ups en remote support, zodat je altijd iemand hebt om te bellen als er iets misloopt.",
        color: "from-cyan-500 to-blue-500",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30",
      },
      {
        icon: TrendingUp,
        title: "Digitale Marketing & Google Maps",
        description:
          "Los je zichtbaarheidsproblemen op Google op en haal meer gasten en klanten door de deur.",
        features: [
          "Google Business-profiel herstel & opzet",
          "Lokale SEO & Maps-ranking",
          "Campagnes voor hotels & lokale zaken",
          "Review- & reputatiestrategie",
        ],
        details:
          "Veel bedrijven hebben een sterk product maar bijna geen online zichtbaarheid: ze zijn moeilijk te vinden op Google Maps, de vermelding staat niet goed ingesteld of ze verschijnen onder de concurrentie. Wij helpen je om je Google Business-profiel (Google Maps-vermelding) juist in te stellen en te optimaliseren, zodat je hotel, restaurant, salon of winkel correct zichtbaar, geverifieerd en aantrekkelijk is. Dit omvat categorieën, foto’s, beschrijvingen, openingsuren, diensten, zoekwoorden en posts. Daarnaast werken we aan lokale SEO zodat je hoger scoort wanneer mensen zoeken naar ‘hotel in Brugge’, ‘restaurant in de buurt’ of gelijkaardige termen. Voor hotels en andere lokale zaken bouwen we volledige digitale strategieën: online campagnes, remarketing, sociale media en reviewbeheer – allemaal gericht op meer boekingen en meer directe klanten in plaats van enkel te leunen op bookingplatformen of derde partijen.",
        color: "from-teal-500 to-cyan-500",
        bgColor: "bg-teal-500/10",
        borderColor: "border-teal-500/30",
      },
      {
        icon: Bot,
        title: "AI-automatisatie & Maatwerkchatbots",
        description:
          "Automatiseer saaie taken en voeg slimme AI-chatbots toe aan je website – volledig op maat en betaalbaar.",
        features: [
          "Automatisatie van bookings & leads",
          "AI-chatbots voor website & WhatsApp",
          "Geautomatiseerde e-mails, facturen & reminders",
          "Maatwerk AI-flows voor elk bedrijf",
        ],
        details:
          "Denk aan alle repetitieve taken in je bedrijf: dezelfde vragen beantwoorden, bookings manueel verwerken, bevestigingen sturen, achter onbetaalde facturen aangaan, op e-mails reageren. Met FLUXIVE kan je bijna al die zaken automatiseren. We bouwen maatwerk AI-automatisaties die koppelen met je tools (e-mail, CRM, agenda, booking engine) en workflows op de achtergrond afhandelen. Onze AI-chatbots zijn geen generieke ‘plug & play’-bots – ze worden getraind op jouw bedrijf, jouw FAQ’s, jouw diensten en jouw tone of voice, en kunnen indien nodig meerdere talen spreken. Ze kunnen op je website, landingspagina’s of zelfs WhatsApp en Messenger worden geplaatst. In vergelijking met grote chatbotplatformen met hoge maandelijkse kosten per gebruiker of per gesprek, bieden wij een flexibelere en vaak goedkopere oplossing, gericht op kmo’s die resultaat willen zonder hun budget op te branden.",
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30",
      },
      {
        icon: Code,
        title: "Moderne Webdesign & Development",
        description:
          "Snelle, moderne websites die je bedrijf professioneel laten overkomen en bezoekers omzetten in klanten.",
        features: [
          "Moderne, responsieve websites",
          "Integratie van bookings & contactformulieren",
          "SEO-vriendelijke structuur",
          "AI-chatbot & analytics-integratie",
        ],
        details:
          "Je website is vaak de eerste indruk die mensen van je bedrijf krijgen. Veel hotels, restaurants en kmo’s zitten vast met verouderde designs, trage laadtijden en onduidelijke navigatie. Wij bouwen moderne, strakke, mobielevriendelijke websites die makkelijk te gebruiken zijn en focussen op wat telt: bookings, leads, telefoons en berichten. We kunnen booking engines, aanvraagformulieren, AI-chatbots, WhatsApp-knoppen en analytics integreren, zodat je echt ziet wat bezoekers doen. Of je nu een hotel, agency, freelancer, winkel of een ander type zaak bent, we ontwerpen je site in lijn met je merk – en houden alles technisch geoptimaliseerd zodat Google er ook blij mee is.",
        color: "from-cyan-500 to-teal-500",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30",
      },
      {
        icon: Shield,
        title: "Penetratietesten",
        description:
          "Professionele securitytests voor je websites, webapps en interne systemen – vóórdat aanvallers er zijn.",
        features: [
          "Webapplicatie-penetratietesten",
          "Infrastructuur- & netwerktesting",
          "Rapporten in duidelijke, zakelijke taal",
          "Geprioritiseerd verbeterplan",
        ],
        details:
          "Als je bedrijf bookings, betalingen, klantgegevens of interne systemen beheert, kan je niet wachten tot er een incident gebeurt. Met penetratietesten voeren we gecontroleerde, ethische hacks uit op je websites, API’s en interne infrastructuur om échte kwetsbaarheden te vinden die een aanvaller kan misbruiken. Je krijgt niet zomaar een technisch dump van problemen: je ontvangt een helder rapport waarin staat wat elke bevinding betekent voor je business, hoe kritisch ze is en hoe je ze kan oplossen. Zo bescherm je je reputatie en je dagelijkse werking, en toon je klanten en partners dat je security serieus neemt.",
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
      },
      {
        icon: Lock,
        title: "Cybersecurity & Bescherming",
        description:
          "End-to-end beveiliging voor kleine en middelgrote bedrijven – zonder enterprise-complexiteit.",
        features: [
          "Baseline-beveiliging voor kmo’s",
          "E-mail- & phishingbescherming",
          "Begeleiding bij incident response",
          "Policies, back-ups & best practices",
        ],
        details:
          "De meeste kmo’s zijn niet klaar voor een echt cyberincident: zwakke wachtwoorden, geen degelijke back-ups, geen duidelijk plan en medewerkers die phishingmails niet herkennen. Wij helpen je een realistische beveiligingsbasis op te bouwen voor jouw grootte en budget: van veilige configuraties en back-ups tot endpoint-beveiliging, toegangsbeheer en awareness-training. Als er iets misloopt, ondersteunen we je met incident response-begeleiding zodat je kan indammen, herstellen en leren uit het incident. Ons doel is eenvoudig: je risico aanzienlijk verlagen zonder je dagelijkse werk moeilijker te maken.",
        color: "from-red-500 to-pink-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
      },
    ],
  },

  fr: {
    heading: "Nos Services",
    subheading:
      "Des solutions pratiques et concrètes pour les hôtels, restaurants, agences et autres entreprises en croissance.",
    services: [
      {
        icon: Server,
        title: "Services IT & Solutions Wi-Fi",
        description:
          "Une infrastructure IT et un Wi-Fi fiables qui fonctionnent tout simplement – pour hôtels, restaurants, bureaux et petites entreprises.",
        features: [
          "Conception Wi-Fi pour hôtels & restaurants",
          "Résolution des zones mortes de couverture",
          "Matériel réseau rentable",
          "Supervision & support à distance",
        ],
        details:
          "De nombreuses petites entreprises, en particulier les hôtels et restaurants, souffrent d’un Wi-Fi instable et lent : certaines chambres n’ont pas de signal, les routeurs sont mal placés et la connexion semble toujours saturée. En plus, beaucoup paient trop cher pour du matériel qui n’est pas correctement configuré. Chez FLUXIVE, nous concevons et installons des réseaux Wi-Fi professionnels pour les hôtels, cafés, espaces de coworking et bureaux – avec des réseaux séparés pour les invités et le personnel, une couverture complète du bâtiment et des performances stables. Nous choisissons des points d’accès professionnels, abordables et configurons le tout de manière sécurisée, afin que vous disposiez d’un Wi-Fi puissant et fiable sans gaspiller votre budget dans du matériel surdimensionné ou inadapté. Nous vous aidons également pour les routeurs, switches, sauvegardes et support à distance, afin que vous ayez toujours quelqu’un à contacter en cas de problème.",
        color: "from-cyan-500 to-blue-500",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30",
      },
      {
        icon: TrendingUp,
        title: "Marketing digital & Google Maps",
        description:
          "Corrigez vos problèmes de visibilité sur Google et faites entrer plus de clients et de guests.",
        features: [
          "Mise en place & optimisation Google Business Profile",
          "SEO local & positionnement sur Maps",
          "Campagnes pour hôtels & commerces locaux",
          "Stratégie d’avis & d’e-réputation",
        ],
        details:
          "Beaucoup d’entreprises ont une excellente offre mais presque aucune visibilité en ligne : elles sont difficiles à trouver sur Google Maps, la fiche n’est pas correcte ou elles apparaissent en dessous de la concurrence. Nous vous aidons à corriger et optimiser votre fiche Google Business (Google Maps) pour que votre hôtel, restaurant, salon ou boutique soit correctement visible, vérifié et attractif. Cela inclut les catégories, photos, descriptions, horaires, services, mots-clés et publications. Ensuite, nous travaillons le SEO local pour que vous apparaissiez plus haut lorsque les gens recherchent « hôtel à Bruges », « restaurant près de chez moi » ou des termes similaires. Pour les hôtels et autres acteurs locaux, nous construisons des stratégies digitales complètes : campagnes en ligne, remarketing, réseaux sociaux et gestion des avis – avec un objectif clair : plus de réservations et plus de clients directs, sans dépendre uniquement des plateformes de réservation ou applications tierces.",
        color: "from-teal-500 to-cyan-500",
        bgColor: "bg-teal-500/10",
        borderColor: "border-teal-500/30",
      },
      {
        icon: Bot,
        title: "Automatisation IA & Chatbots sur mesure",
        description:
          "Automatisez les tâches répétitives et ajoutez des chatbots IA intelligents à votre site – totalement personnalisés et abordables.",
        features: [
          "Automatisation des réservations & leads",
          "Chatbots IA pour site web & WhatsApp",
          "E-mails, factures & rappels automatisés",
          "Parcours IA sur mesure pour votre activité",
        ],
        details:
          "Pensez à toutes les tâches répétitives dans votre activité : répondre toujours aux mêmes questions, gérer les réservations à la main, envoyer les confirmations, relancer les factures, répondre aux e-mails. Avec FLUXIVE, une grande partie de cela peut être automatisée. Nous créons des automatisations IA sur mesure qui se connectent à vos outils (e-mail, CRM, agenda, moteur de réservation) et gèrent les workflows en arrière-plan. Nos chatbots IA ne sont pas des bots génériques « plug & play » – ils sont entraînés sur votre entreprise, vos FAQ, vos services, votre ton de communication et peuvent parler plusieurs langues si nécessaire. Ils peuvent être intégrés à votre site, vos landing pages ou même à WhatsApp et Messenger. Par rapport aux grandes plateformes de chatbots avec des abonnements élevés par utilisateur ou par conversation, nous proposons une solution plus flexible et souvent plus abordable, pensée pour les petites et moyennes entreprises qui veulent des résultats sans exploser leur budget.",
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30",
      },
      {
        icon: Code,
        title: "Webdesign & Développement modernes",
        description:
          "Des sites web modernes et rapides qui donnent une image professionnelle et transforment les visiteurs en clients.",
        features: [
          "Sites modernes et responsives",
          "Intégration de réservations & formulaires de contact",
          "Structure optimisée pour le SEO",
          "Intégration chatbot IA & analytics",
        ],
        details:
          "Votre site web est souvent la première impression que les gens ont de votre entreprise. De nombreux hôtels, restaurants et petites entreprises se retrouvent avec des designs dépassés, des temps de chargement lents et une navigation peu claire. Nous créons des sites modernes, épurés et adaptés au mobile, faciles à utiliser et orientés vers ce qui compte : réservations, demandes, appels et messages. Nous pouvons intégrer des moteurs de réservation, des formulaires de contact, des chatbots IA, des boutons WhatsApp et des outils d’analytics pour que vous voyiez réellement le comportement des visiteurs. Que vous soyez un hôtel, une agence, un freelance, une boutique ou autre, nous concevons votre site en accord avec votre identité de marque – et nous veillons à ce qu’il reste techniquement optimisé pour plaire aussi à Google.",
        color: "from-cyan-500 to-teal-500",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30",
      },
      {
        icon: Shield,
        title: "Tests de pénétration",
        description:
          "Des tests de sécurité professionnels pour vos sites web, applications et systèmes internes – avant les attaquants.",
        features: [
          "Pentests d’applications web",
          "Tests d’infrastructure & de réseau",
          "Rapports en langage business clair",
          "Plan de remédiation priorisé",
        ],
        details:
          "Si votre entreprise gère des réservations, paiements, données clients ou systèmes internes, vous ne pouvez pas attendre qu’un incident survienne. Avec les tests de pénétration, nous menons des attaques contrôlées et éthiques sur vos sites, API et infrastructures internes afin d’identifier de vraies vulnérabilités exploitables. Vous ne recevez pas seulement une liste technique de problèmes : vous obtenez un rapport clair expliquant l’impact de chaque vulnérabilité sur votre activité, sa criticité et les actions correctives recommandées. Cela vous aide à protéger votre réputation et votre fonctionnement quotidien tout en montrant à vos clients et partenaires que vous prenez la sécurité au sérieux.",
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
      },
      {
        icon: Lock,
        title: "Cybersécurité & Protection",
        description:
          "Une sécurité de bout en bout pour les petites et moyennes entreprises – sans complexité d’entreprise.",
        features: [
          "Socle de sécurité pour PME",
          "Protection e-mail & anti-phishing",
          "Accompagnement en cas d’incident",
          "Politiques, sauvegardes & bonnes pratiques",
        ],
        details:
          "La plupart des petites et moyennes entreprises ne sont pas prêtes pour un véritable incident cyber : mots de passe faibles, pas de sauvegardes sérieuses, aucun plan clair et des employés peu sensibilisés au phishing. Nous vous aidons à mettre en place un socle de sécurité réaliste, adapté à votre taille et à votre budget : configurations sécurisées, sauvegardes, protection des terminaux, contrôle des accès et sensibilisation des équipes. En cas de problème, nous vous accompagnons dans la gestion de l’incident afin de contenir, restaurer et tirer les bonnes leçons. Notre objectif est simple : réduire significativement vos risques sans compliquer votre travail au quotidien.",
        color: "from-red-500 to-pink-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
      },
    ],
  },
};

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
  const currentLang: Language =
    rawLang === "en" || rawLang === "fr" || rawLang === "nl" ? rawLang : "nl";

  const { heading, subheading, services } = servicesByLang[currentLang];

  const [selectedService, setSelectedService] = useState<null | Service>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);

  const closeModal = () => setSelectedService(null);

  return (
    <section
      id="services"
      className="py-16 sm:py-20 md:py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-3 sm:mb-4 px-2">
            {heading.split(" ").length > 1 ? (
              <>
                {heading.split(" ")[0]}{" "}
                <span className="gradient-text">
                  {heading.split(" ").slice(1).join(" ")}
                </span>
              </>
            ) : (
              <span className="gradient-text">{heading}</span>
            )}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            {subheading}
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
            const isActive = selectedService?.title === service.title;

            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="cursor-pointer flex"
                onClick={() => setSelectedService(service)}
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
                        {service.title}
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-center line-clamp-3 min-h-[4rem]">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-5 pt-0 flex-grow">
                      <ul className="space-y-1.5 sm:space-y-2">
                        {service.features.map((feature, i) => (
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

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`bg-gradient-to-br ${selectedService.color} p-3 rounded-xl`}
              >
                <selectedService.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
                  {selectedService.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                  {selectedService.description}
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-100 mb-4 leading-relaxed">
              {selectedService.details}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {selectedService.features.map((feature, i) => (
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
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
