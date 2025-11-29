"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap, Target, Award } from "lucide-react";
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
        title: "Expert Team",
        description: "Seasoned professionals with years of industry experience",
        details:
          "FLUXIVE is built on a mix of cybersecurity, web development, IT infrastructure and digital marketing expertise. That means when we design a solution for you, we’re not guessing – we’ve seen how things work in real environments: hotels, agencies, small businesses and enterprise projects. You get people who understand both the technical side and the business side, who can advise you on what is realistic, secure and sustainable instead of selling you buzzwords.",
      },
      {
        id: "tech",
        icon: Zap,
        title: "Cutting-Edge Technology",
        description: "Latest tools and frameworks to deliver modern solutions",
        details:
          "We use modern stacks like Next.js, Tailwind CSS, cloud-native tools, AI models and best-in-class security tooling instead of outdated systems that slow you down. For you this means: faster websites, smarter automations, better analytics and stronger security – all built on technologies that are actively maintained and ready for the future. We don’t use tech just because it’s trendy; we pick what fits your business and keeps maintenance simple.",
      },
      {
        id: "tailored",
        icon: Target,
        title: "Tailored Solutions",
        description: "Custom approaches designed for your specific needs",
        details:
          "Every business has different pain points: a hotel might struggle with bookings and Wi-Fi, a restaurant with Google Maps visibility, an agency with automation, a small shop with a basic but professional website. At FLUXIVE we don’t push one single package to everyone. We analyse your situation, budget and goals, then design a roadmap that fits you – whether that’s fixing Google Business Profile issues, deploying better Wi-Fi, building an AI chatbot, redesigning your site, or a mix of all of these.",
      },
      {
        id: "proven",
        icon: Award,
        title: "Proven Track Record",
        description: "500+ successful projects and satisfied clients worldwide",
        details:
          "From local hotels and small businesses to larger international projects, we’ve worked on security assessments, websites, marketing campaigns and automation flows that actually shipped – not just concepts on paper. Our focus is always on measurable results: more bookings, more leads, more stability, better security and smoother operations. This real-world experience is what we bring into every new project, so you don’t have to learn everything the hard way yourself.",
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
        title: "Expertteam",
        description:
          "Professionals met jaren praktijkervaring in verschillende sectoren",
        details:
          "FLUXIVE is gebouwd op een mix van cybersecurity, webdevelopment, IT-infrastructuur en digitale marketing. Als we een oplossing voor je uitwerken, gokken we niet – we baseren ons op wat we gezien hebben in echte omgevingen: hotels, agencies, kmo’s en grotere projecten. Je krijgt mensen die zowel de technische kant als de businesskant begrijpen en je adviseren over wat realistisch, veilig en toekomstbestendig is – zonder loze buzzwords.",
      },
      {
        id: "tech",
        icon: Zap,
        title: "Moderne technologie",
        description:
          "De juiste tools en frameworks om toekomstgerichte oplossingen te bouwen",
        details:
          "We werken met moderne stacks zoals Next.js, Tailwind CSS, cloud-native oplossingen, AI-modellen en sterke securitytools in plaats van verouderde systemen die je vertragen. Voor jou betekent dat: snellere websites, slimmere automatisaties, betere inzichten en sterkere beveiliging – gebouwd op technologie die actief onderhouden wordt en klaar is voor morgen. We gebruiken geen tools omdat ze ‘hip’ zijn, maar omdat ze passen bij jouw bedrijf en het beheer eenvoudig houden.",
      },
      {
        id: "tailored",
        icon: Target,
        title: "Oplossingen op maat",
        description: "Aanpak afgestemd op jouw sector, doelen en budget",
        details:
          "Elk bedrijf heeft andere pijnpunten: een hotel worstelt misschien met bookings en Wi-Fi, een restaurant met zichtbaarheid op Google Maps, een agency met automatisatie, een kleine winkel met een eenvoudige maar professionele website. Bij FLUXIVE duwen we niemand in één standaardpakket. We kijken naar je situatie, je budget en je doelen en maken dan een stappenplan dat bij jou past – of dat nu gaat over Google Business-profiel, beter Wi-Fi, een AI-chatbot, een redesign van je site of een combinatie van alles.",
      },
      {
        id: "proven",
        icon: Award,
        title: "Bewezen resultaten",
        description:
          "500+ afgeronde projecten en tevreden klanten in binnen- en buitenland",
        details:
          "Van lokale hotels en kmo’s tot grotere internationale projecten: we hebben gewerkt aan security-audits, websites, marketingcampagnes en automatiseringen die effectief in productie zijn gegaan – geen theoretische slides. We focussen altijd op meetbaar resultaat: meer bookings, meer leads, meer stabiliteit, betere beveiliging en vlottere dagelijkse werking. Die praktijkervaring nemen we mee in elk nieuw project, zodat jij niet alles zelf hoeft uit te zoeken.",
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
        title: "Équipe experte",
        description:
          "Des professionnels expérimentés avec une solide expérience terrain",
        details:
          "FLUXIVE repose sur un mélange de compétences en cybersécurité, développement web, infrastructure IT et marketing digital. Lorsque nous concevons une solution pour vous, nous ne travaillons pas à l’aveugle – nous nous appuyons sur ce que nous avons vu dans des environnements réels : hôtels, agences, PME et projets internationaux. Vous travaillez avec des personnes qui comprennent à la fois la technique et le business, et qui peuvent vous conseiller sur ce qui est réaliste, sécurisé et durable, sans jargon inutile.",
      },
      {
        id: "tech",
        icon: Zap,
        title: "Technologie de pointe",
        description:
          "Outils modernes et frameworks adaptés à votre entreprise",
        details:
          "Nous utilisons des stacks modernes comme Next.js, Tailwind CSS, des outils cloud-native, des modèles d’IA et des solutions de sécurité avancées, plutôt que des systèmes dépassés qui vous ralentissent. Pour vous, cela se traduit par : des sites plus rapides, des automatisations plus intelligentes, de meilleurs indicateurs et une sécurité renforcée – le tout basé sur des technologies maintenues et prêtes pour l’avenir. Nous n’utilisons pas un outil parce qu’il est à la mode, mais parce qu’il est pertinent pour votre cas.",
      },
      {
        id: "tailored",
        icon: Target,
        title: "Solutions sur mesure",
        description:
          "Une approche adaptée à vos besoins, votre secteur et votre budget",
        details:
          "Chaque entreprise a ses propres défis : un hôtel peut avoir des difficultés avec les réservations et le Wi-Fi, un restaurant avec sa visibilité sur Google Maps, une agence avec l’automatisation, une petite boutique avec un site web simple mais professionnel. Chez FLUXIVE, nous ne vendons pas un seul package standard à tout le monde. Nous analysons votre situation, votre budget et vos objectifs, puis nous construisons une feuille de route adaptée – qu’il s’agisse de corriger votre fiche Google Business, d’améliorer le Wi-Fi, de créer un chatbot IA, de refondre votre site, ou d’un mélange de tout cela.",
      },
      {
        id: "proven",
        icon: Award,
        title: "Résultats prouvés",
        description:
          "500+ projets réussis et des clients satisfaits en Belgique et ailleurs",
        details:
          "Des hôtels locaux et petites entreprises aux projets internationaux plus importants, nous avons réalisé des audits de sécurité, sites web, campagnes marketing et automatisations réellement déployés – pas seulement des concepts sur papier. Nous visons toujours des résultats mesurables : plus de réservations, plus de leads, plus de stabilité, une meilleure sécurité et des opérations plus fluides. Cette expérience de terrain, nous la mettons au service de chaque nouveau projet, pour que vous n’ayez pas à tout apprendre par essais et erreurs.",
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
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
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

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {heading.split("FLUXIVE").length > 1 ? (
              <>
                {heading.split("FLUXIVE")[0]}
                <span className="gradient-text">FLUXIVE</span>
                {heading.split("FLUXIVE")[1]}
              </>
            ) : (
              heading
            )}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subheading}
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features
            .filter((f) => f.id !== "proven")
            .map((feature) => {
              const Icon = feature.icon;
              const isActive = selectedFeature?.id === feature.id;

              return (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedFeature(feature)}
                >
                  <Card
                    className={`glass-strong h-full border-primary-500/30 group transition-all duration-300 ${isActive ? "ring-2 ring-primary-500" : ""
                      }`}
                  >
                    <CardHeader className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-xl font-display">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400 text-center">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
        </motion.div>

        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <Card className="glass-card border border-white/20 dark:border-white/10 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80">
            <CardContent className="p-8 md:p-12">
              <h3 className="text-3xl font-display font-bold mb-6 text-center">
                {missionTitle.split(" ").length > 1 ? (
                  <>
                    {missionTitle.split(" ")[0]}{" "}
                    <span className="gradient-text">
                      {missionTitle.split(" ").slice(1).join(" ")}
                    </span>
                  </>
                ) : (
                  <span className="gradient-text">{missionTitle}</span>
                )}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed whitespace-pre-line">
                {missionBody}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Popout / Modal */}
      {selectedFeature && (
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
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-primary-500 to-accent-500 p-3 rounded-xl">
                <selectedFeature.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
                  {selectedFeature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">
                  {selectedFeature.description}
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-800 dark:text-gray-100 leading-relaxed">
              {selectedFeature.details}
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
