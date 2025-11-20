"use client";

import { motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Language = "nl" | "en" | "fr";

export default function CookiePolicy() {
  const langContext = useLanguage();
  const rawLang = (langContext?.language as Language) || "nl";
  const language: Language =
    rawLang === "en" || rawLang === "fr" || rawLang === "nl" ? rawLang : "nl";

  const locale =
    language === "nl" ? "nl-BE" : language === "fr" ? "fr-BE" : "en-US";

  const formattedDate = new Date().toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const t = {
    pageTitle:
      language === "nl"
        ? "Cookiebeleid"
        : language === "fr"
        ? "Politique de cookies"
        : "Cookie Policy",
    lastUpdatedLabel:
      language === "nl"
        ? "Laatst bijgewerkt:"
        : language === "fr"
        ? "Dernière mise à jour :"
        : "Last updated:",
  };

  return (
    <main className="relative min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Cookie className="w-10 h-10 text-primary-500" />
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              {t.pageTitle}
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t.lastUpdatedLabel} {formattedDate}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* 1. INTRO */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "1. Inleiding en juridisch kader"
                  : language === "fr"
                  ? "1. Introduction et cadre juridique"
                  : "1. Introduction and Legal Framework"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Dit Cookiebeleid legt uit hoe FLUXIVE cookies en gelijkaardige technologieën gebruikt op onze website. Dit beleid is opgesteld in overeenstemming met:"
                  : language === "fr"
                  ? "La présente politique de cookies explique comment FLUXIVE utilise des cookies et des technologies similaires sur notre site web. Cette politique est conforme aux exigences suivantes :"
                  : "This Cookie Policy explains how FLUXIVE uses cookies and similar tracking technologies on our website. This policy is designed to comply with:"}
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  <strong>GDPR</strong>{" "}
                  {language === "nl"
                    ? "(Algemene Verordening Gegevensbescherming - EU 2016/679)"
                    : language === "fr"
                    ? "(Règlement général sur la protection des données - RGPD, UE 2016/679)"
                    : "(General Data Protection Regulation - EU 2016/679)"}
                </li>
                <li>
                  <strong>
                    {language === "nl"
                      ? "ePrivacy-richtlijn"
                      : language === "fr"
                      ? "Directive ePrivacy"
                      : "ePrivacy Directive"}
                  </strong>{" "}
                  {language === "nl"
                    ? "(2002/58/EG, gewijzigd door 2009/136/EG) – ook bekend als de \"Cookiewet\""
                    : language === "fr"
                    ? "(2002/58/CE modifiée par 2009/136/CE) – également appelée \"loi sur les cookies\""
                    : "(2002/58/EC as amended by 2009/136/EC) – also known as the \"Cookie Law\""}
                </li>
                <li>
                  <strong>
                    {language === "nl"
                      ? "Belgische wetgeving"
                      : language === "fr"
                      ? "Législation belge"
                      : "Belgian Law"}
                  </strong>{" "}
                  {language === "nl"
                    ? "inzake elektronische communicatie en gegevensbescherming"
                    : language === "fr"
                    ? "relative aux communications électroniques et à la protection des données"
                    : "on Electronic Communications and Data Protection"}
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Volgens de Belgische en Europese wetgeving moeten wij jouw uitdrukkelijke toestemming vragen voordat we niet-essentiële cookies op je toestel plaatsen."
                  : language === "fr"
                  ? "Conform la législation belge et européenne, nous devons obtenir votre consentement explicite avant de placer des cookies non essentiels sur votre appareil."
                  : "Under Belgian and EU law, we must obtain your explicit consent before placing non-essential cookies on your device."}
              </p>
            </section>

            {/* 2. WHAT ARE COOKIES */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "2. Wat zijn cookies?"
                  : language === "fr"
                  ? "2. Qu’est-ce qu’un cookie ?"
                  : "2. What Are Cookies?"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Cookies zijn kleine tekstbestanden die op je toestel (computer, tablet of smartphone) worden opgeslagen wanneer je een website bezoekt. Ze worden veel gebruikt om websites beter te laten werken en om informatie te verzamelen voor de eigenaar van de website."
                  : language === "fr"
                  ? "Les cookies sont de petits fichiers texte stockés sur votre appareil (ordinateur, tablette ou smartphone) lorsque vous visitez un site web. Ils sont largement utilisés pour permettre au site de fonctionner correctement et pour fournir des informations aux propriétaires du site."
                  : "Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners."}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Cookies helpen ons te begrijpen hoe je onze website gebruikt, onthouden je voorkeuren en zorgen voor een betere gebruikerservaring."
                  : language === "fr"
                  ? "Les cookies nous aident à comprendre comment vous utilisez notre site web, à mémoriser vos préférences et à améliorer votre expérience globale."
                  : "Cookies help us understand how you use our website, remember your preferences, and improve your overall experience."}
              </p>
            </section>

            {/* 3. HOW WE USE COOKIES */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "3. Hoe gebruiken wij cookies?"
                  : language === "fr"
                  ? "3. Comment utilisons-nous les cookies ?"
                  : "3. How We Use Cookies"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "FLUXIVE gebruikt cookies voor verschillende doeleinden om je surfervaring te verbeteren en onze diensten te optimaliseren. We gebruiken cookies om:"
                  : language === "fr"
                  ? "FLUXIVE utilise des cookies pour différentes finalités afin d’améliorer votre expérience de navigation et d’optimiser nos services. Nous utilisons notamment des cookies pour :"
                  : "FLUXIVE uses cookies for various purposes to enhance your browsing experience and improve our services. We use cookies to:"}
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {language === "nl"
                    ? "Je ingelogd te houden op je account"
                    : language === "fr"
                    ? "Vous maintenir connecté à votre compte"
                    : "Keep you signed in to your account"}
                </li>
                <li>
                  {language === "nl"
                    ? "Je voorkeuren en instellingen te onthouden (bv. taal, thema)"
                    : language === "fr"
                    ? "Mémoriser vos préférences et paramètres (p.ex. langue, thème)"
                    : "Remember your preferences and settings (e.g., language, theme)"}
                </li>
                <li>
                  {language === "nl"
                    ? "Te begrijpen hoe je onze website gebruikt"
                    : language === "fr"
                    ? "Comprendre comment vous utilisez notre site"
                    : "Understand how you use our website"}
                </li>
                <li>
                  {language === "nl"
                    ? "De prestaties en functionaliteit van de website te verbeteren"
                    : language === "fr"
                    ? "Améliorer les performances et les fonctionnalités du site"
                    : "Improve website performance and functionality"}
                </li>
                <li>
                  {language === "nl"
                    ? "Gepersonaliseerde inhoud en aanbevelingen te tonen"
                    : language === "fr"
                    ? "Afficher du contenu et des recommandations personnalisés"
                    : "Provide personalized content and recommendations"}
                </li>
                <li>
                  {language === "nl"
                    ? "Websiteverkeer en gebruikersgedrag te analyseren"
                    : language === "fr"
                    ? "Analyser le trafic du site et le comportement des utilisateurs"
                    : "Analyze website traffic and user behavior"}
                </li>
                <li>
                  {language === "nl"
                    ? "Relevante advertenties te tonen (indien van toepassing)"
                    : language === "fr"
                    ? "Diffuser de la publicité pertinente (le cas échéant)"
                    : "Deliver relevant advertising (if applicable)"}
                </li>
              </ul>
            </section>

            {/* 3. TYPES OF COOKIES (numbering kept as in your original) */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "3. Typen cookies die wij gebruiken"
                  : language === "fr"
                  ? "3. Types de cookies que nous utilisons"
                  : "3. Types of Cookies We Use"}
              </h2>

              {/* Essential */}
              <h3 className="text-xl font-semibold mb-3">
                {language === "nl"
                  ? "3.1 Essentiële cookies"
                  : language === "fr"
                  ? "3.1 Cookies essentiels"
                  : "3.1 Essential Cookies"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Deze cookies zijn noodzakelijk om de website goed te laten functioneren. Ze zorgen voor basisfuncties zoals beveiliging, netwerkbeheer en toegankelijkheid."
                  : language === "fr"
                  ? "Ces cookies sont nécessaires au bon fonctionnement du site web. Ils permettent des fonctionnalités de base telles que la sécurité, la gestion du réseau et l’accessibilité."
                  : "These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility."}
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>
                    {language === "nl"
                      ? "Voorbeelden:"
                      : language === "fr"
                      ? "Exemples :"
                      : "Examples:"}
                  </strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>
                    {language === "nl"
                      ? "Sessiecookies voor gebruikersauthenticatie"
                      : language === "fr"
                      ? "Cookies de session pour l’authentification"
                      : "Session cookies for user authentication"}
                  </li>
                  <li>
                    {language === "nl"
                      ? "Beveiligingscookies om fraude te voorkomen"
                      : language === "fr"
                      ? "Cookies de sécurité pour prévenir la fraude"
                      : "Security cookies to prevent fraudulent activity"}
                  </li>
                  <li>
                    {language === "nl"
                      ? "Load-balancing cookies voor prestaties"
                      : language === "fr"
                      ? "Cookies d’équilibrage de charge pour les performances"
                      : "Load balancing cookies for website performance"}
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>
                  {language === "nl"
                    ? "Duur:"
                    : language === "fr"
                    ? "Durée :"
                    : "Duration:"}
                </strong>{" "}
                {language === "nl"
                  ? "sessie of tot 1 jaar"
                  : language === "fr"
                  ? "session ou jusqu’à 1 an"
                  : "Session or up to 1 year"}
                <br />
                <strong>
                  {language === "nl"
                    ? "Kan je uitschakelen:"
                    : language === "fr"
                    ? "Peut être désactivé :"
                    : "Can be disabled:"}
                </strong>{" "}
                {language === "nl"
                  ? "Nee (nodig voor basisfunctionaliteit)"
                  : language === "fr"
                  ? "Non (nécessaire au fonctionnement du site)"
                  : "No (required for website functionality)"}
              </p>

              {/* Performance */}
              <h3 className="text-xl font-semibold mb-3">
                {language === "nl"
                  ? "3.2 Prestatiecookies"
                  : language === "fr"
                  ? "3.2 Cookies de performance"
                  : "3.2 Performance Cookies"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Deze cookies verzamelen informatie over hoe bezoekers de website gebruiken, bijvoorbeeld welke pagina’s het vaakst bezocht worden en of er foutmeldingen optreden."
                  : language === "fr"
                  ? "Ces cookies collectent des informations sur la façon dont les visiteurs utilisent le site, par exemple les pages les plus consultées ou les messages d’erreur."
                  : "These cookies collect information about how visitors use our website, such as which pages are visited most often and if users receive error messages."}
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>
                    {language === "nl"
                      ? "Voorbeelden:"
                      : language === "fr"
                      ? "Exemples :"
                      : "Examples:"}
                  </strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Google Analytics cookies</li>
                  <li>
                    {language === "nl"
                      ? "Meten van laadtijden van pagina’s"
                      : language === "fr"
                      ? "Mesure du temps de chargement des pages"
                      : "Page load time measurement"}
                  </li>
                  <li>
                    {language === "nl"
                      ? "Foutdetectie en rapportering"
                      : language === "fr"
                      ? "Suivi et rapport des erreurs"
                      : "Error tracking and reporting"}
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>
                  {language === "nl"
                    ? "Duur:"
                    : language === "fr"
                    ? "Durée :"
                    : "Duration:"}
                </strong>{" "}
                {language === "nl"
                  ? "tot 2 jaar"
                  : language === "fr"
                  ? "jusqu’à 2 ans"
                  : "Up to 2 years"}
                <br />
                <strong>
                  {language === "nl"
                    ? "Kan je uitschakelen:"
                    : language === "fr"
                    ? "Peut être désactivé :"
                    : "Can be disabled:"}
                </strong>{" "}
                {language === "nl"
                  ? "Ja"
                  : language === "fr"
                  ? "Oui"
                  : "Yes"}
              </p>

              {/* Functional */}
              <h3 className="text-xl font-semibold mb-3">
                {language === "nl"
                  ? "3.3 Functionele cookies"
                  : language === "fr"
                  ? "3.3 Cookies fonctionnels"
                  : "3.3 Functionality Cookies"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Deze cookies laten de website toe om keuzes te onthouden (zoals je gebruikersnaam, taal of regio) en zorgen voor meer gepersonaliseerde functies."
                  : language === "fr"
                  ? "Ces cookies permettent au site de mémoriser vos choix (par exemple votre nom d’utilisateur, votre langue ou votre région) et d’offrir des fonctionnalités plus personnalisées."
                  : "These cookies allow our website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features."}
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>
                    {language === "nl"
                      ? "Voorbeelden:"
                      : language === "fr"
                      ? "Exemples :"
                      : "Examples:"}
                  </strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>
                    {language === "nl"
                      ? "Themakeuze (dark/light mode)"
                      : language === "fr"
                      ? "Choix du thème (mode clair/sombre)"
                      : "Theme preference (dark/light mode)"}
                  </li>
                  <li>
                    {language === "nl"
                      ? "Taalvoorkeur"
                      : language === "fr"
                      ? "Préférence de langue"
                      : "Language selection"}
                  </li>
                  <li>
                    {language === "nl"
                      ? "Regiospecifieke inhoud"
                      : language === "fr"
                      ? "Contenu spécifique à votre région"
                      : "Region-specific content preferences"}
                  </li>
                  <li>
                    {language === "nl"
                      ? "Formuliergegevens (auto-fill)"
                      : language === "fr"
                      ? "Données de formulaires (auto-complétion)"
                      : "Form auto-fill data"}
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>
                  {language === "nl"
                    ? "Duur:"
                    : language === "fr"
                    ? "Durée :"
                    : "Duration:"}
                </strong>{" "}
                {language === "nl"
                  ? "tot 1 jaar"
                  : language === "fr"
                  ? "jusqu’à 1 an"
                  : "Up to 1 year"}
                <br />
                <strong>
                  {language === "nl"
                    ? "Kan je uitschakelen:"
                    : language === "fr"
                    ? "Peut être désactivé :"
                    : "Can be disabled:"}
                </strong>{" "}
                {language === "nl"
                  ? "Ja (kan functionaliteit beïnvloeden)"
                  : language === "fr"
                  ? "Oui (peut affecter certaines fonctionnalités)"
                  : "Yes (may affect functionality)"}
              </p>

              {/* Targeting */}
              <h3 className="text-xl font-semibold mb-3">
                {language === "nl"
                  ? "3.4 Targeting- en advertentiecookies"
                  : language === "fr"
                  ? "3.4 Cookies de ciblage / publicité"
                  : "3.4 Targeting/Advertising Cookies"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Deze cookies worden gebruikt om inhoud en advertenties te tonen die beter aansluiten bij jouw interesses. Ze kunnen door ons of door derde partijen worden geplaatst."
                  : language === "fr"
                  ? "Ces cookies sont utilisés pour diffuser du contenu et de la publicité adaptés à vos centres d’intérêt. Ils peuvent être placés par nous ou par des tiers."
                  : "These cookies are used to deliver content that is more relevant to you and your interests. They may be set by us or third-party advertising partners."}
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>
                    {language === "nl"
                      ? "Voorbeelden:"
                      : language === "fr"
                      ? "Exemples :"
                      : "Examples:"}
                  </strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Google Ads cookies</li>
                  <li>Facebook Pixel</li>
                  <li>LinkedIn Insight Tag</li>
                  <li>
                    {language === "nl"
                      ? "Retargeting-cookies"
                      : language === "fr"
                      ? "Cookies de reciblage"
                      : "Retargeting cookies"}
                  </li>
                </ul>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>
                  {language === "nl"
                    ? "Duur:"
                    : language === "fr"
                    ? "Durée :"
                    : "Duration:"}
                </strong>{" "}
                {language === "nl"
                  ? "tot 2 jaar"
                  : language === "fr"
                  ? "jusqu’à 2 ans"
                  : "Up to 2 years"}
                <br />
                <strong>
                  {language === "nl"
                    ? "Kan je uitschakelen:"
                    : language === "fr"
                    ? "Peut être désactivé :"
                    : "Can be disabled:"}
                </strong>{" "}
                {language === "nl"
                  ? "Ja"
                  : language === "fr"
                  ? "Oui"
                  : "Yes"}
              </p>
            </section>

            {/* 4. TABLE */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "4. Gedetailleerde cookietabel"
                  : language === "fr"
                  ? "4. Tableau détaillé des cookies"
                  : "4. Detailed Cookie Table"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Hieronder vind je een overzicht van cookies die we mogelijk op onze website gebruiken:"
                  : language === "fr"
                  ? "Vous trouverez ci-dessous un aperçu des cookies que nous pouvons utiliser sur notre site :"
                  : "Below is a detailed list of specific cookies we may use on our website:"}
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="min-w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        {language === "nl"
                          ? "Cookienaam"
                          : language === "fr"
                          ? "Nom du cookie"
                          : "Cookie Name"}
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        {language === "nl"
                          ? "Aanbieder"
                          : language === "fr"
                          ? "Fournisseur"
                          : "Provider"}
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        {language === "nl"
                          ? "Doel"
                          : language === "fr"
                          ? "Finalité"
                          : "Purpose"}
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        {language === "nl"
                          ? "Duur"
                          : language === "fr"
                          ? "Durée"
                          : "Duration"}
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold">
                        {language === "nl"
                          ? "Type"
                          : language === "fr"
                          ? "Type"
                          : "Type"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-t border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-3 font-mono text-xs">
                        cookie-consent
                      </td>
                      <td className="px-4 py-3">FLUXIVE</td>
                      <td className="px-4 py-3">
                        {language === "nl"
                          ? "Slaat je cookievoorkeuren op"
                          : language === "fr"
                          ? "Enregistre vos préférences en matière de cookies"
                          : "Stores your cookie preferences"}
                      </td>
                      <td className="px-4 py-3">
                        {language === "nl"
                          ? "2 jaar"
                          : language === "fr"
                          ? "2 ans"
                          : "2 years"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded text-xs">
                          {language === "nl"
                            ? "Essentieel"
                            : language === "fr"
                            ? "Essentiel"
                            : "Essential"}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-3 font-mono text-xs">theme</td>
                      <td className="px-4 py-3">FLUXIVE</td>
                      <td className="px-4 py-3">
                        {language === "nl"
                          ? "Onthoudt je thema (dark/light mode)"
                          : language === "fr"
                          ? "Mémorise votre préférence de thème (clair/sombre)"
                          : "Remembers your theme preference (dark/light mode)"}
                      </td>
                      <td className="px-4 py-3">
                        {language === "nl"
                          ? "1 jaar"
                          : language === "fr"
                          ? "1 an"
                          : "1 year"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                          {language === "nl"
                            ? "Functioneel"
                            : language === "fr"
                            ? "Fonctionnel"
                            : "Functional"}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-3 font-mono text-xs">_ga</td>
                      <td className="px-4 py-3">Google Analytics</td>
                      <td className="px-4 py-3">
                        {language === "nl"
                          ? "Maakt onderscheid tussen unieke gebruikers voor analytics"
                          : language === "fr"
                          ? "Distingue les utilisateurs uniques pour l’analyse"
                          : "Distinguishes unique users for analytics"}
                      </td>
                      <td className="px-4 py-3">
                        {language === "nl"
                          ? "2 jaar"
                          : language === "fr"
                          ? "2 ans"
                          : "2 years"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                          {language === "nl"
                            ? "Analytics"
                            : language === "fr"
                            ? "Analytics"
                            : "Analytics"}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-3 font-mono text-xs">_gid</td>
                      <td className="px-4 py-3">Google Analytics</td>
                      <td className="px-4 py-3">
                        {language === "nl"
                          ? "Maakt onderscheid tussen unieke gebruikers voor analytics"
                          : language === "fr"
                          ? "Distingue les utilisateurs uniques pour l’analyse"
                          : "Distinguishes unique users for analytics"}
                      </td>
                      <td className="px-4 py-3">
                        {language === "nl"
                          ? "24 uur"
                          : language === "fr"
                          ? "24 heures"
                          : "24 hours"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                          {language === "nl"
                            ? "Analytics"
                            : language === "fr"
                            ? "Analytics"
                            : "Analytics"}
                        </span>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-300 dark:border-gray-700">
                      <td className="px-4 py-3 font-mono text-xs">_gat</td>
                      <td className="px-4 py-3">Google Analytics</td>
                      <td className="px-4 py-3">
                        {language === "nl"
                          ? "Beperkt het aantal verzoeken aan Analytics"
                          : language === "fr"
                          ? "Limite le nombre de requêtes envoyées à Analytics"
                          : "Throttles request rate to Analytics"}
                      </td>
                      <td className="px-4 py-3">
                        {language === "nl"
                          ? "1 minuut"
                          : language === "fr"
                          ? "1 minute"
                          : "1 minute"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                          {language === "nl"
                            ? "Analytics"
                            : language === "fr"
                            ? "Analytics"
                            : "Analytics"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>
                  {language === "nl"
                    ? "Opmerking:"
                    : language === "fr"
                    ? "Remarque :"
                    : "Note:"}
                </strong>{" "}
                {language === "nl"
                  ? "Deze tabel is indicatief. De effectieve cookies kunnen variëren op basis van je toestemmingskeuzes en de diensten die we inzetten."
                  : language === "fr"
                  ? "Ce tableau est indicatif. Les cookies effectivement utilisés peuvent varier en fonction de vos choix de consentement et des services que nous mettons en place."
                  : "This table is indicative. Actual cookies may vary based on your consent choices and services we implement."}
              </p>
            </section>

            {/* 5. THIRD-PARTY COOKIES */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "5. Cookies van derde partijen"
                  : language === "fr"
                  ? "5. Cookies tiers"
                  : "5. Third-Party Cookies"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "We maken gebruik van externe diensten die cookies op je toestel kunnen plaatsen. Deze derde partijen hebben hun eigen privacy- en cookiebeleid:"
                  : language === "fr"
                  ? "Nous utilisons certains services tiers susceptibles de placer des cookies sur votre appareil. Ces tiers disposent de leurs propres politiques de confidentialité et de cookies :"
                  : "We may use third-party services that place cookies on your device. These third parties have their own privacy policies and cookie policies:"}
              </p>

              <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Google Analytics
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {language === "nl"
                      ? "We gebruiken Google Analytics om websitegebruik te analyseren en onze diensten te verbeteren."
                      : language === "fr"
                      ? "Nous utilisons Google Analytics pour analyser l’utilisation du site et améliorer nos services."
                      : "We use Google Analytics to analyze website usage and improve our services."}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 hover:underline"
                    >
                      {language === "nl"
                        ? "Google Privacy Policy"
                        : language === "fr"
                        ? "Politique de confidentialité de Google"
                        : "Google Privacy Policy"}
                    </a>
                  </p>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {language === "nl"
                      ? "Sociale mediaplatformen"
                      : language === "fr"
                      ? "Plateformes de réseaux sociaux"
                      : "Social Media Platforms"}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {language === "nl"
                      ? "Als je interacteert met socialemediafuncties op onze site, kunnen deze platformen cookies plaatsen."
                      : language === "fr"
                      ? "Si vous interagissez avec des fonctionnalités de réseaux sociaux sur notre site, ces plateformes peuvent déposer des cookies."
                      : "If you interact with social media features on our site, those platforms may set cookies."}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === "nl"
                      ? "Voorbeelden: Facebook, LinkedIn, X (Twitter), Instagram"
                      : language === "fr"
                      ? "Exemples : Facebook, LinkedIn, X (Twitter), Instagram"
                      : "Platforms include: Facebook, LinkedIn, Twitter, Instagram"}
                  </p>
                </div>
              </div>
            </section>

            {/* 6. HOW TO CONTROL COOKIES */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "6. Hoe kan je cookies beheren?"
                  : language === "fr"
                  ? "6. Comment contrôler les cookies ?"
                  : "6. How to Control Cookies"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Je hebt het recht om cookies op verschillende manieren te beheren en te beperken:"
                  : language === "fr"
                  ? "Vous avez le droit de gérer et de contrôler les cookies de différentes manières :"
                  : "You have the right to control and manage cookies in several ways:"}
              </p>

              <h3 className="text-xl font-semibold mb-3">
                {language === "nl"
                  ? "6.1 Browsersinstellingen"
                  : language === "fr"
                  ? "6.1 Paramètres du navigateur"
                  : "6.1 Browser Settings"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "De meeste webbrowsers bieden je de mogelijkheid om cookies via de instellingen te beheren. Je kan bijvoorbeeld:"
                  : language === "fr"
                  ? "La plupart des navigateurs web vous permettent de gérer les cookies via leurs paramètres. Vous pouvez par exemple :"
                  : "Most web browsers allow you to control cookies through their settings. You can:"}
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {language === "nl"
                    ? "Alle cookies blokkeren"
                    : language === "fr"
                    ? "Bloquer tous les cookies"
                    : "Block all cookies"}
                </li>
                <li>
                  {language === "nl"
                    ? "Alleen cookies van derde partijen blokkeren"
                    : language === "fr"
                    ? "Bloquer uniquement les cookies tiers"
                    : "Block third-party cookies only"}
                </li>
                <li>
                  {language === "nl"
                    ? "Cookies verwijderen na elke sessie"
                    : language === "fr"
                    ? "Supprimer les cookies après chaque session"
                    : "Delete cookies after browsing sessions"}
                </li>
                <li>
                  {language === "nl"
                    ? "Uitzonderingen instellen voor bepaalde websites"
                    : language === "fr"
                    ? "Définir des exceptions pour certains sites"
                    : "Set exceptions for specific websites"}
                </li>
              </ul>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>
                  {language === "nl"
                    ? "Handleidingen per browser:"
                    : language === "fr"
                    ? "Instructions selon le navigateur :"
                    : "Browser-specific instructions:"}
                </strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Edge
                  </a>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                {language === "nl"
                  ? "6.2 Opt-out tools"
                  : language === "fr"
                  ? "6.2 Outils de désactivation"
                  : "6.2 Opt-Out Tools"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Je kan je voor gerichte advertenties afmelden via:"
                  : language === "fr"
                  ? "Vous pouvez vous désinscrire de certaines publicités ciblées via :"
                  : "You can opt out of targeted advertising cookies through:"}
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  <a
                    href="http://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Digital Advertising Alliance (DAA)
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.youronlinechoices.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    European Interactive Digital Advertising Alliance (EDAA)
                  </a>
                </li>
                <li>
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                {language === "nl"
                  ? "6.3 Belangrijke opmerking"
                  : language === "fr"
                  ? "6.3 Remarque importante"
                  : "6.3 Important Note"}
              </h3>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>
                    {language === "nl"
                      ? "Let op:"
                      : language === "fr"
                      ? "Attention :"
                      : "Warning:"}
                  </strong>{" "}
                  {language === "nl"
                    ? "Als je cookies blokkeert of verwijdert, kan dit invloed hebben op je ervaring op onze website. Sommige functies zullen mogelijk niet correct werken."
                    : language === "fr"
                    ? "Le blocage ou la suppression de certains cookies peut affecter votre expérience sur notre site. Certaines fonctionnalités peuvent ne plus fonctionner correctement."
                    : "Blocking or deleting cookies may affect your experience on our website. Some features may not work properly without certain cookies enabled."}
                </p>
              </div>
            </section>

            {/* 7. DNT */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "7. Do Not Track-signalen"
                  : language === "fr"
                  ? "7. Signaux Do Not Track"
                  : "7. Do Not Track Signals"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Sommige browsers bieden een \"Do Not Track\" (DNT)-functie die aangeeft dat je niet gevolgd wil worden. Op dit moment bestaat er geen uniforme standaard voor de interpretatie van deze signalen. Wij reageren daarom niet specifiek op DNT-signalen, maar we respecteren wel je privacyvoorkeuren en bieden verschillende manieren om cookies en tracking te beheren."
                  : language === "fr"
                  ? "Certains navigateurs incluent une fonctionnalité « Do Not Track » (DNT) indiquant que vous ne souhaitez pas être suivi. À ce jour, il n’existe pas de norme uniforme pour l’interprétation de ces signaux. Nous ne répondons donc pas spécifiquement aux signaux DNT, mais nous respectons vos choix en matière de confidentialité et vous proposons plusieurs moyens de contrôler les cookies et le suivi."
                  : "Some browsers include a \"Do Not Track\" (DNT) feature that signals to websites that you do not want to be tracked. Currently, there is no uniform standard for recognizing and implementing DNT signals. We do not currently respond to DNT signals, but we respect your privacy choices and provide multiple ways to control cookies and tracking."}
              </p>
            </section>

            {/* 8. MOBILE DEVICES */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "8. Mobiele toestellen"
                  : language === "fr"
                  ? "8. Appareils mobiles"
                  : "8. Mobile Devices"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Als je onze website bezoekt via een mobiel toestel, kan je cookies en tracking ook beheren via de instellingen van je toestel:"
                  : language === "fr"
                  ? "Si vous accédez à notre site web depuis un appareil mobile, vous pouvez également gérer les cookies et le suivi via les paramètres de votre appareil :"
                  : "If you access our website through a mobile device, you can control cookies and tracking through your device settings:"}
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  <strong>iOS:</strong>{" "}
                  {language === "nl"
                    ? "Instellingen {'>'} Safari {'>'} Privacy en beveiliging"
                    : language === "fr"
                    ? "Réglages {'>'} Safari {'>'} Confidentialité et sécurité"
                    : "Settings {'>'} Safari {'>'} Privacy & Security"}
                </li>
                <li>
                  <strong>Android:</strong>{" "}
                  {language === "nl"
                    ? "Instellingen {'>'} Google {'>'} Advertenties"
                    : language === "fr"
                    ? "Paramètres {'>'} Google {'>'} Annonces"
                    : "Settings {'>'} Google {'>'} Ads"}
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Je kan ook je advertentie-ID resetten om gepersonaliseerde advertenties te beperken."
                  : language === "fr"
                  ? "Vous pouvez également réinitialiser votre identifiant publicitaire pour limiter la publicité ciblée."
                  : "You can also reset your advertising identifier to limit ad tracking."}
              </p>
            </section>

            {/* 9. CONSENT */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "9. Cookie-toestemming"
                  : language === "fr"
                  ? "9. Consentement relatif aux cookies"
                  : "9. Cookie Consent"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Wanneer je onze website voor het eerst bezoekt, tonen we een cookiebanner. Je kan daarin:"
                  : language === "fr"
                  ? "Lors de votre première visite sur notre site, une bannière de cookies s’affiche. Vous pouvez alors :"
                  : "When you first visit our website, we will display a cookie consent banner. You can:"}
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {language === "nl"
                    ? "Alle cookies accepteren"
                    : language === "fr"
                    ? "Accepter tous les cookies"
                    : "Accept all cookies"}
                </li>
                <li>
                  {language === "nl"
                    ? "Niet-essentiële cookies weigeren"
                    : language === "fr"
                    ? "Refuser les cookies non essentiels"
                    : "Reject non-essential cookies"}
                </li>
                <li>
                  {language === "nl"
                    ? "Je voorkeuren per categorie instellen"
                    : language === "fr"
                    ? "Personnaliser vos préférences par catégorie"
                    : "Customize your cookie preferences"}
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Je kan je keuzes op elk moment wijzigen via de link \"Cookie-instellingen\" in onze footer of door je cookies in je browser te verwijderen."
                  : language === "fr"
                  ? "Vous pouvez modifier vos choix à tout moment via le lien « Paramètres des cookies » dans le pied de page ou en supprimant les cookies dans votre navigateur."
                  : "You can change your preferences at any time by clicking the \"Cookie Settings\" link in our footer or by clearing your browser cookies and revisiting our site."}
              </p>
            </section>

            {/* 10. UPDATES */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "10. Wijzigingen in dit beleid"
                  : language === "fr"
                  ? "10. Modifications de la présente politique"
                  : "10. Updates to This Policy"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "We kunnen dit cookiebeleid van tijd tot tijd aanpassen om rekening te houden met wijzigingen in onze praktijken of omwille van juridische, technische of operationele redenen. Bij belangrijke wijzigingen updaten we de datum \"Laatst bijgewerkt\" bovenaan deze pagina."
                  : language === "fr"
                  ? "Nous pouvons mettre à jour cette politique de cookies occasionnellement afin de refléter des changements dans nos pratiques ou pour des raisons légales, techniques ou opérationnelles. En cas de modification importante, la date « Dernière mise à jour » en haut de cette page sera adaptée."
                  : "We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. We will notify you of any material changes by posting the updated policy on our website with a new \"Last updated\" date."}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "We raden je aan dit beleid regelmatig te raadplegen om op de hoogte te blijven van hoe we cookies gebruiken."
                  : language === "fr"
                  ? "Nous vous recommandons de consulter régulièrement cette politique afin de rester informé(e) sur notre utilisation des cookies."
                  : "We encourage you to review this policy periodically to stay informed about how we use cookies."}
              </p>
            </section>

            {/* 11. MORE INFO */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "11. Meer informatie"
                  : language === "fr"
                  ? "11. Plus d’informations"
                  : "11. More Information"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Meer informatie over hoe we met je gegevens omgaan, vind je in ons "
                  : language === "fr"
                  ? "Pour en savoir plus sur la manière dont nous traitons vos données, consultez notre "
                  : "For more information about our privacy practices, please see our "}
                <a
                  href="/privacy"
                  className="text-primary-500 hover:underline"
                >
                  {language === "nl"
                    ? "Privacybeleid"
                    : language === "fr"
                    ? "Politique de confidentialité"
                    : "Privacy Policy"}
                </a>
                .
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Algemene informatie over cookies vind je op "
                  : language === "fr"
                  ? "Pour des informations générales sur les cookies, visitez "
                  : "To learn more about cookies in general, visit "}
                <a
                  href="https://www.allaboutcookies.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:underline"
                >
                  AllAboutCookies.org
                </a>
                .
              </p>
            </section>

            {/* 12. CONTACT */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "12. Contact"
                  : language === "fr"
                  ? "12. Contact"
                  : "12. Contact Us"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Als je vragen of opmerkingen hebt over ons gebruik van cookies, kan je ons contacteren:"
                  : language === "fr"
                  ? "Si vous avez des questions ou des remarques concernant notre utilisation des cookies, vous pouvez nous contacter :"
                  : "If you have questions or concerns about our use of cookies, please contact us:"}
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>FLUXIVE</strong>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {language === "nl"
                    ? "E-mail: privacy@fluxive.com"
                    : language === "fr"
                    ? "E-mail : privacy@fluxive.com"
                    : "Email: privacy@fluxive.com"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {language === "nl"
                    ? "Onderwerp: Vraag over cookiebeleid"
                    : language === "fr"
                    ? "Objet : Question concernant la politique de cookies"
                    : "Subject: Cookie Policy Inquiry"}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {language === "nl"
                    ? "Reactietermijn: binnen 48 uur"
                    : language === "fr"
                    ? "Délai de réponse : dans les 48 heures"
                    : "Response time: Within 48 hours"}
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
