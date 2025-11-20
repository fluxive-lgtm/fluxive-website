"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, FileText, Cookie } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "privacy" | "terms" | "cookies";
}

type Language = "nl" | "en" | "fr";

type PrivacyTexts = {
  title: string;
  introTitle: string;
  introBody: string;
  infoTitle: string;
  infoSubtitle: string;
  infoList: string[];
  dpaTitle: string;
  dpaIntro: string;
  dpaBoxTitle: string;
  dpaAddress: string;
  dpaPhone: string;
  dpaEmail: string;
  dpaWebsite: string;
  companyTitle: string;
  companyBoxName: string;
  companyBoxVat: string;
  companyBoxEmail: string;
  companyBoxResponse: string;
  linkText: string;
};

type TermsTexts = {
  title: string;
  introTitle: string;
  introBody: string;
  servicesTitle: string;
  servicesIntro: string;
  servicesList: string[];
  lawTitle: string;
  lawBoxLegalEntity: string;
  lawBoxVat: string;
  lawBoxRegistration: string;
  lawBody: string;
  contactTitle: string;
  contactBoxEmail: string;
  contactBoxResponse: string;
  linkText: string;
};

type CookiesTexts = {
  title: string;
  whatTitle: string;
  whatBody: string;
  typesTitle: string;
  essentialTitle: string;
  essentialBody: string;
  functionalTitle: string;
  functionalBody: string;
  analyticsTitle: string;
  analyticsBody: string;
  marketingTitle: string;
  marketingBody: string;
  manageTitle: string;
  manageBody: string;
  linkText: string;
};

type LegalTexts = {
  lastUpdatedLabel: string;
  vatLine: string;
  closeButton: string;
  privacy: PrivacyTexts;
  terms: TermsTexts;
  cookies: CookiesTexts;
};

const legalTexts: Record<Language, LegalTexts> = {
  en: {
    lastUpdatedLabel: "Last updated:",
    vatLine: "BTW/VAT: BE1029968269 | Registered in Belgium",
    closeButton: "Close",
    privacy: {
      title: "Privacy Policy",
      introTitle: "1. Introduction",
      introBody:
        'Welcome to FLUXIVE ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.',
      infoTitle: "2. Information We Collect",
      infoSubtitle: "2.1 Personal Information",
      infoList: [
        "Contact us through our website forms",
        "Subscribe to our newsletter or marketing communications",
        "Request information about our services",
        "Engage with our customer support",
      ],
      dpaTitle: "3. Belgian Data Protection Authority",
      dpaIntro: "You have the right to lodge a complaint with the Belgian DPA:",
      dpaBoxTitle: "Belgian Data Protection Authority",
      dpaAddress: "Drukpersstraat 35, 1000 Brussels, Belgium",
      dpaPhone: "Phone: +32 (0)2 274 48 00",
      dpaEmail: "Email: contact@apd-gba.be",
      dpaWebsite: "Website: www.dataprotectionauthority.be",
      companyTitle: "4. Company Information",
      companyBoxName: "FLUXIVE",
      companyBoxVat: "VAT Number (BTW): BE1029968269",
      companyBoxEmail: "Email: privacy@fluxive.com",
      companyBoxResponse:
        "Response time: Within 30 days (GDPR requirement)",
      linkText: "View full Privacy Policy →",
    },
    terms: {
      title: "Terms of Service",
      introTitle: "1. Acceptance of Terms",
      introBody:
        "By accessing or using our website, services, or products, you agree to be bound by these Terms of Service. If you do not agree to these Terms, please do not use our services.",
      servicesTitle: "2. Services Provided",
      servicesIntro: "FLUXIVE provides professional services including:",
      servicesList: [
        "IT services and infrastructure management",
        "Marketing solutions and digital strategy",
        "AI automation and machine learning",
        "Web development",
        "Penetration testing and cybersecurity",
      ],
      lawTitle: "3. Belgian Law Compliance",
      lawBoxLegalEntity: "Legal Entity: FLUXIVE",
      lawBoxVat: "VAT (BTW) Number: BE1029968269",
      lawBoxRegistration: "Registration: Belgium",
      lawBody:
        "Belgian consumers have specific rights under the Belgian Code of Economic Law, including a 14-day cooling-off period for certain services.",
      contactTitle: "4. Contact Information",
      contactBoxEmail: "Email: legal@fluxive.com",
      contactBoxResponse: "Response time: Within 48 hours",
      linkText: "View full Terms of Service →",
    },
    cookies: {
      title: "Cookie Policy",
      whatTitle: "1. What Are Cookies?",
      whatBody:
        "Cookies are small text files stored on your device when you visit a website. They help us provide you with a better experience and understand how you use our website.",
      typesTitle: "2. Types of Cookies We Use",
      essentialTitle: "Essential Cookies",
      essentialBody:
        "Necessary for the website to function. These cannot be disabled.",
      functionalTitle: "Functional Cookies",
      functionalBody:
        "Remember your preferences (theme, language) for a better experience.",
      analyticsTitle: "Analytics Cookies",
      analyticsBody:
        "Help us understand how visitors use our website (e.g., Google Analytics).",
      marketingTitle: "Marketing Cookies",
      marketingBody:
        "Used to deliver personalized content and measure ad effectiveness.",
      manageTitle: "3. Managing Cookies",
      manageBody:
        "You can control cookies through your browser settings or by using the cookie consent banner on our website. Note that blocking some cookies may affect website functionality.",
      linkText: "View full Cookie Policy →",
    },
  },

  nl: {
    lastUpdatedLabel: "Laatst bijgewerkt:",
    vatLine: "BTW-nummer: BE1029968269 | Geregistreerd in België",
    closeButton: "Sluiten",
    privacy: {
      title: "Privacybeleid",
      introTitle: "1. Inleiding",
      introBody:
        'Welkom bij FLUXIVE ("wij", "ons"). Wij hechten veel belang aan je privacy en aan de beveiliging van je persoonsgegevens. Dit privacybeleid legt uit hoe wij jouw gegevens verzamelen, gebruiken, delen en beschermen wanneer je onze website bezoekt of onze diensten gebruikt.',
      infoTitle: "2. Gegevens die wij verzamelen",
      infoSubtitle: "2.1 Persoonsgegevens",
      infoList: [
        "Wanneer je ons contactformulier op de website invult",
        "Wanneer je je inschrijft op onze nieuwsbrief of marketingcommunicatie",
        "Wanneer je informatie over onze diensten aanvraagt",
        "Wanneer je contact hebt met onze support of ons rechtstreeks mailt",
      ],
      dpaTitle: "3. Gegevensbeschermingsautoriteit in België",
      dpaIntro:
        "Je hebt het recht een klacht in te dienen bij de Belgische Gegevensbeschermingsautoriteit:",
      dpaBoxTitle: "Gegevensbeschermingsautoriteit (GBA)",
      dpaAddress: "Drukpersstraat 35, 1000 Brussel, België",
      dpaPhone: "Telefoon: +32 (0)2 274 48 00",
      dpaEmail: "E-mail: contact@apd-gba.be",
      dpaWebsite: "Website: www.dataprotectionauthority.be",
      companyTitle: "4. Bedrijfsgegevens",
      companyBoxName: "FLUXIVE",
      companyBoxVat: "BTW-nummer: BE1029968269",
      companyBoxEmail: "E-mail: privacy@fluxive.com",
      companyBoxResponse:
        "Reactietermijn: binnen 30 dagen (zoals vereist door de GDPR).",
      linkText: "Volledig privacybeleid bekijken →",
    },
    terms: {
      title: "Algemene voorwaarden",
      introTitle: "1. Aanvaarding van de voorwaarden",
      introBody:
        "Door onze website, diensten of producten te gebruiken, ga je akkoord met deze Algemene Voorwaarden. Als je niet akkoord gaat, gebruik onze diensten dan niet.",
      servicesTitle: "2. Aangeboden diensten",
      servicesIntro: "FLUXIVE biedt onder meer de volgende professionele diensten aan:",
      servicesList: [
        "IT-diensten en infrastructuurbeheer",
        "Marketingoplossingen en digitale strategie",
        "AI-automatisatie en machine learning",
        "Webontwikkeling",
        "Penetratietesten en cybersecurity",
      ],
      lawTitle: "3. Naleving Belgische wetgeving",
      lawBoxLegalEntity: "Rechtspersoon: FLUXIVE",
      lawBoxVat: "BTW-nummer: BE1029968269",
      lawBoxRegistration: "Inschrijving: België",
      lawBody:
        "Belgische consumenten hebben specifieke rechten onder het Wetboek van Economisch Recht, waaronder een herroepingsrecht van 14 dagen voor bepaalde diensten.",
      contactTitle: "4. Contactgegevens",
      contactBoxEmail: "E-mail: legal@fluxive.com",
      contactBoxResponse: "Reactietermijn: binnen 48 uur.",
      linkText: "Volledige algemene voorwaarden bekijken →",
    },
    cookies: {
      title: "Cookiebeleid",
      whatTitle: "1. Wat zijn cookies?",
      whatBody:
        "Cookies zijn kleine tekstbestanden die op je toestel worden opgeslagen wanneer je een website bezoekt. Ze helpen ons om je een betere ervaring te bieden en te begrijpen hoe je onze website gebruikt.",
      typesTitle: "2. Soorten cookies die wij gebruiken",
      essentialTitle: "Essentiële cookies",
      essentialBody:
        "Noodzakelijk om de website goed te laten werken. Deze kun je niet uitschakelen.",
      functionalTitle: "Functionele cookies",
      functionalBody:
        "Onthouden je voorkeuren (zoals thema en taal) voor een meer gepersonaliseerde ervaring.",
      analyticsTitle: "Analytische cookies",
      analyticsBody:
        "Helpen ons te begrijpen hoe bezoekers de site gebruiken (bv. via Google Analytics).",
      marketingTitle: "Marketingcookies",
      marketingBody:
        "Worden gebruikt om gepersonaliseerde inhoud te tonen en de effectiviteit van advertenties te meten.",
      manageTitle: "3. Cookies beheren",
      manageBody:
        "Je kunt cookies beheren via de instellingen van je browser of via de cookie-banner op onze website. Let op: het blokkeren van bepaalde cookies kan de werking van de site beïnvloeden.",
      linkText: "Volledig cookiebeleid bekijken →",
    },
  },

  fr: {
    lastUpdatedLabel: "Dernière mise à jour :",
    vatLine: "TVA : BE1029968269 | Enregistrée en Belgique",
    closeButton: "Fermer",
    privacy: {
      title: "Politique de confidentialité",
      introTitle: "1. Introduction",
      introBody:
        'Bienvenue chez FLUXIVE (« nous »). Nous nous engageons à protéger votre vie privée et à garantir la sécurité de vos données personnelles. La présente politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre site web ou utilisez nos services.',
      infoTitle: "2. Données que nous collectons",
      infoSubtitle: "2.1 Données personnelles",
      infoList: [
        "Lorsque vous nous contactez via un formulaire sur le site",
        "Lorsque vous vous inscrivez à notre newsletter ou à nos communications marketing",
        "Lorsque vous demandez des informations sur nos services",
        "Lorsque vous échangez avec notre support ou nous contactez directement",
      ],
      dpaTitle: "3. Autorité belge de protection des données",
      dpaIntro:
        "Vous avez le droit d’introduire une réclamation auprès de l’Autorité belge de protection des données :",
      dpaBoxTitle: "Autorité de protection des données",
      dpaAddress: "Rue de la Presse 35, 1000 Bruxelles, Belgique",
      dpaPhone: "Téléphone : +32 (0)2 274 48 00",
      dpaEmail: "E-mail : contact@apd-gba.be",
      dpaWebsite: "Site web : www.dataprotectionauthority.be",
      companyTitle: "4. Informations sur l'entreprise",
      companyBoxName: "FLUXIVE",
      companyBoxVat: "Numéro de TVA : BE1029968269",
      companyBoxEmail: "E-mail : privacy@fluxive.com",
      companyBoxResponse:
        "Délai de réponse : dans les 30 jours (conformément au RGPD).",
      linkText: "Voir la politique de confidentialité complète →",
    },
    terms: {
      title: "Conditions d’utilisation",
      introTitle: "1. Acceptation des conditions",
      introBody:
        "En accédant à notre site web ou en utilisant nos services ou produits, vous acceptez d’être lié par les présentes Conditions d’utilisation. Si vous n’acceptez pas ces conditions, veuillez ne pas utiliser nos services.",
      servicesTitle: "2. Services fournis",
      servicesIntro: "FLUXIVE propose notamment les services professionnels suivants :",
      servicesList: [
        "Services IT et gestion d’infrastructure",
        "Solutions marketing et stratégie digitale",
        "Automatisation IA et machine learning",
        "Développement web",
        "Tests d’intrusion et cybersécurité",
      ],
      lawTitle: "3. Conformité au droit belge",
      lawBoxLegalEntity: "Entité juridique : FLUXIVE",
      lawBoxVat: "Numéro de TVA : BE1029968269",
      lawBoxRegistration: "Enregistrement : Belgique",
      lawBody:
        "Les consommateurs belges bénéficient de droits spécifiques en vertu du Code de droit économique, notamment d’un droit de rétractation de 14 jours pour certains services.",
      contactTitle: "4. Coordonnées de contact",
      contactBoxEmail: "E-mail : legal@fluxive.com",
      contactBoxResponse: "Délai de réponse : dans les 48 heures.",
      linkText: "Voir les conditions d’utilisation complètes →",
    },
    cookies: {
      title: "Politique de cookies",
      whatTitle: "1. Que sont les cookies ?",
      whatBody:
        "Les cookies sont de petits fichiers texte enregistrés sur votre appareil lorsque vous visitez un site web. Ils nous aident à vous offrir une meilleure expérience et à comprendre comment vous utilisez notre site.",
      typesTitle: "2. Types de cookies que nous utilisons",
      essentialTitle: "Cookies essentiels",
      essentialBody:
        "Nécessaires au bon fonctionnement du site web. Ils ne peuvent pas être désactivés.",
      functionalTitle: "Cookies fonctionnels",
      functionalBody:
        "Mémorisent vos préférences (thème, langue) pour une expérience plus personnalisée.",
      analyticsTitle: "Cookies d’analyse",
      analyticsBody:
        "Nous aident à comprendre comment les visiteurs utilisent le site (par ex. via Google Analytics).",
      marketingTitle: "Cookies marketing",
      marketingBody:
        "Utilisés pour proposer un contenu personnalisé et mesurer l’efficacité des campagnes publicitaires.",
      manageTitle: "3. Gestion des cookies",
      manageBody:
        "Vous pouvez gérer les cookies via les paramètres de votre navigateur ou via la bannière de consentement sur notre site. Notez que le blocage de certains cookies peut affecter le fonctionnement du site.",
      linkText: "Voir la politique de cookies complète →",
    },
  },
};

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  // Language from context
  const langContext = useLanguage();
  const rawLang = (langContext?.language as Language) || "nl";
  const currentLang: Language =
    rawLang === "en" || rawLang === "fr" || rawLang === "nl" ? rawLang : "nl";
  const t = legalTexts[currentLang];

  const locale =
    currentLang === "nl" ? "nl-BE" : currentLang === "fr" ? "fr-BE" : "en-US";

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const getIcon = () => {
    switch (type) {
      case "privacy":
        return Shield;
      case "terms":
        return FileText;
      case "cookies":
        return Cookie;
    }
  };

  const Icon = getIcon();

  const getTitle = () => {
    if (type === "privacy") return t.privacy.title;
    if (type === "terms") return t.terms.title;
    return t.cookies.title;
  };

  const getContent = () => {
    if (type === "privacy") {
      const p = t.privacy;
      return (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{p.introTitle}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {p.introBody}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{p.infoTitle}</h2>
            <h3 className="text-xl font-semibold mb-3">{p.infoSubtitle}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {p.infoSubtitle.includes("2.1")
                ? // small tweak: remove "2.1" prefix in text, already in subtitle
                  ""
                : null}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {/* short intro sentence */}
              {currentLang === "nl" &&
                "We kunnen onder andere de volgende persoonsgegevens verzamelen wanneer je met ons in contact komt:"}
              {currentLang === "fr" &&
                "Nous pouvons notamment collecter les données personnelles suivantes lorsque vous interagissez avec nous :"}
              {currentLang === "en" &&
                "We may collect personal information that you voluntarily provide to us when you:"}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              {p.infoList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{p.dpaTitle}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {p.dpaIntro}
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>{p.dpaBoxTitle}</strong>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {p.dpaAddress}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {p.dpaPhone}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {p.dpaEmail}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {p.dpaWebsite}
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{p.companyTitle}</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>{p.companyBoxName}</strong>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {p.companyBoxVat}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {p.companyBoxEmail}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {p.companyBoxResponse}
              </p>
            </div>
          </section>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">
            <a
              href="/privacy"
              target="_blank"
              className="text-primary-500 hover:underline"
            >
              {p.linkText}
            </a>
          </p>
        </div>
      );
    }

    if (type === "terms") {
      const tt = t.terms;
      return (
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{tt.introTitle}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {tt.introBody}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{tt.servicesTitle}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {tt.servicesIntro}
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
              {tt.servicesList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{tt.lawTitle}</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>{tt.lawBoxLegalEntity}</strong>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {tt.lawBoxVat}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {tt.lawBoxRegistration}
              </p>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {tt.lawBody}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{tt.contactTitle}</h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {tt.contactBoxEmail}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {tt.contactBoxResponse}
              </p>
            </div>
          </section>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">
            <a
              href="/terms"
              target="_blank"
              className="text-primary-500 hover:underline"
            >
              {tt.linkText}
            </a>
          </p>
        </div>
      );
    }

    const c = t.cookies;
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{c.whatTitle}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {c.whatBody}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{c.typesTitle}</h2>

          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {c.essentialTitle}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {c.essentialBody}
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {c.functionalTitle}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {c.functionalBody}
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {c.analyticsTitle}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {c.analyticsBody}
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {c.marketingTitle}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {c.marketingBody}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{c.manageTitle}</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {c.manageBody}
          </p>
        </section>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">
          <a
            href="/cookies"
            target="_blank"
            className="text-primary-500 hover:underline"
          >
            {c.linkText}
          </a>
        </p>
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-4xl max-h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-primary-500/10 to-secondary-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold">
                      {getTitle()}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t.lastUpdatedLabel}{" "}
                      {new Date().toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">{getContent()}</div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t.vatLine}
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white rounded-lg transition-all"
                  >
                    {t.closeButton}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
