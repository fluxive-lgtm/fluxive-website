"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";

type Language = "en" | "nl" | "fr";

const faqsEn = [
  {
    question: "What services does Fluxive offer?",
    answer:
      "Fluxive provides a full mix of IT, cybersecurity and digital services including secure network and Wi-Fi design, firewall and router configuration, penetration testing, website and landing page development, Google Maps and SEO optimisation, online advertising and AI automation such as chatbots and workflows. We support everything from basic infrastructure to your entire online presence.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on the scope. A simple Wi-Fi optimisation or router setup can be completed in one day. A full website with content and tracking usually takes between 2 and 6 weeks. Larger projects are split into phases with clear deadlines so you always know what is happening.",
  },
  {
    question: "Do you work with startups or only established companies?",
    answer:
      "We work with everyone: startups, family businesses, individual hotels, restaurants and established companies. Our approach is simple: clear communication, transparent pricing and solutions that match where your business is today — with room to grow.",
  },
  {
    question: "What makes Fluxive different from other IT service providers?",
    answer:
      "We combine strong technical skills with real experience in hospitality and small businesses, plus a focus on marketing results. That means we don’t just install a router or build a website — we design solutions that improve bookings, guest experience and day-to-day operations.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes. We provide support contracts for monitoring, security updates, configuration changes and small adjustments. Many clients treat Fluxive as their external IT & marketing partner for quick help and long-term planning.",
  },
  {
    question: "How do you ensure the security of our data?",
    answer:
      "Security is integrated in every step. We use network segmentation, strong encryption, secure configurations, regular updates and best practices from standards like ISO 27001. Everything is explained clearly so you know exactly what is protected and why.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer fixed-price packages for clearly defined projects such as Wi-Fi setup, websites or marketing services. For custom tasks or on-site work, we also offer hourly rates. Every proposal is transparent with no hidden fees.",
  },
  {
    question: "Can you integrate with our existing systems?",
    answer:
      "Yes. We often work with existing routers, PMS systems, booking engines, websites and tools already in use. We analyse what can be kept, what should be upgraded and how everything can be connected securely with minimal disruption.",
  },
];

const faqsNl = [
  {
    question: "Welke diensten biedt Fluxive aan?",
    answer:
      "Fluxive biedt een complete mix van IT-, cybersecurity- en digitale diensten, waaronder veilig netwerk- en Wi-Fi-ontwerp, firewall- en routerconfiguratie, penetratietesten, website- en landingspagina-ontwikkeling, Google Maps- en SEO-optimalisatie, online advertenties en AI-automatisatie zoals chatbots en workflows. We ondersteunen alles van basisinfrastructuur tot volledige online zichtbaarheid.",
  },
  {
    question: "Hoelang duurt een typisch project?",
    answer:
      "Dat hangt af van de omvang. Een kleine Wi-Fi-optimalisatie of routeropzet kan in één dag klaar zijn. Een volledige website met content en tracking duurt meestal tussen 2 en 6 weken. Grotere projecten worden opgedeeld in fases met duidelijke deadlines.",
  },
  {
    question: "Werken jullie ook met starters of alleen met gevestigde bedrijven?",
    answer:
      "We werken met iedereen: start-ups, familiebedrijven, onafhankelijke hotels, restaurants en grotere ondernemingen. Onze aanpak is simpel: duidelijke communicatie, transparante prijzen en oplossingen die passen bij jouw huidige situatie — met ruimte om te groeien.",
  },
  {
    question: "Wat maakt Fluxive anders dan andere IT-dienstverleners?",
    answer:
      "We combineren sterke technische kennis met echte praktijkervaring in hospitality en kmo’s, plus een focus op marketingresultaten. We installeren dus niet gewoon een router of bouwen een website — we creëren oplossingen die je boekingen, gastervaring en dagelijkse werking verbeteren.",
  },
  {
    question: "Bieden jullie ondersteuning na oplevering?",
    answer:
      "Ja. We bieden supportovereenkomsten voor monitoring, beveiligingsupdates, configuratiewijzigingen en kleine aanpassingen. Veel klanten zien Fluxive als hun externe IT- en marketingpartner voor snelle hulp en lange-termijnplanning.",
  },
  {
    question: "Hoe zorgen jullie voor de beveiliging van onze data?",
    answer:
      "Beveiliging is in elke stap geïntegreerd. We gebruiken netwerksegmentatie, sterke encryptie, veilige configuraties, regelmatige updates en best practices gebaseerd op standaarden zoals ISO 27001. We leggen alles duidelijk uit zodat je precies weet wat beschermd wordt en waarom.",
  },
  {
    question: "Wat is jullie prijsmodel?",
    answer:
      "We bieden vaste prijzen voor duidelijk afgebakende projecten zoals Wi-Fi-opzet, websites of marketingpakketten. Voor maatwerk of on-site werk hanteren we uurtarieven. Elke offerte is volledig transparant zonder verborgen kosten.",
  },
  {
    question: "Kunnen jullie integreren met onze bestaande systemen?",
    answer:
      "Ja. We werken vaak met bestaande routers, PMS-systemen, booking engines, websites en tools. We analyseren wat behouden kan blijven, wat beter vervangen wordt en hoe alles veilig en stabiel gekoppeld kan worden met minimale hinder.",
  },
];

const faqsFr = [
  {
    question: "Quels services propose Fluxive ?",
    answer:
      "Fluxive propose un ensemble complet de services IT, cybersécurité et digitaux, incluant la conception de réseaux et Wi-Fi sécurisés, la configuration de routeurs et pare-feux, les tests de pénétration, le développement de sites et landing pages, l’optimisation Google Maps et SEO, la publicité en ligne et l’automatisation IA comme les chatbots et workflows. Nous couvrons toute la chaîne, de l’infrastructure à la présence en ligne.",
  },
  {
    question: "Combien de temps dure généralement un projet ?",
    answer:
      "Cela dépend de l’ampleur. Une simple optimisation Wi-Fi ou configuration de routeur peut être réalisée en une journée. Un site web complet avec contenu et suivi nécessite généralement de 2 à 6 semaines. Les projets plus importants sont découpés en phases avec des échéances claires.",
  },
  {
    question:
      "Travaillez-vous avec des startups ou seulement des entreprises établies ?",
    answer:
      "Nous travaillons avec tous types d'entreprises : startups, entreprises familiales, hôtels indépendants, restaurants et structures plus établies. Notre approche reste la même : communication claire, prix transparents et solutions adaptées à votre niveau actuel — avec la possibilité d’évoluer.",
  },
  {
    question: "Qu’est-ce qui distingue Fluxive des autres prestataires IT ?",
    answer:
      "Nous combinons des compétences techniques solides avec une vraie expérience terrain dans l’hôtellerie et les petites entreprises, ainsi qu’une attention particulière aux résultats marketing. Concrètement, nous ne faisons pas que “poser un routeur” ou “créer un site” — nous concevons des solutions qui améliorent vos réservations, l’expérience client et vos opérations quotidiennes.",
  },
  {
    question: "Proposez-vous un support après la fin du projet ?",
    answer:
      "Oui. Nous mettons en place des contrats de support incluant supervision, mises à jour de sécurité, modifications de configuration et petits ajustements. De nombreux clients considèrent Fluxive comme leur partenaire IT & marketing externe.",
  },
  {
    question: "Comment garantissez-vous la sécurité de nos données ?",
    answer:
      "La sécurité est intégrée à chaque étape. Nous utilisons la segmentation réseau, le chiffrement fort, des configurations sécurisées, des mises à jour régulières et les meilleures pratiques inspirées de normes comme ISO 27001. Nous expliquons chaque mesure clairement pour une transparence totale.",
  },
  {
    question: "Quel est votre modèle de tarification ?",
    answer:
      "Nous proposons des forfaits à prix fixe pour les projets bien définis comme l’installation Wi-Fi, les sites web ou les services marketing. Pour les demandes sur mesure ou les interventions sur site, nous proposons également un tarif horaire. Chaque offre est claire et sans frais cachés.",
  },
  {
    question: "Pouvez-vous vous intégrer à nos systèmes existants ?",
    answer:
      "Oui. Nous travaillons régulièrement avec des routeurs, PMS, moteurs de réservation, sites web et outils déjà en place. Nous analysons ce qui peut être conservé, ce qui doit être amélioré et comment tout connecter de manière stable et sécurisée, avec un minimum d’impact pour votre équipe.",
  },
];

const faqTexts: Record<
  Language,
  {
    titleFirst: string;
    titleHighlight: string;
    subtitle: string;
    bottomText: string;
    buttonText: string;
  }
> = {
  en: {
    titleFirst: "Frequently Asked",
    titleHighlight: "Questions",
    subtitle:
      "Got questions? We've got answers. Can't find what you're looking for? Contact us!",
    bottomText: "Still have questions? We're here to help!",
    buttonText: "Contact Us",
  },
  nl: {
    titleFirst: "Veelgestelde",
    titleHighlight: "Vragen",
    subtitle:
      "Nog vragen? Wij hebben antwoorden. Vind je niet wat je zoekt? Neem gerust contact op!",
    bottomText: "Nog vragen? We helpen je graag verder!",
    buttonText: "Contacteer ons",
  },
  fr: {
    titleFirst: "Questions",
    titleHighlight: "fréquentes",
    subtitle:
      "Vous avez des questions ? Nous avons des réponses. Vous ne trouvez pas ce que vous cherchez ? Contactez-nous !",
    bottomText: "Encore des questions ? Nous sommes là pour vous aider !",
    buttonText: "Contactez-nous",
  },
};

const faqsByLanguage: Record<Language, typeof faqsEn> = {
  en: faqsEn,
  nl: faqsNl,
  fr: faqsFr,
};

export default function FAQ() {
  const languageContext = useLanguage?.();
  // Default to Dutch ("nl") if context is missing or language not supported
  const langFromContext = (languageContext?.language as Language) || "nl";
  const currentLang: Language =
    langFromContext === "en" || langFromContext === "fr" || langFromContext === "nl"
      ? langFromContext
      : "nl";

  const faqs = faqsByLanguage[currentLang];
  const texts = faqTexts[currentLang];

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {texts.titleFirst}{" "}
            <span className="gradient-text">{texts.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {texts.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="glass-card border-primary-500/20 rounded-xl px-6 hover:border-primary-500/40 transition-all"
                >
                  <AccordionTrigger className="text-left font-display font-semibold text-lg hover:no-underline hover:text-primary-500">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {texts.bottomText}
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById("contact");
              contactSection?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-lg font-medium transition-all hover:scale-105"
          >
            {texts.buttonText}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
