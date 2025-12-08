"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Language = "nl" | "en" | "fr";

export default function TermsOfService() {
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
        ? "Algemene voorwaarden"
        : language === "fr"
          ? "Conditions générales"
          : "Terms of Service",
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
            <FileText className="w-10 h-10 text-primary-500" />
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              {t.pageTitle}
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t.lastUpdatedLabel} {formattedDate}
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* 1. DEFINITIONS & CAPACITY */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "1. Definities en Bekwaamheid"
                  : language === "fr"
                    ? "1. Définitions et Capacité"
                    : "1. Definitions and Capacity"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Door gebruik te maken van onze diensten en website, verklaart u dat u ten minste 18 jaar oud bent, of dat u de toestemming van een ouder of voogd heeft, en dat u wettelijk bekwaam bent om een contract aan te gaan."
                  : language === "fr"
                    ? "En utilisant nos services et notre site web, vous déclarez avoir au moins 18 ans, ou avoir l'autorisation d'un parent ou tuteur, et être juridiquement capable de conclure un contrat."
                    : "By using our services and website, you declare that you are at least 18 years of age, or have the consent of a parent or guardian, and have the legal capacity to enter into a contract."}
              </p>
            </section>

            {/* 2. SCOPE */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "2. Toepassingsgebied"
                  : language === "fr"
                    ? "2. Champ d’application"
                    : "2. Scope"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Deze algemene voorwaarden zijn van toepassing op alle voorstellen, offertes, diensten en overeenkomsten tussen FLUXIVE en haar klanten, alsook op het gebruik van onze website."
                  : language === "fr"
                    ? "Les présentes conditions générales s’appliquent à toutes les offres, prestations de services et conventions conclues entre FLUXIVE et ses clients, ainsi qu’à l’utilisation de notre site web."
                    : "These Terms of Service apply to all proposals, offers, services and agreements between FLUXIVE and its clients, as well as to the use of our website."}
              </p>
            </section>

            {/* 3. COMPANY INFO */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "3. Gegevens van FLUXIVE"
                  : language === "fr"
                    ? "3. Informations sur FLUXIVE"
                    : "3. Company Information"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                FLUXIVE<br />
                Brusselsesteenweg 73<br />
                9280 Lebbeke, België<br />
                BTW / VAT: BE1029968269<br />
                {language === "nl"
                  ? "E-mail: info@fluxive.be"
                  : language === "fr"
                    ? "E-mail : info@fluxive.be"
                    : "Email: info@fluxive.be"}
              </p>
            </section>

            {/* 4. OFFERS & CONTRACTS */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "4. Offertes en overeenkomsten"
                  : language === "fr"
                    ? "4. Offres et contrats"
                    : "4. Offers and Agreements"}
              </h2>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {language === "nl"
                    ? "Alle offertes zijn vrijblijvend en bevatten, tenzij anders vermeld, een beperkte geldigheidsduur."
                    : language === "fr"
                      ? "Toutes les offres sont sans engagement et, sauf indication contraire, ont une durée de validité limitée."
                      : "All offers are non-binding and, unless stated otherwise, have a limited validity period."}
                </li>
                <li>
                  {language === "nl"
                    ? "Een overeenkomst komt pas tot stand na schriftelijke of elektronische bevestiging door FLUXIVE (bijvoorbeeld via e-mail of ondertekende offerte)."
                    : language === "fr"
                      ? "Un contrat n’est conclu qu’après confirmation écrite ou électronique de FLUXIVE (par exemple par e-mail ou devis signé)."
                      : "An agreement is only concluded after written or electronic confirmation by FLUXIVE (e.g. by email or signed offer)."}
                </li>
                <li>
                  {language === "nl"
                    ? "Mondelinge afspraken zijn enkel bindend indien zij schriftelijk bevestigd worden."
                    : language === "fr"
                      ? "Les accords oraux ne sont contraignants que s’ils sont confirmés par écrit."
                      : "Oral agreements are only binding if confirmed in writing."}
                </li>
              </ul>
            </section>

            {/* 5. SERVICES & OBLIGATIONS */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "5. Diensten en verplichtingen"
                  : language === "fr"
                    ? "5. Services et obligations"
                    : "5. Services and Obligations"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "FLUXIVE levert haar diensten op een professionele en zorgvuldige manier, volgens de afspraken in de offerte of overeenkomst."
                  : language === "fr"
                    ? "FLUXIVE fournit ses services de manière professionnelle et diligente, conformément aux modalités convenues dans l’offre ou le contrat."
                    : "FLUXIVE provides its services in a professional and diligent manner, in accordance with the conditions agreed in the offer or contract."}
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {language === "nl"
                    ? "De klant staat in voor het tijdig aanleveren van correcte en volledige informatie die nodig is voor de uitvoering van de opdracht."
                    : language === "fr"
                      ? "Le client est responsable de fournir en temps utile des informations correctes et complètes nécessaires à l’exécution de la mission."
                      : "The client is responsible for providing timely, correct and complete information required for the execution of the assignment."}
                </li>
                <li>
                  {language === "nl"
                    ? "Tenzij anders overeengekomen, betreft onze inspanningsverbintenis geen gegarandeerd resultaat (bijvoorbeeld bij marketing, SEO of beveiligingstesten)."
                    : language === "fr"
                      ? "Sauf convention contraire, nous sommes tenus à une obligation de moyens, et non de résultat garanti (par exemple en matière de marketing, de SEO ou de tests de sécurité)."
                      : "Unless otherwise agreed, our obligation is one of best effort, not a guaranteed result (e.g. for marketing, SEO or security testing)."}
                </li>
              </ul>
            </section>

            {/* 6. PRICES & PAYMENT */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "6. Prijzen en betaling"
                  : language === "fr"
                    ? "6. Prix et paiement"
                    : "6. Prices and Payment"}
              </h2>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>
                  {language === "nl"
                    ? "Alle vermelde prijzen zijn exclusief btw, tenzij uitdrukkelijk anders vermeld."
                    : language === "fr"
                      ? "Tous les prix indiqués s’entendent hors TVA, sauf mention contraire."
                      : "All prices are exclusive of VAT unless explicitly stated otherwise."}
                </li>
                <li>
                  {language === "nl"
                    ? "Facturen zijn betaalbaar binnen de op de factuur vermelde betalingstermijn. Bij gebreke daaraan geldt een standaardtermijn van 14 dagen na factuurdatum."
                    : language === "fr"
                      ? "Les factures sont payables dans le délai indiqué sur la facture. À défaut, un délai standard de 14 jours après la date de facturation s’applique."
                      : "Invoices are payable within the payment term stated on the invoice. If not specified, a standard term of 14 days after invoice date applies."}
                </li>
                <li>
                  {language === "nl"
                    ? "Bij laattijdige betaling kunnen nalatigheidsinteresten en administratieve kosten aangerekend worden volgens de geldende wettelijke bepalingen."
                    : language === "fr"
                      ? "En cas de retard de paiement, des intérêts de retard et des frais administratifs peuvent être facturés conformément aux dispositions légales applicables."
                      : "In case of late payment, default interest and administrative costs may be charged in accordance with applicable legal provisions."}
                </li>
              </ul>
            </section>

            {/* 7. INTELLECTUAL PROPERTY */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "7. Intellectuele eigendom"
                  : language === "fr"
                    ? "7. Propriété intellectuelle"
                    : "7. Intellectual Property"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Tenzij anders overeengekomen, behoudt FLUXIVE alle intellectuele eigendomsrechten op de door haar ontwikkelde werken, zoals software, websites, scripts, ontwerpen, rapporten en documentatie. De klant krijgt een gebruiksrecht volgens de afgesproken licentievoorwaarden."
                  : language === "fr"
                    ? "Sauf accord contraire, FLUXIVE conserve tous les droits de propriété intellectuelle sur les travaux qu’elle développe, tels que logiciels, sites web, scripts, designs, rapports et documentation. Le client reçoit un droit d’utilisation conformément aux conditions de licence convenues."
                    : "Unless otherwise agreed, FLUXIVE retains all intellectual property rights to the works it develops, such as software, websites, scripts, designs, reports and documentation. The client receives a right of use in accordance with the agreed licence conditions."}
              </p>
            </section>

            {/* 8. LIABILITY */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "8. Aansprakelijkheid"
                  : language === "fr"
                    ? "8. Responsabilité"
                    : "8. Liability"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "FLUXIVE is niet aansprakelijk voor indirecte schade, gevolgschade, winstderving of dataverlies. Onze totale contractuele en buitencontractuele aansprakelijkheid is, waar wettelijk toegestaan, beperkt tot het factuurbedrag van de betreffende opdracht of, indien dat hoger is, het bedrag gedekt door onze beroepsaansprakelijkheidsverzekering."
                  : language === "fr"
                    ? "FLUXIVE ne peut être tenue responsable des dommages indirects, des pertes de profit ou de données. Notre responsabilité totale, contractuelle et extracontractuelle, est, dans les limites permises par la loi, plafonnée au montant facturé pour la mission concernée ou, si ce montant est plus élevé, au montant couvert par notre assurance responsabilité professionnelle."
                    : "FLUXIVE is not liable for indirect damages, consequential damages, loss of profit or data loss. Our total contractual and extra-contractual liability is, where legally permitted, limited to the invoiced amount for the relevant assignment or, if higher, the amount covered by our professional liability insurance."}
              </p>
            </section>

            {/* 9. WEBSITE USE */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "9. Gebruik van de website"
                  : language === "fr"
                    ? "9. Utilisation du site web"
                    : "9. Use of the Website"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "De inhoud van deze website is uitsluitend bedoeld als algemene informatie. Hoewel we streven naar correcte en actuele informatie, geven we geen garanties over volledigheid of foutloosheid. We behouden het recht om de inhoud op elk moment aan te passen."
                  : language === "fr"
                    ? "Le contenu de ce site web est fourni à titre d’information générale uniquement. Bien que nous veillions à l’exactitude et à l’actualité des informations, nous ne garantissons ni leur exhaustivité ni l’absence d’erreurs. Nous nous réservons le droit de modifier le contenu à tout moment."
                    : "The content on this website is provided for general information purposes only. While we strive for accurate and up-to-date information, we do not guarantee completeness or error-free content. We reserve the right to modify the content at any time."}
              </p>
            </section>

            {/* 10. PRIVACY & COOKIES LINKS */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "10. Privacy en cookies"
                  : language === "fr"
                    ? "10. Confidentialité et cookies"
                    : "10. Privacy and Cookies"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Ons privacybeleid en cookiebeleid maken integraal deel uit van deze algemene voorwaarden."
                  : language === "fr"
                    ? "Notre politique de confidentialité et notre politique de cookies font partie intégrante des présentes conditions générales."
                    : "Our Privacy Policy and Cookie Policy form an integral part of these Terms of Service."}
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                <a
                  href="/privacy"
                  className="text-primary-500 hover:underline"
                >
                  {language === "nl"
                    ? "Lees het privacybeleid"
                    : language === "fr"
                      ? "Consulter la politique de confidentialité"
                      : "Read the Privacy Policy"}
                </a>
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <a
                  href="/cookies"
                  className="text-primary-500 hover:underline"
                >
                  {language === "nl"
                    ? "Lees het cookiebeleid"
                    : language === "fr"
                      ? "Consulter la politique de cookies"
                      : "Read the Cookie Policy"}
                </a>
              </p>
            </section>

            {/* 11. APPLICABLE LAW */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "11. Toepasselijk recht en bevoegde rechtbank"
                  : language === "fr"
                    ? "11. Droit applicable et juridiction compétente"
                    : "11. Applicable Law and Jurisdiction"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Op deze algemene voorwaarden is het Belgisch recht van toepassing. In geval van geschil zijn uitsluitend de rechtbanken van het gerechtelijk arrondissement waarin FLUXIVE gevestigd is bevoegd, onverminderd dwingende wettelijke bepalingen."
                  : language === "fr"
                    ? "Les présentes conditions générales sont régies par le droit belge. En cas de litige, les tribunaux de l’arrondissement judiciaire où FLUXIVE est établie sont seuls compétents, sans préjudice des dispositions légales impératives."
                    : "These Terms of Service are governed by Belgian law. In case of a dispute, the courts of the judicial district in which FLUXIVE is established have exclusive jurisdiction, without prejudice to mandatory legal provisions."}
              </p>
            </section>

            {/* 12. CONTACT */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {language === "nl"
                  ? "12. Contact"
                  : language === "fr"
                    ? "12. Contact"
                    : "12. Contact"}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {language === "nl"
                  ? "Voor vragen over deze algemene voorwaarden kan je ons contacteren via info@fluxive.be."
                  : language === "fr"
                    ? "Pour toute question concernant les présentes conditions générales, vous pouvez nous contacter à l’adresse info@fluxive.be."
                    : "For questions about these Terms of Service, you can contact us at info@fluxive.be."}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
