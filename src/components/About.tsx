"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap, Target, Award, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Language = "nl" | "en" | "fr";

type Feature = {
  id: "expert" | "tech" | "tailored" | "proven";
  icon: any;
  title: string;
  description: string;
  details: string;
};

type AboutContent = {
  heading: string;
  subheading: string;
  missionTitle: string;
  missionBody: string;
  features: Feature[];
};

const aboutByLang: Record<Language, AboutContent> = {
  en: {
    heading: "Why Choose FLUXIVE?",
    subheading:
      "We combine expertise, innovation, and dedication to deliver exceptional results.",
    missionTitle: "Our Mission",
    missionBody:
      "At FLUXIVE, we solve technology challenges for Belgian hotels, restaurants, small businesses, and homeowners: unreliable Wi-Fi that frustrates guests and families, poor Google visibility that loses customers to competitors, outdated websites that don't convert, and weak cybersecurity that puts data at risk.\n\nOur mission is simple: provide enterprise-level IT infrastructure, digital marketing, and security solutions—at prices everyone can afford. Whether you need home Wi-Fi troubleshooting, business network installation, Google Maps optimization, AI chatbots, website development, or penetration testing—we handle it all under one roof.\n\nFrom a family struggling with Wi-Fi dead zones in their home, to a boutique hotel in Ghent, a restaurant in Brussels, or a growing SME in Antwerp—we deliver technology solutions that work, increase revenue, reduce frustration, and give you peace of mind.\n\nProudly serving residential and business clients across Belgium.",
    features: [
      {
        id: "expert",
        icon: Users,
        title: "One Partner for Everything",
        description: "IT, Wi-Fi, Marketing & Security under one roof",
        details:
          "Why manage 5 different vendors when you can have one? FLUXIVE handles your entire tech stack: from the internet cable coming into your building to the Google ads bringing customers to your door. We understand how these systems interact—so when your Wi-Fi goes down, we don't blame the ISP, we just fix it.",
      },
      {
        id: "tech",
        icon: Zap,
        title: "No Tech Jargon",
        description: "We explain everything in plain language",
        details:
          "We don't hide behind complex acronyms. Whether we're explaining a firewall rule or an SEO strategy, we speak your language. We believe you should understand exactly what you're paying for and how it helps your business (or home) run better.",
      },
      {
        id: "tailored",
        icon: Target,
        title: "For Everyone",
        description: "From 50-Room Hotels to Single-Family Homes",
        details:
          "We bring enterprise-grade quality to everyone. A homeowner needing stable Wi-Fi deserves the same reliability as a busy hotel. A small local restaurant deserves the same marketing expertise as a big chain. We scale our solutions to fit your specific needs and budget.",
      },
      {
        id: "proven",
        icon: Award,
        title: "Proven Track Record",
        description: "500+ successful projects and satisfied clients worldwide",
        details:
          "From local hotels and small businesses to larger international projects, we’ve worked on security assessments, websites, marketing campaigns and automation flows that actually shipped – not just concepts on paper. Our focus is always on measurable results: more bookings, more leads, more stability, better security and smoother operations.",
      },
    ],
  },

  nl: {
    heading: "Waarom kiezen voor FLUXIVE?",
    subheading:
      "We combineren expertise, innovatie en betrokkenheid om uitzonderlijke resultaten te leveren.",
    missionTitle: "Onze Missie",
    missionBody:
      "Bij FLUXIVE lossen we technologische uitdagingen op voor Belgische hotels, restaurants, kleine bedrijven en huiseigenaren: onbetrouwbare wifi die gasten en gezinnen frustreert, slechte zichtbaarheid op Google waardoor klanten naar concurrenten gaan, verouderde websites die niet converteren en zwakke cyberbeveiliging die gegevens in gevaar brengt.\n\nOnze missie is simpel: enterprise-niveau IT-infrastructuur, digitale marketing en beveiligingsoplossingen bieden—tegen prijzen die voor iedereen betaalbaar zijn. Of je nu wifi-problemen thuis hebt, een bedrijfsnetwerk moet installeren, Google Maps-optimalisatie, AI-chatbots, website-ontwikkeling of penetratietesten nodig hebt—wij regelen het allemaal onder één dak.\n\nVan een gezin dat worstelt met wifi-dode zones thuis, tot een boetiekhotel in Gent, een restaurant in Brussel of een groeiende KMO in Antwerpen—wij leveren technologische oplossingen die werken, omzet verhogen, frustratie verminderen en gemoedsrust geven.\n\nTrots ten dienste van particuliere en zakelijke klanten in heel België.",
    features: [
      {
        id: "expert",
        icon: Users,
        title: "Eén partner voor alles",
        description:
          "IT, Wi-Fi, Marketing & Security onder één dak",
        details:
          "Waarom 5 verschillende leveranciers beheren als je er één kunt hebben? FLUXIVE beheert je volledige tech-stack: van de internetkabel die je gebouw binnenkomt tot de Google-advertenties die klanten naar je deur brengen. Wij begrijpen hoe deze systemen samenwerken.",
      },
      {
        id: "tech",
        icon: Zap,
        title: "Geen technisch jargon",
        description:
          "We leggen alles uit in begrijpelijke taal",
        details:
          "We verschuilen ons niet achter ingewikkelde afkortingen. Of we nu een firewall-regel of een SEO-strategie uitleggen, we spreken jouw taal. We vinden dat je precies moet begrijpen waarvoor je betaalt en hoe het je bedrijf (of huis) beter laat draaien.",
      },
      {
        id: "tailored",
        icon: Target,
        title: "Voor iedereen",
        description: "Van hotels met 50 kamers tot gezinswoningen",
        details:
          "We brengen kwaliteit van ondernemingsniveau naar iedereen. Een huiseigenaar die stabiele wifi nodig heeft, verdient dezelfde betrouwbaarheid als een druk hotel. Een klein lokaal restaurant verdient dezelfde marketingexpertise als een grote keten. We schalen onze oplossingen op maat van jouw behoeften en budget.",
      },
      {
        id: "proven",
        icon: Award,
        title: "Bewezen resultaten",
        description:
          "500+ afgeronde projecten en tevreden klanten in binnen- en buitenland",
        details:
          "Van lokale hotels en kmo’s tot grotere internationale projecten: we hebben gewerkt aan security-audits, websites, marketingcampagnes en automatiseringen die effectief in productie zijn gegaan – geen theoretische slides. We focussen altijd op meetbaar resultaat: meer bookings, meer leads, meer stabiliteit, betere beveiliging en vlottere dagelijkse werking.",
      },
    ],
  },

  fr: {
    heading: "Pourquoi choisir FLUXIVE ?",
    subheading:
      "Nous combinons expertise, innovation et engagement pour offrir des résultats concrets.",
    missionTitle: "Notre Mission",
    missionBody:
      "Chez FLUXIVE, nous résolvons les défis technologiques des hôtels, restaurants, petites entreprises et particuliers belges : Wi-Fi peu fiable qui frustre les invités et les familles, mauvaise visibilité sur Google qui fait perdre des clients au profit de la concurrence, sites web obsolètes qui ne convertissent pas et cybersécurité faible qui met les données en danger.\n\nNotre mission est simple : fournir des infrastructures informatiques, du marketing numérique et des solutions de sécurité de niveau entreprise—à des prix abordables pour tous. Que vous ayez besoin de dépannage Wi-Fi à domicile, d'installation de réseau d'entreprise, d'optimisation Google Maps, de chatbots IA, de développement de site web ou de tests d'intrusion—nous gérons tout sous un même toit.\n\nD'une famille luttant contre les zones mortes Wi-Fi à la maison, à un hôtel-boutique à Gand, un restaurant à Bruxelles ou une PME en croissance à Anvers—nous fournissons des solutions technologiques qui fonctionnent, augmentent les revenus, réduisent la frustration et vous offrent la tranquillité d'esprit.\n\nAu service des clients résidentiels et professionnels partout en Belgique.",
    features: [
      {
        id: "expert",
        icon: Users,
        title: "Un partenaire pour tout",
        description:
          "IT, Wi-Fi, Marketing & Sécurité sous un même toit",
        details:
          "Pourquoi gérer 5 fournisseurs différents quand vous pouvez en avoir un seul ? FLUXIVE gère toute votre technologie : du câble internet qui entre dans votre bâtiment aux publicités Google qui amènent les clients à votre porte. Nous comprenons comment ces systèmes interagissent.",
      },
      {
        id: "tech",
        icon: Zap,
        title: "Pas de jargon technique",
        description:
          "Nous expliquons tout dans un langage clair",
        details:
          "Nous ne nous cachons pas derrière des acronymes complexes. Que nous expliquions une règle de pare-feu ou une stratégie SEO, nous parlons votre langue. Nous pensons que vous devez comprendre exactement ce que vous payez et comment cela aide votre entreprise (ou votre maison) à mieux fonctionner.",
      },
      {
        id: "tailored",
        icon: Target,
        title: "Pour tout le monde",
        description:
          "Des hôtels de 50 chambres aux maisons unifamiliales",
        details:
          "Nous apportons une qualité de niveau entreprise à tous. Un propriétaire ayant besoin d'un Wi-Fi stable mérite la même fiabilité qu'un hôtel animé. Un petit restaurant local mérite la même expertise marketing qu'une grande chaîne. Nous adaptons nos solutions à vos besoins et à votre budget.",
      },
      {
        id: "proven",
        icon: Award,
        title: "Résultats prouvés",
        description:
          "500+ projets réussis et des clients satisfaits en Belgique et ailleurs",
        details:
          "Des hôtels locaux et petites entreprises aux projets internationaux plus importants, nous avons réalisé des audits de sécurité, sites web, campagnes marketing et automatisations réellement déployés – pas seulement des concepts sur papier. Nous visons toujours des résultats mesurables : plus de réservations, plus de leads, plus de stabilité, une meilleure sécurité et des opérations plus fluides.",
      },
    ],
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: { opacity: 1, scale: 1, y: 0 },
};

export default function About() {
  const langContext = useLanguage();
  const rawLang = (langContext?.language as Language) || "nl";
  const currentLang: Language =
    rawLang === "en" || rawLang === "fr" || rawLang === "nl" ? rawLang : "nl";

  const { heading, subheading, missionTitle, missionBody, features } =
    aboutByLang[currentLang];

  const [selectedFeature, setSelectedFeature] = useState<null | Feature>(null);
  const closeModal = () => setSelectedFeature(null);

  // Split mission body by double newline for paragraphs
  const missionParagraphs = missionBody.split("\n\n");

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gray-50/50 dark:bg-black/20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-primary-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -60, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-secondary-500/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-3 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-wide uppercase">
            {currentLang === 'nl' ? 'Over Ons' : currentLang === 'fr' ? 'À Propos' : 'About Us'}
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
            {heading.split("FLUXIVE").length > 1 ? (
              <>
                {heading.split("FLUXIVE")[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 animate-gradient-x">
                  FLUXIVE
                </span>
                {heading.split("FLUXIVE")[1]}
              </>
            ) : (
              heading
            )}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {subheading}
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        >
          {features
            .filter((f) => f.id !== "proven")
            .map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedFeature(feature)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Card className="relative h-full overflow-hidden border-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl ring-1 ring-gray-900/5 dark:ring-white/10 group-hover:ring-primary-500/50">
                    <CardHeader className="text-center pb-2">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 p-[1px] group-hover:scale-110 transition-transform duration-500">
                        <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <Icon className="w-9 h-9 text-primary-600 dark:text-primary-400 relative z-10" />
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="mt-6 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-2">
                          {currentLang === 'nl' ? 'Lees meer' : currentLang === 'fr' ? 'En savoir plus' : 'Learn more'}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
        </motion.div>

        {/* Mission Section - 2 Column Layout with Glass Effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Decorative Elements around Mission */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />

          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/20 dark:border-white/10 bg-white/70 dark:bg-gray-900/60 backdrop-blur-2xl shadow-2xl">
            <div className="grid md:grid-cols-5 gap-0">

              {/* Left Column: Visual/Title */}
              <div className="md:col-span-2 bg-gradient-to-br from-primary-600 to-secondary-600 p-10 md:p-14 text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/20 rounded-full blur-3xl" />

                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 relative z-10">
                  {missionTitle}
                </h3>
                <div className="w-16 h-2 bg-white/30 rounded-full mb-8 relative z-10" />
                <div className="space-y-4 relative z-10 opacity-90">
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-white" />
                    <span className="font-medium">Goal-Oriented</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-white" />
                    <span className="font-medium">Customer-First</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-white" />
                    <span className="font-medium">Quality-Driven</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Text Content */}
              <div className="md:col-span-3 p-10 md:p-14 flex flex-col justify-center">
                <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {missionParagraphs.map((paragraph, idx) => (
                    <p key={idx} className={idx === 0 ? "font-medium text-gray-900 dark:text-white" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Popout / Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-xl mx-auto z-10
                         bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl
                         border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close"
              >
                <span className="text-lg leading-none">✕</span>
              </button>

              <div className="flex items-start gap-6 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/30 shrink-0">
                  <selectedFeature.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
                    {selectedFeature.title}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    {selectedFeature.description}
                  </p>
                </div>
              </div>

              <div className="prose dark:prose-invert">
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedFeature.details}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
