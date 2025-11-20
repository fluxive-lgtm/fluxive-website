"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Language = "nl" | "en" | "fr";

export default function PrivacyPolicy() {
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
        ? "Privacybeleid"
        : language === "fr"
        ? "Politique de confidentialité"
        : "Privacy Policy",
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
            <Shield className="w-10 h-10 text-primary-500" />
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
                  ? "1. Inleiding"
                  : language === "fr"
                  ? "1. Introduction"
                  : "1. Introduction"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "In dit privacybeleid leggen we uit hoe FLUXIVE jouw persoonsgegevens verzamelt, gebruikt, bewaart en beschermt wanneer je onze website bezoekt of gebruikmaakt van onze diensten. We hechten veel belang aan jouw privacy en verwerken je gegevens in overeenstemming met de GDPR en de relevante Belgische wetgeving."
                  : language === "fr"
                  ? "La présente politique de confidentialité explique comment FLUXIVE collecte, utilise, conserve et protège vos données à caractère personnel lorsque vous visitez notre site web ou utilisez nos services. Nous accordons une grande importance à votre vie privée et traitons vos données conformément au RGPD et à la législation belge applicable."
                  : "This Privacy Policy explains how FLUXIVE collects, uses, stores and protects your personal data when you visit our website or use our services. We value your privacy and process your data in accordance with the GDPR and applicable Belgian law."}
              </p>
            </section>

            {/* 2. CONTROLLER */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "2. Verwerkingsverantwoordelijke"
                  : language === "fr"
                  ? "2. Responsable du traitement"
                  : "2. Data Controller"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                FLUXIVE<br />
                Brusselsesteenweg 73<br />
                9280 Lebbeke, België<br />
                {language === "nl"
                  ? "E-mail: info@fluxive.be"
                  : language === "fr"
                  ? "E-mail : info@fluxive.be"
                  : "Email: info@fluxive.be"}
                <br />
                BTW / VAT: BE1029968269
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "FLUXIVE is de verwerkingsverantwoordelijke voor de persoonsgegevens die via deze website worden verzameld."
                  : language === "fr"
                  ? "FLUXIVE est le responsable du traitement pour les données personnelles collectées via ce site web."
                  : "FLUXIVE is the data controller for the personal data collected through this website."}
              </p>
            </section>

            {/* 3. WHAT WE COLLECT */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "3. Welke gegevens verzamelen we?"
                  : language === "fr"
                  ? "3. Quelles données collectons-nous ?"
                  : "3. What Data Do We Collect?"}
              </h2>

              <h3 className="text-xl font-semibold mb-3">
                {language === "nl"
                  ? "3.1 Gegevens die je zelf verstrekt"
                  : language === "fr"
                  ? "3.1 Données que vous nous fournissez"
                  : "3.1 Data You Provide Directly"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Via ons contactformulier of rechtstreeks via e-mail kunnen we de volgende gegevens verwerken:"
                  : language === "fr"
                  ? "Via notre formulaire de contact ou par e-mail, nous pouvons traiter les données suivantes :"
                  : "Through our contact form or direct email communication, we may process the following data:"}
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                <li>
                  {language === "nl"
                    ? "Naam"
                    : language === "fr"
                    ? "Nom"
                    : "Name"}
                </li>
                <li>Email</li>
                <li>
                  {language === "nl"
                    ? "Telefoonnummer (optioneel)"
                    : language === "fr"
                    ? "Numéro de téléphone (facultatif)"
                    : "Phone number (optional)"}
                </li>
                <li>
                  {language === "nl"
                    ? "Bedrijfsnaam (optioneel)"
                    : language === "fr"
                    ? "Nom de l’entreprise (facultatif)"
                    : "Company name (optional)"}
                </li>
                <li>
                  {language === "nl"
                    ? "Geselecteerde dienst(en)"
                    : language === "fr"
                    ? "Service(s) sélectionnée(s)"
                    : "Selected service(s)"}
                </li>
                <li>
                  {language === "nl"
                    ? "Inhoud van je bericht"
                    : language === "fr"
                    ? "Contenu de votre message"
                    : "Message content"}
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">
                {language === "nl"
                  ? "3.2 Automatisch verzamelde gegevens"
                  : language === "fr"
                  ? "3.2 Données collectées automatiquement"
                  : "3.2 Data Collected Automatically"}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Wanneer je onze website bezoekt, kunnen we automatisch bepaalde technische gegevens verzamelen via cookies en vergelijkbare technologieën (zie ook ons Cookiebeleid):"
                  : language === "fr"
                  ? "Lorsque vous visitez notre site web, certaines données techniques peuvent être collectées automatiquement via des cookies et technologies similaires (voir également notre politique de cookies) :"
                  : "When you visit our website, we may automatically collect certain technical data via cookies and similar technologies (see also our Cookie Policy):"}
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                <li>IP address (anonymised where possible)</li>
                <li>
                  {language === "nl"
                    ? "Browser- en toestelgegevens"
                    : language === "fr"
                    ? "Informations sur le navigateur et l’appareil"
                    : "Browser and device information"}
                </li>
                <li>
                  {language === "nl"
                    ? "Bezochte pagina’s en klikgedrag"
                    : language === "fr"
                    ? "Pages visitées et interactions"
                    : "Visited pages and interactions"}
                </li>
                <li>
                  {language === "nl"
                    ? "Tijdstippen en duur van het bezoek"
                    : language === "fr"
                    ? "Horodatage et durée de la visite"
                    : "Timestamps and session duration"}
                </li>
              </ul>
            </section>

            {/* 4. PURPOSES */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "4. Waarvoor gebruiken we je gegevens?"
                  : language === "fr"
                  ? "4. À quelles fins utilisons-nous vos données ?"
                  : "4. For What Purposes Do We Use Your Data?"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "We verwerken je persoonsgegevens uitsluitend voor welbepaalde, uitdrukkelijk omschreven en gerechtvaardigde doeleinden, waaronder:"
                  : language === "fr"
                  ? "Nous traitons vos données personnelles uniquement pour des finalités déterminées, explicites et légitimes, notamment :"
                  : "We process your personal data only for specific, explicit and legitimate purposes, including:"}
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {language === "nl"
                    ? "Beantwoorden van je vragen en offertes via het contactformulier."
                    : language === "fr"
                    ? "Répondre à vos questions et demandes de devis via le formulaire de contact."
                    : "Responding to your questions and quote requests via the contact form."}
                </li>
                <li>
                  {language === "nl"
                    ? "Voorbereiden en uitvoeren van een samenwerking of dienstverlening."
                    : language === "fr"
                    ? "Préparer et exécuter une collaboration ou une prestation de services."
                    : "Preparing and executing a collaboration or service agreement."}
                </li>
                <li>
                  {language === "nl"
                    ? "Verbeteren van onze website, diensten en gebruikerservaring."
                    : language === "fr"
                    ? "Améliorer notre site web, nos services et l’expérience utilisateur."
                    : "Improving our website, services and user experience."}
                </li>
                <li>
                  {language === "nl"
                    ? "Naleven van wettelijke verplichtingen (facturatie, boekhouding, etc.)."
                    : language === "fr"
                    ? "Respecter nos obligations légales (facturation, comptabilité, etc.)."
                    : "Complying with legal obligations (invoicing, accounting, etc.)."}
                </li>
                <li>
                  {language === "nl"
                    ? "Beveiliging van onze systemen en preventie van misbruik."
                    : language === "fr"
                    ? "Assurer la sécurité de nos systèmes et prévenir les abus."
                    : "Securing our systems and preventing misuse."}
                </li>
              </ul>
            </section>

            {/* 5. LEGAL BASIS */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "5. Rechtsgrond van de verwerking"
                  : language === "fr"
                  ? "5. Base juridique du traitement"
                  : "5. Legal Basis for Processing"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Afhankelijk van de context verwerken we je gegevens op basis van één of meerdere van de volgende rechtsgronden:"
                  : language === "fr"
                  ? "Selon le contexte, nous traitons vos données sur la base d’une ou plusieurs des bases juridiques suivantes :"
                  : "Depending on the context, we process your data on one or more of the following legal bases:"}
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {language === "nl"
                    ? "Toestemming (artikel 6.1(a) GDPR), bijvoorbeeld wanneer je een contactformulier invult."
                    : language === "fr"
                    ? "Consentement (article 6.1(a) RGPD), par exemple lorsque vous remplissez un formulaire de contact."
                    : "Consent (Article 6.1(a) GDPR), for example when you submit a contact form."}
                </li>
                <li>
                  {language === "nl"
                    ? "Noodzakelijk voor de uitvoering van een overeenkomst (artikel 6.1(b) GDPR)."
                    : language === "fr"
                    ? "Nécessité contractuelle (article 6.1(b) RGPD)."
                    : "Necessary for the performance of a contract (Article 6.1(b) GDPR)."}
                </li>
                <li>
                  {language === "nl"
                    ? "Wettelijke verplichting (artikel 6.1(c) GDPR), bv. boekhouding."
                    : language === "fr"
                    ? "Obligation légale (article 6.1(c) RGPD), p.ex. obligations comptables."
                    : "Legal obligation (Article 6.1(c) GDPR), e.g. accounting obligations."}
                </li>
                <li>
                  {language === "nl"
                    ? "Gerechtvaardigd belang (artikel 6.1(f) GDPR), zoals het verbeteren van onze diensten en het beveiligen van onze systemen."
                    : language === "fr"
                    ? "Intérêt légitime (article 6.1(f) RGPD), par exemple pour améliorer nos services et sécuriser nos systèmes."
                    : "Legitimate interest (Article 6.1(f) GDPR), such as improving our services and securing our systems."}
                </li>
              </ul>
            </section>

            {/* 6. SHARING */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "6. Met wie delen we je gegevens?"
                  : language === "fr"
                  ? "6. Avec qui partageons-nous vos données ?"
                  : "6. With Whom Do We Share Your Data?"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "We verkopen je persoonsgegevens niet. We kunnen beperkt gegevens delen met:"
                  : language === "fr"
                  ? "Nous ne vendons pas vos données personnelles. Nous pouvons partager certaines données limitées avec :"
                  : "We do not sell your personal data. We may share limited data with:"}
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {language === "nl"
                    ? "Dienstverleners (hosting, e-mail, analytics) die namens ons handelen en contractueel gebonden zijn aan vertrouwelijkheid."
                    : language === "fr"
                    ? "Des prestataires de services (hébergement, e-mail, analytics) agissant pour notre compte et soumis à une obligation de confidentialité."
                    : "Service providers (hosting, email, analytics) acting on our behalf under confidentiality obligations."}
                </li>
                <li>
                  {language === "nl"
                    ? "Professionele adviseurs (boekhouder, juridisch advies) wanneer dat noodzakelijk is."
                    : language === "fr"
                    ? "Des conseillers professionnels (comptable, conseil juridique) lorsque cela est nécessaire."
                    : "Professional advisors (accountant, legal counsel) where necessary."}
                </li>
                <li>
                  {language === "nl"
                    ? "Overheidsinstanties indien wettelijk vereist."
                    : language === "fr"
                    ? "Des autorités publiques si la loi l’exige."
                    : "Public authorities where legally required."}
                </li>
              </ul>
            </section>

            {/* 7. RETENTION */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "7. Bewaartermijn"
                  : language === "fr"
                  ? "7. Durée de conservation"
                  : "7. Data Retention"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "We bewaren je persoonsgegevens niet langer dan nodig is voor de doeleinden waarvoor ze werden verzameld, tenzij een langere bewaartermijn wettelijk verplicht of toegestaan is (bijvoorbeeld voor boekhoudkundige verplichtingen)."
                  : language === "fr"
                  ? "Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, sauf si une durée de conservation plus longue est requise ou autorisée par la loi (par exemple à des fins comptables)."
                  : "We retain your personal data only for as long as necessary for the purposes for which it was collected, unless a longer retention period is required or permitted by law (e.g. for accounting obligations)."}
              </p>
            </section>

            {/* 8. RIGHTS */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "8. Jouw rechten"
                  : language === "fr"
                  ? "8. Vos droits"
                  : "8. Your Rights"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Volgens de GDPR heb je de volgende rechten met betrekking tot je persoonsgegevens:"
                  : language === "fr"
                  ? "En vertu du RGPD, vous disposez des droits suivants concernant vos données personnelles :"
                  : "Under the GDPR, you have the following rights regarding your personal data:"}
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {language === "nl"
                    ? "Recht op inzage"
                    : language === "fr"
                    ? "Droit d’accès"
                    : "Right of access"}
                </li>
                <li>
                  {language === "nl"
                    ? "Recht op rectificatie"
                    : language === "fr"
                    ? "Droit de rectification"
                    : "Right to rectification"}
                </li>
                <li>
                  {language === "nl"
                    ? "Recht op gegevenswissing (\"recht om vergeten te worden\")"
                    : language === "fr"
                    ? "Droit à l’effacement (« droit à l’oubli »)"
                    : "Right to erasure (\"right to be forgotten\")"}
                </li>
                <li>
                  {language === "nl"
                    ? "Recht op beperking van de verwerking"
                    : language === "fr"
                    ? "Droit à la limitation du traitement"
                    : "Right to restriction of processing"}
                </li>
                <li>
                  {language === "nl"
                    ? "Recht op overdraagbaarheid van gegevens"
                    : language === "fr"
                    ? "Droit à la portabilité des données"
                    : "Right to data portability"}
                </li>
                <li>
                  {language === "nl"
                    ? "Recht om bezwaar te maken tegen bepaalde verwerkingen (zoals direct marketing)"
                    : language === "fr"
                    ? "Droit d’opposition à certains traitements (par ex. le marketing direct)"
                    : "Right to object to certain processing activities (such as direct marketing)"}
                </li>
                <li>
                  {language === "nl"
                    ? "Recht om je toestemming in te trekken (voor verwerkingen op basis van toestemming)"
                    : language === "fr"
                    ? "Droit de retirer votre consentement (pour les traitements basés sur le consentement)"
                    : "Right to withdraw your consent (for processing based on consent)"}
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Je kan deze rechten uitoefenen door ons te contacteren via privacy@fluxive.com. We kunnen je vragen om je identiteit te bevestigen."
                  : language === "fr"
                  ? "Vous pouvez exercer ces droits en nous contactant à l’adresse privacy@fluxive.com. Nous pouvons vous demander de confirmer votre identité."
                  : "You can exercise these rights by contacting us at privacy@fluxive.com. We may ask you to confirm your identity."}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Daarnaast heb je het recht om een klacht in te dienen bij de Gegevensbeschermingsautoriteit (GBA) in België."
                  : language === "fr"
                  ? "Vous avez également le droit d’introduire une plainte auprès de l’Autorité de protection des données en Belgique."
                  : "You also have the right to lodge a complaint with the Belgian Data Protection Authority."}
              </p>
            </section>

            {/* 9. SECURITY */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "9. Beveiliging"
                  : language === "fr"
                  ? "9. Sécurité"
                  : "9. Security"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "We nemen passende technische en organisatorische maatregelen om je persoonsgegevens te beschermen tegen ongeoorloofde toegang, verlies of misbruik. Geen enkel systeem is echter 100% veilig. Als je vermoedt dat je gegevens misbruikt worden, neem dan onmiddellijk contact met ons op."
                  : language === "fr"
                  ? "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées afin de protéger vos données personnelles contre tout accès non autorisé, perte ou abus. Aucun système n’étant totalement sécurisé, si vous suspectez un abus de vos données, veuillez nous contacter sans délai."
                  : "We take appropriate technical and organisational measures to protect your personal data against unauthorised access, loss or misuse. However, no system is 100% secure. If you suspect misuse of your data, please contact us immediately."}
              </p>
            </section>

            {/* 10. CONTACT */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "10. Contact"
                  : language === "fr"
                  ? "10. Contact"
                  : "10. Contact"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Voor vragen over dit privacybeleid of over de verwerking van je persoonsgegevens kan je ons contacteren via:"
                  : language === "fr"
                  ? "Pour toute question concernant la présente politique de confidentialité ou le traitement de vos données personnelles, vous pouvez nous contacter :"
                  : "If you have any questions about this Privacy Policy or how we process your personal data, you can contact us at:"}
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>FLUXIVE</strong>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  {language === "nl"
                    ? "E-mail: privacy@fluxive.com"
                    : language === "fr"
                    ? "E-mail : privacy@fluxive.com"
                    : "Email: privacy@fluxive.com"}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {language === "nl"
                    ? "Onderwerp: Privacyvraag"
                    : language === "fr"
                    ? "Objet : Question relative à la confidentialité"
                    : "Subject: Privacy Inquiry"}
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
