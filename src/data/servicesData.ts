import { Server, TrendingUp, Bot, Code, Shield, Lock } from "lucide-react";

export type LocalizedString = {
    en: string;
    nl: string;
    fr: string;
};

export type LocalizedArray = {
    en: string[];
    nl: string[];
    fr: string[];
};

export interface ServiceData {
    id: string;
    title: LocalizedString;
    icon: any;
    heroHeading: LocalizedString;
    subheading: LocalizedString;
    fullDescription: LocalizedString;
    whatWeDo: LocalizedArray;
    perfectFor: LocalizedArray;
    ourProcess: { title: LocalizedString; description: LocalizedString }[];
    results: LocalizedArray;
    investment: LocalizedString;
    cta: LocalizedString;
    caseStudy?: LocalizedString;
    featuredWork?: LocalizedString;
    realWorldExample?: LocalizedString;
    whyThisMatters?: LocalizedString;
    color: string;
    bgColor: string;
    borderColor: string;
}

export const servicesData: ServiceData[] = [
    {
        id: "it-wifi",
        title: {
            en: "IT Services & Wi-Fi Solutions",
            nl: "IT-diensten & Wi-Fi Oplossingen",
            fr: "Services IT & Solutions Wi-Fi"
        },
        icon: Server,
        color: "from-cyan-500 to-blue-500",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30",
        heroHeading: {
            en: "Professional Network & Wi-Fi Infrastructure That Keeps Your Business Running",
            nl: "Professionele Netwerk- & Wi-Fi Infrastructuur die uw Bedrijf Draaiende Houdt",
            fr: "Infrastructure Réseau & Wi-Fi Professionnelle pour la Continuité de votre Entreprise"
        },
        subheading: {
            en: "Eliminate dead zones, boost productivity, and keep guests satisfied with enterprise-grade Wi-Fi designed for high-traffic environments.",
            nl: "Elimineer dode zones, verhoog de productiviteit en houd gasten tevreden met enterprise-grade Wi-Fi ontworpen voor drukbezochte omgevingen.",
            fr: "Éliminez les zones mortes, boostez la productivité et satisfaites vos clients avec un Wi-Fi d'entreprise conçu pour les environnements à fort trafic."
        },
        fullDescription: {
            en: "Poor Wi-Fi isn't just frustrating—it's costing you money. Guest complaints, bad reviews, lost bookings, and unproductive staff all stem from inadequate network infrastructure. At Fluxive, we design and maintain stable, scalable Wi-Fi solutions specifically for hotels, restaurants, offices, and growing SMEs across Belgium.",
            nl: "Slechte Wi-Fi is niet alleen frustrerend—het kost u geld. Klachten van gasten, slechte recensies, gemiste boekingen en onproductief personeel komen voort uit een ontoereikende netwerkinfrastructuur. Bij Fluxive ontwerpen en onderhouden we stabiele, schaalbare Wi-Fi oplossingen specifiek voor hotels, restaurants, kantoren en groeiende KMO's in heel België.",
            fr: "Un mauvais Wi-Fi n'est pas seulement frustrant, il vous coûte de l'argent. Plaintes des clients, mauvais avis, réservations perdues et personnel improductif découlent tous d'une infrastructure réseau inadéquate. Chez Fluxive, nous concevons et maintenons des solutions Wi-Fi stables et évolutives spécifiquement pour les hôtels, restaurants, bureaux et PME en croissance à travers la Belgique."
        },
        whatWeDo: {
            en: [
                "Hotel & restaurant Wi-Fi installation - Complete network design or upgrade your existing system",
                "Eliminate Wi-Fi dead zones - Strategic placement of commercial-grade access points for 100% coverage",
                "Guest Wi-Fi & business network separation - Keep customer data secure while providing fast guest access",
                "24/7 network monitoring & support - We fix issues before your guests complain",
                "Future-proof infrastructure - Scalable systems that handle peak traffic (conferences, full bookings, dinner rush)"
            ],
            nl: [
                "Wi-Fi installatie voor hotels & restaurants - Volledig netwerkontwerp of upgrade van uw bestaande systeem",
                "Elimineer Wi-Fi dode zones - Strategische plaatsing van commerciële toegangspunten voor 100% dekking",
                "Scheiding van gasten-Wi-Fi & bedrijfsnetwerk - Houd klantgegevens veilig terwijl u snelle gastentoegang biedt",
                "24/7 netwerkmonitoring & ondersteuning - Wij lossen problemen op voordat uw gasten klagen",
                "Toekomstbestendige infrastructuur - Schaalbare systemen die piekverkeer aankunnen (conferenties, volledige bezetting, dinerdrukte)"
            ],
            fr: [
                "Installation Wi-Fi pour hôtels & restaurants - Conception complète du réseau ou mise à niveau de votre système existant",
                "Éliminez les zones mortes Wi-Fi - Placement stratégique de points d'accès commerciaux pour une couverture à 100%",
                "Séparation du Wi-Fi invités & réseau d'entreprise - Gardez les données clients sécurisées tout en offrant un accès rapide aux invités",
                "Surveillance & support réseau 24/7 - Nous résolvons les problèmes avant que vos clients ne se plaignent",
                "Infrastructure pérenne - Systèmes évolutifs gérant les pics de trafic (conférences, réservations complètes, coup de feu du dîner)"
            ]
        },
        perfectFor: {
            en: [
                "Hotels with guest complaints about Wi-Fi coverage or speed",
                "Restaurants needing reliable POS and guest Wi-Fi",
                "Offices with 10+ employees experiencing slow connectivity",
                "Any business where internet downtime = lost revenue",
                "Homeowners needing whole-home coverage (basement to attic)"
            ],
            nl: [
                "Hotels met klachten van gasten over Wi-Fi dekking of snelheid",
                "Restaurants die betrouwbare POS en gasten-Wi-Fi nodig hebben",
                "Kantoren met 10+ werknemers die trage verbinding ervaren",
                "Elk bedrijf waar internetuitval = omzetverlies",
                "Huiseigenaren die dekking in het hele huis nodig hebben (kelder tot zolder)"
            ],
            fr: [
                "Hôtels avec des plaintes de clients concernant la couverture ou la vitesse du Wi-Fi",
                "Restaurants nécessitant un POS fiable et un Wi-Fi pour les clients",
                "Bureaux avec 10+ employés subissant une connectivité lente",
                "Toute entreprise où une panne internet = perte de revenus",
                "Propriétaires nécessitant une couverture complète de la maison (du sous-sol au grenier)"
            ]
        },
        ourProcess: [
            {
                title: { en: "Free site survey", nl: "Gratis locatiebezoek", fr: "Audit gratuit sur site" },
                description: { en: "We map your current coverage and identify problem areas", nl: "We brengen uw huidige dekking in kaart en identificeren probleemgebieden", fr: "Nous cartographions votre couverture actuelle et identifions les zones problématiques" }
            },
            {
                title: { en: "Custom network design", nl: "Netwerkontwerp op maat", fr: "Conception réseau sur mesure" },
                description: { en: "Tailored to your building layout and user density", nl: "Afgestemd op uw gebouwindeling en gebruikersdichtheid", fr: "Adapté à la configuration de votre bâtiment et à la densité d'utilisateurs" }
            },
            {
                title: { en: "Professional installation", nl: "Professionele installatie", fr: "Installation professionnelle" },
                description: { en: "Commercial-grade equipment, proper cabling, optimal placement", nl: "Commerciële apparatuur, juiste bekabeling, optimale plaatsing", fr: "Équipement de qualité commerciale, câblage approprié, placement optimal" }
            },
            {
                title: { en: "Testing & optimization", nl: "Testen & optimalisatie", fr: "Tests & optimisation" },
                description: { en: "We verify coverage in every corner", nl: "We verifiëren dekking in elke hoek", fr: "Nous vérifions la couverture dans chaque recoin" }
            },
            {
                title: { en: "Ongoing support", nl: "Doorlopende ondersteuning", fr: "Support continu" },
                description: { en: "Monitoring, updates, and rapid response when you need us", nl: "Monitoring, updates en snelle reactie wanneer u ons nodig heeft", fr: "Surveillance, mises à jour et réponse rapide quand vous avez besoin de nous" }
            }
        ],
        results: {
            en: [
                "Zero dead zones throughout your property",
                "10-15 Mbps per user minimum (with 25-30% buffer)",
                "Reduced guest complaints and improved online reviews",
                "Higher staff productivity with reliable connectivity",
                "Peace of mind with enterprise-level security",
                "For Homes: Seamless roaming between floors, no more buffering, coverage in every corner"
            ],
            nl: [
                "Nul dode zones in uw hele pand",
                "Minimaal 10-15 Mbps per gebruiker (met 25-30% buffer)",
                "Minder klachten van gasten en betere online recensies",
                "Hogere productiviteit van personeel met betrouwbare connectiviteit",
                "Gemoedsrust met beveiliging op ondernemingsniveau",
                "Voor woningen: Naadloos roamen tussen verdiepingen, geen buffering meer, dekking in elke hoek"
            ],
            fr: [
                "Zéro zone morte dans toute votre propriété",
                "Minimum 10-15 Mbps par utilisateur (avec 25-30% de marge)",
                "Réduction des plaintes clients et amélioration des avis en ligne",
                "Productivité du personnel accrue grâce à une connectivité fiable",
                "Tranquillité d'esprit avec une sécurité de niveau entreprise",
                "Pour les maisons : Roaming fluide entre les étages, plus de mise en mémoire tampon, couverture dans chaque coin"
            ]
        },
        investment: {
            en: "For Businesses & Hotels: Projects start from €2,500 depending on property size, number of access points needed, and complexity. For Homes: Home Wi-Fi solutions start from €600 for small homes (1-2 access points) to €1,500+ for larger properties. Each solution is custom-quoted after a free site assessment.",
            nl: "Voor Bedrijven & Hotels: Projecten starten vanaf €2.500, afhankelijk van de grootte van het pand, het aantal benodigde toegangspunten en de complexiteit. Voor Woningen: Home Wi-Fi oplossingen starten vanaf €600 voor kleine woningen (1-2 toegangspunten) tot €1.500+ voor grotere panden. Elke oplossing wordt op maat geoffreerd na een gratis locatiebezoek.",
            fr: "Pour Entreprises & Hôtels : Les projets commencent à partir de 2 500 € selon la taille de la propriété, le nombre de points d'accès nécessaires et la complexité. Pour Maisons : Les solutions Wi-Fi résidentielles commencent à partir de 600 € pour les petites maisons (1-2 points d'accès) jusqu'à 1 500 €+ pour les plus grandes propriétés. Chaque solution fait l'objet d'un devis personnalisé après une évaluation gratuite sur site."
        },
        cta: {
            en: "Get your free Wi-Fi site survey today (€500 value) - Contact us at info@fluxive.be or +32 472 92 57 41",
            nl: "Vraag vandaag nog uw gratis Wi-Fi locatiebezoek aan (waarde €500) - Neem contact op via info@fluxive.be of +32 472 92 57 41",
            fr: "Obtenez votre audit Wi-Fi gratuit dès aujourd'hui (valeur 500 €) - Contactez-nous à info@fluxive.be ou au +32 472 92 57 41"
        }
    },
    {
        id: "marketing",
        title: {
            en: "Digital Marketing & Google Maps",
            nl: "Digitale Marketing & Google Maps",
            fr: "Marketing Digital & Google Maps"
        },
        icon: TrendingUp,
        color: "from-teal-500 to-cyan-500",
        bgColor: "bg-teal-500/10",
        borderColor: "border-teal-500/30",
        heroHeading: {
            en: "Get Found on Google. Get More Direct Bookings. Keep More Revenue.",
            nl: "Word Gevonden op Google. Krijg Meer Directe Boekingen. Behoud Meer Omzet.",
            fr: "Soyez Trouvé sur Google. Obtenez Plus de Réservations Directes. Gardez Plus de Revenus."
        },
        subheading: {
            en: "Stop losing customers to competitors and paying high commissions to booking platforms. Dominate local search with our proven digital marketing strategies.",
            nl: "Stop met het verliezen van klanten aan concurrenten en het betalen van hoge commissies aan boekingsplatforms. Domineer lokale zoekresultaten met onze bewezen digitale marketingstrategieën.",
            fr: "Arrêtez de perdre des clients au profit de vos concurrents et de payer des commissions élevées aux plateformes de réservation. Dominez la recherche locale avec nos stratégies de marketing digital éprouvées."
        },
        fullDescription: {
            en: "80% of customers search on Google before choosing a hotel or restaurant. If you're not showing up on Google Maps and local search results, you're invisible—and your competitors are taking your customers. Worse, if you're relying entirely on Booking.com or TripAdvisor, you're paying 15-25% commissions on every booking.\n\nFluxive specializes in local SEO and digital marketing for hospitality and service businesses. We help you rank higher, get more reviews, and drive direct bookings that keep more money in your pocket.",
            nl: "80% van de klanten zoekt op Google voordat ze een hotel of restaurant kiezen. Als u niet verschijnt op Google Maps en in lokale zoekresultaten, bent u onzichtbaar—en uw concurrenten nemen uw klanten over. Erger nog, als u volledig vertrouwt op Booking.com of TripAdvisor, betaalt u 15-25% commissie op elke boeking.\n\nFluxive is gespecialiseerd in lokale SEO en digitale marketing voor horeca- en dienstverlenende bedrijven. Wij helpen u hoger te ranken, meer recensies te krijgen en directe boekingen te stimuleren die meer geld in uw zak houden.",
            fr: "80% des clients effectuent une recherche sur Google avant de choisir un hôtel ou un restaurant. Si vous n'apparaissez pas sur Google Maps et dans les résultats de recherche locaux, vous êtes invisible—et vos concurrents prennent vos clients. Pire, si vous comptez entièrement sur Booking.com ou TripAdvisor, vous payez 15 à 25% de commissions sur chaque réservation.\n\nFluxive se spécialise dans le référencement local et le marketing digital pour les entreprises de l'hôtellerie et des services. Nous vous aidons à mieux vous classer, à obtenir plus d'avis et à générer des réservations directes qui gardent plus d'argent dans votre poche."
        },
        whatWeDo: {
            en: [
                "Google Business Profile optimization - Rank higher on Google Maps for \"hotel in [your city]\" and \"restaurant near me\" searches",
                "Local SEO for hospitality businesses - Get found by customers searching for accommodations and dining in your area",
                "Review generation & reputation management - Earn more 5-star reviews and respond professionally to all feedback",
                "Content marketing that ranks - Blog posts and location pages that bring organic traffic and direct bookings",
                "Reduce Booking.com dependency - Drive more direct bookings through your website and save 15-25% in commissions",
                "Monthly performance reports - Track rankings, reviews, website traffic, and booking sources"
            ],
            nl: [
                "Google Bedrijfsprofiel optimalisatie - Rank hoger op Google Maps voor \"hotel in [uw stad]\" en \"restaurant in de buurt\" zoekopdrachten",
                "Lokale SEO voor horecabedrijven - Word gevonden door klanten die zoeken naar accommodaties en dineren in uw omgeving",
                "Review generatie & reputatiemanagement - Verdien meer 5-sterren reviews en reageer professioneel op alle feedback",
                "Contentmarketing die scoort - Blogposts en locatiepagina's die organisch verkeer en directe boekingen opleveren",
                "Verminder afhankelijkheid van Booking.com - Stimuleer meer directe boekingen via uw website en bespaar 15-25% aan commissies",
                "Maandelijkse prestatierapporten - Volg rankings, reviews, websiteverkeer en boekingsbronnen"
            ],
            fr: [
                "Optimisation du profil Google Business - Classez-vous mieux sur Google Maps pour les recherches \"hôtel à [votre ville]\" et \"restaurant à proximité\"",
                "SEO local pour l'hôtellerie - Soyez trouvé par les clients recherchant un hébergement et un restaurant dans votre région",
                "Génération d'avis & gestion de la réputation - Gagnez plus d'avis 5 étoiles et répondez professionnellement à tous les commentaires",
                "Marketing de contenu performant - Articles de blog et pages de localisation qui apportent du trafic organique et des réservations directes",
                "Réduire la dépendance à Booking.com - Générez plus de réservations directes via votre site web et économisez 15-25% de commissions",
                "Rapports de performance mensuels - Suivez les classements, les avis, le trafic du site web et les sources de réservation"
            ]
        },
        perfectFor: {
            en: [
                "Hotels and restaurants with poor Google Maps visibility",
                "Businesses with fewer than 20 Google reviews",
                "Anyone paying high commissions to booking platforms",
                "Service businesses that rely on local customers",
                "Companies that want measurable marketing ROI",
                "Local Businesses (Retail, Services, Salons) wanting to outrank competitors"
            ],
            nl: [
                "Hotels en restaurants met slechte zichtbaarheid op Google Maps",
                "Bedrijven met minder dan 20 Google-reviews",
                "Iedereen die hoge commissies betaalt aan boekingsplatforms",
                "Dienstverlenende bedrijven die afhankelijk zijn van lokale klanten",
                "Bedrijven die meetbare marketing ROI willen",
                "Lokale Bedrijven (Retail, Diensten, Salons) die concurrenten willen overtreffen"
            ],
            fr: [
                "Hôtels et restaurants avec une mauvaise visibilité sur Google Maps",
                "Entreprises avec moins de 20 avis Google",
                "Toute personne payant des commissions élevées aux plateformes de réservation",
                "Entreprises de services qui dépendent de la clientèle locale",
                "Entreprises qui veulent un ROI marketing mesurable",
                "Commerces Locaux (Détail, Services, Salons) voulant surclasser leurs concurrents"
            ]
        },
        ourProcess: [
            {
                title: { en: "Free SEO audit", nl: "Gratis SEO audit", fr: "Audit SEO gratuit" },
                description: { en: "We analyze your current Google presence and identify opportunities", nl: "We analyseren uw huidige Google-aanwezigheid en identificeren kansen", fr: "Nous analysons votre présence actuelle sur Google et identifions les opportunités" }
            },
            {
                title: { en: "Strategy development", nl: "Strategieontwikkeling", fr: "Développement de stratégie" },
                description: { en: "Custom plan based on your goals, competition, and budget", nl: "Plan op maat op basis van uw doelen, concurrentie en budget", fr: "Plan personnalisé basé sur vos objectifs, la concurrence et le budget" }
            },
            {
                title: { en: "Implementation", nl: "Implementatie", fr: "Mise en œuvre" },
                description: { en: "We optimize your profiles, build citations, and create content", nl: "We optimaliseren uw profielen, bouwen citaties en creëren content", fr: "Nous optimisons vos profils, créons des citations et du contenu" }
            },
            {
                title: { en: "Review generation", nl: "Review generatie", fr: "Génération d'avis" },
                description: { en: "Systematic approach to earning more 5-star reviews", nl: "Systematische aanpak om meer 5-sterren reviews te verdienen", fr: "Approche systématique pour obtenir plus d'avis 5 étoiles" }
            },
            {
                title: { en: "Ongoing optimization", nl: "Doorlopende optimalisatie", fr: "Optimisation continue" },
                description: { en: "Monthly monitoring, reporting, and continuous improvement", nl: "Maandelijkse monitoring, rapportage en continue verbetering", fr: "Surveillance mensuelle, rapports et amélioration continue" }
            }
        ],
        results: {
            en: [
                "Higher rankings on Google Maps and local search",
                "3-5x more Google reviews within 6 months",
                "Increased direct bookings and phone calls",
                "Reduced dependency on expensive booking platforms",
                "Clear ROI tracking with monthly reports"
            ],
            nl: [
                "Hogere rankings op Google Maps en lokale zoekresultaten",
                "3-5x meer Google-reviews binnen 6 maanden",
                "Meer directe boekingen en telefoontjes",
                "Minder afhankelijkheid van dure boekingsplatforms",
                "Duidelijke ROI-tracking met maandelijkse rapporten"
            ],
            fr: [
                "Meilleurs classements sur Google Maps et la recherche locale",
                "3-5x plus d'avis Google en 6 mois",
                "Augmentation des réservations directes et des appels téléphoniques",
                "Réduction de la dépendance aux plateformes de réservation coûteuses",
                "Suivi clair du ROI avec des rapports mensuels"
            ]
        },
        caseStudy: {
            en: "Hotel Koffieboontje saw a 40% increase in direct bookings within 4 months of working with Fluxive, reducing their Booking.com dependency and saving thousands in commissions.",
            nl: "Hotel Koffieboontje zag een toename van 40% in directe boekingen binnen 4 maanden na samenwerking met Fluxive, waardoor hun afhankelijkheid van Booking.com verminderde en duizenden aan commissies werden bespaard.",
            fr: "L'Hôtel Koffieboontje a vu une augmentation de 40% des réservations directes dans les 4 mois suivant sa collaboration avec Fluxive, réduisant sa dépendance à Booking.com et économisant des milliers d'euros en commissions."
        },
        investment: {
            en: "Marketing services start from €800/month. Packages are customized based on your market competition, goals, and the scope of services required.",
            nl: "Marketingdiensten starten vanaf €800/maand. Pakketten worden op maat gemaakt op basis van uw marktconcurrentie, doelen en de omvang van de vereiste diensten.",
            fr: "Les services marketing commencent à partir de 800 €/mois. Les forfaits sont personnalisés en fonction de la concurrence sur votre marché, de vos objectifs et de l'étendue des services requis."
        },
        cta: {
            en: "Get your free SEO audit and Google visibility report - Contact us at info@fluxive.be or +32 472 92 57 41",
            nl: "Ontvang uw gratis SEO-audit en Google-zichtbaarheidsrapport - Neem contact op via info@fluxive.be of +32 472 92 57 41",
            fr: "Obtenez votre audit SEO gratuit et votre rapport de visibilité Google - Contactez-nous à info@fluxive.be ou au +32 472 92 57 41"
        }
    },
    {
        id: "ai-automation",
        title: {
            en: "AI Automation & Custom Chatbots",
            nl: "AI Automatisering & Custom Chatbots",
            fr: "Automatisation IA & Chatbots Personnalisés"
        },
        icon: Bot,
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30",
        heroHeading: {
            en: "Automate Customer Service. Capture More Leads. Never Miss an Opportunity.",
            nl: "Automatiseer Klantenservice. Vang Meer Leads. Mis Nooit een Kans.",
            fr: "Automatisez le Service Client. Capturez Plus de Leads. Ne Manquez Jamais une Opportunité."
        },
        subheading: {
            en: "Save hours every week with AI-powered chatbots and smart workflows that handle inquiries, bookings, and follow-ups—even while you sleep.",
            nl: "Bespaar wekelijks uren met AI-gestuurde chatbots en slimme workflows die vragen, boekingen en follow-ups afhandelen—zelfs terwijl u slaapt.",
            fr: "Économisez des heures chaque semaine avec des chatbots IA et des workflows intelligents qui gèrent les demandes, les réservations et les suivis—même pendant que vous dormez."
        },
        fullDescription: {
            en: "How many potential customers have you lost because you couldn't respond fast enough? How many hours does your team waste answering the same questions over and over? In today's fast-paced world, customers expect instant responses—and if they don't get them, they move on to your competitor.\n\nFluxive builds custom AI chatbots and automation workflows that handle routine tasks, qualify leads, answer FAQs, and even process bookings—24/7, without human intervention. This isn't generic chatbot software; these are tailored solutions built specifically for your business processes.",
            nl: "Hoeveel potentiële klanten bent u verloren omdat u niet snel genoeg kon reageren? Hoeveel uur verspilt uw team aan het steeds opnieuw beantwoorden van dezelfde vragen? In de snelle wereld van vandaag verwachten klanten directe antwoorden—en als ze die niet krijgen, gaan ze naar uw concurrent.\n\nFluxive bouwt aangepaste AI-chatbots en automatiseringsworkflows die routinetaken afhandelen, leads kwalificeren, veelgestelde vragen beantwoorden en zelfs boekingen verwerken—24/7, zonder menselijke tussenkomst. Dit is geen generieke chatbotsoftware; dit zijn op maat gemaakte oplossingen die specifiek zijn gebouwd voor uw bedrijfsprocessen.",
            fr: "Combien de clients potentiels avez-vous perdus parce que vous ne pouviez pas répondre assez vite ? Combien d'heures votre équipe perd-elle à répondre aux mêmes questions encore et encore ? Dans le monde rapide d'aujourd'hui, les clients attendent des réponses instantanées—et s'ils ne les obtiennent pas, ils passent à votre concurrent.\n\nFluxive construit des chatbots IA personnalisés et des workflows d'automatisation qui gèrent les tâches routinières, qualifient les leads, répondent aux FAQ et traitent même les réservations—24/7, sans intervention humaine. Ce n'est pas un logiciel de chatbot générique ; ce sont des solutions sur mesure conçues spécifiquement pour vos processus d'affaires."
        },
        whatWeDo: {
            en: [
                "AI chatbots for hotels & restaurants - Human-like conversations that handle inquiries 24/7, even when you're closed",
                "Automated booking & reservation handling - Capture reservation requests, check availability, and send confirmations instantly",
                "Never miss a lead again - Respond to inquiries in seconds, not hours—capture customers before they contact competitors",
                "FAQ automation for hospitality - Instant answers to \"What are your hours?\", \"Do you have parking?\", \"What's your cancellation policy?\"",
                "Save 5-10 hours per week - Reduce time spent on repetitive customer questions and phone calls",
                "Multi-language support - Serve Belgian customers in Dutch, French, and English automatically",
                "Integration with booking systems - Connect to your existing reservation software and CRM"
            ],
            nl: [
                "AI-chatbots voor hotels & restaurants - Menselijke gesprekken die vragen 24/7 afhandelen, zelfs als u gesloten bent",
                "Geautomatiseerde boekings- & reserveringsafhandeling - Vang reserveringsaanvragen op, controleer beschikbaarheid en stuur direct bevestigingen",
                "Mis nooit meer een lead - Reageer binnen seconden op vragen, niet uren—vang klanten voordat ze contact opnemen met concurrenten",
                "FAQ-automatisering voor horeca - Directe antwoorden op \"Wat zijn uw openingstijden?\", \"Heeft u parkeergelegenheid?\", \"Wat zijn de annuleringsvoorwaarden?\"",
                "Bespaar 5-10 uur per week - Verminder tijd besteed aan repetitieve klantvragen en telefoontjes",
                "Meertalige ondersteuning - Bedien Belgische klanten automatisch in het Nederlands, Frans en Engels",
                "Integratie met boekingssystemen - Verbind met uw bestaande reserveringssoftware en CRM"
            ],
            fr: [
                "Chatbots IA pour hôtels & restaurants - Conversations humaines gérant les demandes 24/7, même quand vous êtes fermé",
                "Gestion automatisée des réservations - Capturez les demandes, vérifiez la disponibilité et envoyez des confirmations instantanément",
                "Ne manquez plus jamais un lead - Répondez aux demandes en quelques secondes—capturez les clients avant qu'ils ne contactent vos concurrents",
                "Automatisation FAQ pour l'hôtellerie - Réponses instantanées à \"Quelles sont vos heures ?\", \"Avez-vous un parking ?\", \"Quelle est votre politique d'annulation ?\"",
                "Économisez 5-10 heures par semaine - Réduisez le temps passé sur les questions répétitives et les appels téléphoniques",
                "Support multilingue - Servez les clients belges en néerlandais, français et anglais automatiquement",
                "Intégration avec les systèmes de réservation - Connectez-vous à votre logiciel de réservation et CRM existant"
            ]
        },
        perfectFor: {
            en: [
                "Hotels and restaurants receiving high volumes of booking inquiries",
                "Service businesses that get the same questions repeatedly",
                "Companies that lose leads outside business hours",
                "Businesses wanting to scale customer service without hiring more staff",
                "Anyone spending 10+ hours/week on routine customer communication",
                "Hotels & Accommodations (Booking questions, Check-in/out)",
                "Restaurants (Reservations, Menu questions)",
                "Service Businesses (Lead qualification, Appointment scheduling)",
                "E-commerce & Retail (Product recommendations, Order tracking)"
            ],
            nl: [
                "Hotels en restaurants die grote volumes boekingsaanvragen ontvangen",
                "Dienstverlenende bedrijven die steeds dezelfde vragen krijgen",
                "Bedrijven die leads verliezen buiten kantooruren",
                "Bedrijven die klantenservice willen opschalen zonder meer personeel aan te nemen",
                "Iedereen die 10+ uur/week besteedt aan routine klantcommunicatie",
                "Hotels & Accommodaties (Boekingsvragen, Check-in/out)",
                "Restaurants (Reserveringen, Menuvragen)",
                "Dienstverleners (Leadkwalificatie, Afspraken plannen)",
                "E-commerce & Retail (Productaanbevelingen, Order tracking)"
            ],
            fr: [
                "Hôtels et restaurants recevant de grands volumes de demandes de réservation",
                "Entreprises de services recevant les mêmes questions de manière répétée",
                "Entreprises perdant des leads en dehors des heures de bureau",
                "Entreprises voulant faire évoluer le service client sans embaucher plus de personnel",
                "Toute personne passant 10+ heures/semaine sur la communication client de routine",
                "Hôtels & Hébergements (Questions de réservation, Check-in/out)",
                "Restaurants (Réservations, Questions sur le menu)",
                "Entreprises de Services (Qualification des leads, Prise de rendez-vous)",
                "E-commerce & Détail (Recommandations produits, Suivi de commande)"
            ]
        },
        ourProcess: [
            {
                title: { en: "Discovery session", nl: "Ontdekkingssessie", fr: "Session de découverte" },
                description: { en: "We map your customer journey and identify automation opportunities", nl: "We brengen uw klantreis in kaart en identificeren automatiseringskansen", fr: "Nous cartographions votre parcours client et identifions les opportunités d'automatisation" }
            },
            {
                title: { en: "Custom chatbot design", nl: "Custom chatbot ontwerp", fr: "Conception de chatbot sur mesure" },
                description: { en: "Built around your specific FAQs, booking process, and brand voice", nl: "Gebouwd rond uw specifieke FAQ's, boekingsproces en merkstem", fr: "Construit autour de vos FAQ spécifiques, processus de réservation et voix de marque" }
            },
            {
                title: { en: "Integration & testing", nl: "Integratie & testen", fr: "Intégration & tests" },
                description: { en: "We connect to your website, CRM, and booking systems", nl: "We verbinden met uw website, CRM en boekingssystemen", fr: "Nous nous connectons à votre site web, CRM et systèmes de réservation" }
            },
            {
                title: { en: "Training & optimization", nl: "Training & optimalisatie", fr: "Formation & optimisation" },
                description: { en: "We teach the AI to handle your specific scenarios", nl: "We leren de AI om uw specifieke scenario's af te handelen", fr: "Nous apprenons à l'IA à gérer vos scénarios spécifiques" }
            },
            {
                title: { en: "Ongoing improvement", nl: "Doorlopende verbetering", fr: "Amélioration continue" },
                description: { en: "Monthly reviews and updates based on real conversations", nl: "Maandelijkse reviews en updates op basis van echte gesprekken", fr: "Revues mensuelles et mises à jour basées sur des conversations réelles" }
            }
        ],
        results: {
            en: [
                "80% of routine inquiries handled automatically",
                "Instant responses 24/7 (even weekends and holidays)",
                "3-5 hours saved per week on customer communication",
                "Higher lead conversion (no more missed opportunities)",
                "Better customer experience with immediate answers"
            ],
            nl: [
                "80% van de routinevragen automatisch afgehandeld",
                "Directe antwoorden 24/7 (zelfs in weekends en op feestdagen)",
                "3-5 uur per week bespaard op klantcommunicatie",
                "Hogere leadconversie (geen gemiste kansen meer)",
                "Betere klantervaring met onmiddellijke antwoorden"
            ],
            fr: [
                "80% des demandes de routine traitées automatiquement",
                "Réponses instantanées 24/7 (même les week-ends et jours fériés)",
                "3-5 heures économisées par semaine sur la communication client",
                "Conversion de leads plus élevée (plus d'opportunités manquées)",
                "Meilleure expérience client avec des réponses immédiates"
            ]
        },
        realWorldExample: {
            en: "A restaurant using our chatbot reduced phone interruptions by 60% during dinner service, while capturing 40% more reservation requests after hours.",
            nl: "Een restaurant dat onze chatbot gebruikt, verminderde telefoononderbrekingen met 60% tijdens het diner, terwijl het na sluitingstijd 40% meer reserveringsaanvragen binnenhaalde.",
            fr: "Un restaurant utilisant notre chatbot a réduit les interruptions téléphoniques de 60% pendant le service du dîner, tout en capturant 40% de demandes de réservation en plus après les heures d'ouverture."
        },
        investment: {
            en: "Custom chatbot projects start from €2,000 depending on complexity, integrations needed, and the number of workflows. Monthly maintenance and hosting fees apply based on usage volume.",
            nl: "Custom chatbot-projecten starten vanaf €2.000, afhankelijk van complexiteit, benodigde integraties en het aantal workflows. Maandelijkse onderhouds- en hostingkosten zijn van toepassing op basis van gebruiksvolume.",
            fr: "Les projets de chatbot sur mesure commencent à partir de 2 000 € selon la complexité, les intégrations nécessaires et le nombre de workflows. Des frais mensuels de maintenance et d'hébergement s'appliquent en fonction du volume d'utilisation."
        },
        cta: {
            en: "Schedule a free automation consultation to see how much time and money you could save - Contact us at info@fluxive.be or +32 472 92 57 41",
            nl: "Plan een gratis automatiseringsconsult om te zien hoeveel tijd en geld u kunt besparen - Neem contact op via info@fluxive.be of +32 472 92 57 41",
            fr: "Planifiez une consultation gratuite en automatisation pour voir combien de temps et d'argent vous pourriez économiser - Contactez-nous à info@fluxive.be ou au +32 472 92 57 41"
        }
    },
    {
        id: "web-design",
        title: {
            en: "Modern Web Design & Development",
            nl: "Modern Webdesign & Ontwikkeling",
            fr: "Conception & Développement Web Moderne"
        },
        icon: Code,
        color: "from-cyan-500 to-teal-500",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30",
        heroHeading: {
            en: "Lightning-Fast Websites That Convert Visitors Into Customers",
            nl: "Razendsnelle Websites Die Bezoekers Omzetten in Klanten",
            fr: "Sites Web Ultra-Rapides Qui Convertissent les Visiteurs en Clients"
        },
        subheading: {
            en: "Your website is your 24/7 salesperson. Make sure it's working hard with a modern, mobile-optimized site built for conversions, not just looks.",
            nl: "Uw website is uw 24/7 verkoper. Zorg ervoor dat deze hard werkt met een moderne, mobiel-geoptimaliseerde site gebouwd voor conversies, niet alleen voor het uiterlijk.",
            fr: "Votre site web est votre vendeur 24/7. Assurez-vous qu'il travaille dur avec un site moderne, optimisé pour mobile, conçu pour les conversions, pas seulement pour l'apparence."
        },
        fullDescription: {
            en: "Your website has 3 seconds to make an impression. If it's slow, outdated, or confusing, visitors leave—and they're not coming back. In today's mobile-first world, your website needs to load instantly, look stunning on every device, and guide visitors toward booking, calling, or contacting you.\n\nFluxive builds modern, high-performance websites specifically for hotels, restaurants, and service businesses. We don't just make pretty designs—we create conversion machines that turn traffic into revenue.",
            nl: "Uw website heeft 3 seconden om indruk te maken. Als hij traag, verouderd of verwarrend is, vertrekken bezoekers—en ze komen niet terug. In de mobile-first wereld van vandaag moet uw website direct laden, er op elk apparaat prachtig uitzien en bezoekers leiden naar boeken, bellen of contact opnemen.\n\nFluxive bouwt moderne, high-performance websites specifiek voor hotels, restaurants en dienstverlenende bedrijven. We maken niet alleen mooie ontwerpen—we creëren conversiemachines die verkeer omzetten in omzet.",
            fr: "Votre site web a 3 secondes pour faire impression. S'il est lent, obsolète ou confus, les visiteurs partent—et ils ne reviennent pas. Dans le monde mobile d'aujourd'hui, votre site doit se charger instantanément, être superbe sur tous les appareils et guider les visiteurs vers la réservation, l'appel ou le contact.\n\nFluxive construit des sites web modernes et performants spécifiquement pour les hôtels, restaurants et entreprises de services. Nous ne faisons pas que de jolis designs—nous créons des machines de conversion qui transforment le trafic en revenus."
        },
        whatWeDo: {
            en: [
                "Hotel & restaurant website design - Custom sites that showcase your property and convert visitors into bookings",
                "Lightning-fast loading (under 2 seconds) - Google rewards speed with higher rankings; guests reward it with bookings",
                "Mobile-optimized for on-the-go bookings - 70% of hotel searches happen on phones—your site must work perfectly on mobile",
                "Conversion-focused design - Strategic booking buttons, clear CTAs, and friction-free reservation forms that increase bookings by 30-50%",
                "Built-in SEO from day one - Proper technical structure so Google can find and rank your pages immediately",
                "Direct booking system integration - Connect to your reservation software, reduce OTA dependency, keep more revenue",
                "Easy to update yourself - Change menus, prices, photos, and promotions without calling a developer",
                "Secure hosting included - Fast Belgian servers, SSL certificates, daily backups, and 99.9% uptime guarantee"
            ],
            nl: [
                "Website ontwerp voor hotels & restaurants - Custom sites die uw pand presenteren en bezoekers omzetten in boekingen",
                "Razendsnel laden (onder 2 seconden) - Google beloont snelheid met hogere rankings; gasten belonen het met boekingen",
                "Mobiel-geoptimaliseerd voor boekingen onderweg - 70% van de hotelzoekopdrachten gebeurt op telefoons—uw site moet perfect werken op mobiel",
                "Conversiegericht ontwerp - Strategische boekingsknoppen, duidelijke CTA's en frictieloze reserveringsformulieren die boekingen met 30-50% verhogen",
                "Ingebouwde SEO vanaf dag één - Juiste technische structuur zodat Google uw pagina's direct kan vinden en ranken",
                "Integratie direct boekingssysteem - Verbind met uw reserveringssoftware, verminder OTA-afhankelijkheid, behoud meer omzet",
                "Gemakkelijk zelf bij te werken - Wijzig menu's, prijzen, foto's en promoties zonder een ontwikkelaar te bellen",
                "Veilige hosting inbegrepen - Snelle Belgische servers, SSL-certificaten, dagelijkse back-ups en 99,9% uptime garantie"
            ],
            fr: [
                "Conception de sites web pour hôtels & restaurants - Sites sur mesure qui mettent en valeur votre propriété et convertissent les visiteurs en réservations",
                "Chargement ultra-rapide (moins de 2 secondes) - Google récompense la vitesse par de meilleurs classements ; les clients la récompensent par des réservations",
                "Optimisé mobile pour les réservations en déplacement - 70% des recherches d'hôtels se font sur téléphone—votre site doit fonctionner parfaitement sur mobile",
                "Design axé sur la conversion - Boutons de réservation stratégiques, CTA clairs et formulaires de réservation sans friction augmentant les réservations de 30-50%",
                "SEO intégré dès le premier jour - Structure technique appropriée pour que Google puisse trouver et classer vos pages immédiatement",
                "Intégration du système de réservation directe - Connectez-vous à votre logiciel de réservation, réduisez la dépendance aux OTA, gardez plus de revenus",
                "Facile à mettre à jour soi-même - Changez les menus, prix, photos et promotions sans appeler un développeur",
                "Hébergement sécurisé inclus - Serveurs belges rapides, certificats SSL, sauvegardes quotidiennes et garantie de disponibilité de 99,9%"
            ]
        },
        perfectFor: {
            en: [
                "Businesses with outdated websites (3+ years old)",
                "Hotels and restaurants with slow-loading or non-mobile-friendly sites",
                "Companies with high traffic but low conversion rates",
                "Anyone embarrassed to share their website URL",
                "Businesses launching new services or rebranding",
                "Hotels & Accommodations (Direct booking engine, Multi-language)",
                "Restaurants & Cafes (Online menu, Reservations)",
                "Small Businesses & Startups (Lead capture, SEO-ready)",
                "E-commerce & Retail (Online store, Payment integration)"
            ],
            nl: [
                "Bedrijven met verouderde websites (3+ jaar oud)",
                "Hotels en restaurants met traag ladende of niet-mobielvriendelijke sites",
                "Bedrijven met veel verkeer maar lage conversieratio's",
                "Iedereen die zich schaamt om zijn website-URL te delen",
                "Bedrijven die nieuwe diensten lanceren of rebranden",
                "Hotels & Accommodaties (Direct boekingssysteem, Meertalig)",
                "Restaurants & Cafés (Online menu, Reserveringen)",
                "Kleine Bedrijven & Startups (Lead capture, SEO-klaar)",
                "E-commerce & Retail (Webshop, Betaalintegratie)"
            ],
            fr: [
                "Entreprises avec des sites web obsolètes (3+ ans)",
                "Hôtels et restaurants avec des sites lents ou non adaptés aux mobiles",
                "Entreprises avec un trafic élevé mais de faibles taux de conversion",
                "Toute personne gênée de partager l'URL de son site web",
                "Entreprises lançant de nouveaux services ou changeant de marque",
                "Hôtels & Hébergements (Moteur de réservation direct, Multilingue)",
                "Restaurants & Cafés (Menu en ligne, Réservations)",
                "Petites Entreprises & Startups (Capture de leads, Prêt pour le SEO)",
                "E-commerce & Détail (Boutique en ligne, Intégration de paiement)"
            ]
        },
        ourProcess: [
            {
                title: { en: "Discovery & strategy", nl: "Ontdekking & strategie", fr: "Découverte & stratégie" },
                description: { en: "We understand your business, goals, and target customers", nl: "We begrijpen uw bedrijf, doelen en doelklanten", fr: "Nous comprenons votre entreprise, vos objectifs et vos clients cibles" }
            },
            {
                title: { en: "Design mockups", nl: "Ontwerp mockups", fr: "Maquettes de design" },
                description: { en: "You see exactly what your site will look like before we build", nl: "U ziet precies hoe uw site eruit zal zien voordat we bouwen", fr: "Vous voyez exactement à quoi ressemblera votre site avant que nous ne construisions" }
            },
            {
                title: { en: "Development", nl: "Ontwikkeling", fr: "Développement" },
                description: { en: "We build with modern frameworks (fast, secure, scalable)", nl: "We bouwen met moderne frameworks (snel, veilig, schaalbaar)", fr: "Nous construisons avec des frameworks modernes (rapide, sécurisé, évolutif)" }
            },
            {
                title: { en: "Content creation", nl: "Contentcreatie", fr: "Création de contenu" },
                description: { en: "Professional copywriting and image optimization", nl: "Professionele copywriting en beeldoptimalisatie", fr: "Rédaction professionnelle et optimisation d'images" }
            },
            {
                title: { en: "Testing & launch", nl: "Testen & lancering", fr: "Tests & lancement" },
                description: { en: "We verify everything works perfectly on all devices", nl: "We verifiëren dat alles perfect werkt op alle apparaten", fr: "Nous vérifions que tout fonctionne parfaitement sur tous les appareils" }
            },
            {
                title: { en: "Training & support", nl: "Training & ondersteuning", fr: "Formation & support" },
                description: { en: "We teach you how to manage your site and provide ongoing support", nl: "We leren u hoe u uw site beheert en bieden doorlopende ondersteuning", fr: "Nous vous apprenons à gérer votre site et fournissons un support continu" }
            }
        ],
        results: {
            en: [
                "Professional, modern design that builds trust instantly",
                "2-3x faster loading speed (better Google rankings and user experience)",
                "30-50% higher conversion rates with optimized user flows",
                "Mobile traffic that actually converts (not just bounces)",
                "SEO-ready foundation for long-term organic growth"
            ],
            nl: [
                "Professioneel, modern ontwerp dat direct vertrouwen wekt",
                "2-3x snellere laadsnelheid (betere Google-rankings en gebruikerservaring)",
                "30-50% hogere conversieratio's met geoptimaliseerde gebruikersstromen",
                "Mobiel verkeer dat daadwerkelijk converteert (niet alleen bounced)",
                "SEO-klare basis voor organische groei op lange termijn"
            ],
            fr: [
                "Design professionnel et moderne qui inspire confiance instantanément",
                "Vitesse de chargement 2-3x plus rapide (meilleurs classements Google et expérience utilisateur)",
                "Taux de conversion 30-50% plus élevés avec des flux utilisateurs optimisés",
                "Trafic mobile qui convertit réellement (pas juste des rebonds)",
                "Fondation prête pour le SEO pour une croissance organique à long terme"
            ]
        },
        featuredWork: {
            en: "Check out hotel-koffieboontje.be - a modern, fast-loading site that increased their direct bookings by 40% and reduced bounce rate by 35%.",
            nl: "Bekijk hotel-koffieboontje.be - een moderne, snel ladende site die hun directe boekingen met 40% verhoogde en de bounce rate met 35% verlaagde.",
            fr: "Découvrez hotel-koffieboontje.be - un site moderne et rapide qui a augmenté leurs réservations directes de 40% et réduit le taux de rebond de 35%."
        },
        investment: {
            en: "Website projects start from €3,000 for small business sites. The final investment depends on the number of pages, custom features, integrations, and content requirements. Optional monthly maintenance packages available.",
            nl: "Websiteprojecten starten vanaf €3.000 voor kleine bedrijfssites. De uiteindelijke investering hangt af van het aantal pagina's, aangepaste functies, integraties en contentvereisten. Optionele maandelijkse onderhoudspakketten beschikbaar.",
            fr: "Les projets de site web commencent à partir de 3 000 € pour les sites de petites entreprises. L'investissement final dépend du nombre de pages, des fonctionnalités personnalisées, des intégrations et des exigences de contenu. Forfaits de maintenance mensuels optionnels disponibles."
        },
        cta: {
            en: "Get a free website audit and conversion analysis - Contact us at info@fluxive.be or +32 472 92 57 41",
            nl: "Ontvang een gratis website-audit en conversieanalyse - Neem contact op via info@fluxive.be of +32 472 92 57 41",
            fr: "Obtenez un audit gratuit de site web et une analyse de conversion - Contactez-nous à info@fluxive.be ou au +32 472 92 57 41"
        }
    },
    {
        id: "pentest",
        title: {
            en: "Penetration Testing",
            nl: "Penetratietesten",
            fr: "Tests d'Intrusion"
        },
        icon: Shield,
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
        heroHeading: {
            en: "Find Your Security Vulnerabilities Before Hackers Do",
            nl: "Vind uw Beveiligingslekken Voordat Hackers Dat Doen",
            fr: "Trouvez vos Failles de Sécurité Avant les Hackers"
        },
        subheading: {
            en: "Professional penetration testing—normally reserved for Fortune 500 companies—now accessible for Belgian SMEs. Protect your business, customers, and reputation.",
            nl: "Professionele penetratietesten—normaal voorbehouden aan Fortune 500-bedrijven—nu toegankelijk voor Belgische KMO's. Bescherm uw bedrijf, klanten en reputatie.",
            fr: "Tests d'intrusion professionnels—normalement réservés aux entreprises Fortune 500—désormais accessibles aux PME belges. Protégez votre entreprise, vos clients et votre réputation."
        },
        fullDescription: {
            en: "61% of cyberattacks target small and medium-sized businesses. Why? Because hackers know SMEs have valuable data but weak security. One successful attack can mean stolen customer data, ransomware demands, regulatory fines, and destroyed reputation. The average cost of a data breach for SMEs is €200,000—many never recover.\n\nPenetration testing (ethical hacking) is how you find security holes before criminals exploit them. Fluxive offers professional penetration testing services typically only available to large corporations—but at prices SMEs can afford.",
            nl: "61% van de cyberaanvallen richt zich op kleine en middelgrote bedrijven. Waarom? Omdat hackers weten dat KMO's waardevolle gegevens hebben maar zwakke beveiliging. Eén succesvolle aanval kan leiden tot gestolen klantgegevens, ransomware-eisen, boetes van toezichthouders en een verwoeste reputatie. De gemiddelde kosten van een datalek voor KMO's bedragen €200.000—velen herstellen nooit.\n\nPenetratietesten (ethisch hacken) is hoe u beveiligingslekken vindt voordat criminelen ze misbruiken. Fluxive biedt professionele penetratietesten die doorgaans alleen beschikbaar zijn voor grote bedrijven—maar tegen prijzen die KMO's zich kunnen veroorloven.",
            fr: "61% des cyberattaques visent les petites et moyennes entreprises. Pourquoi ? Parce que les hackers savent que les PME ont des données précieuses mais une sécurité faible. Une attaque réussie peut signifier des données clients volées, des demandes de rançon, des amendes réglementaires et une réputation détruite. Le coût moyen d'une violation de données pour les PME est de 200 000 €—beaucoup ne s'en remettent jamais.\n\nLes tests d'intrusion (hacking éthique) sont le moyen de trouver les failles de sécurité avant que les criminels ne les exploitent. Fluxive propose des services de tests d'intrusion professionnels généralement réservés aux grandes entreprises—mais à des prix abordables pour les PME."
        },
        whatWeDo: {
            en: [
                "Web Applications - Your website, customer portals, booking systems",
                "Network Infrastructure - Firewalls, routers, Wi-Fi security",
                "Mobile Apps - iOS and Android applications",
                "Cloud Systems - AWS, Azure, Google Cloud configurations",
                "Internal Systems - Databases, file servers, employee networks",
                "Security testing for hotels & restaurants - Find vulnerabilities in your website, booking system, and customer databases",
                "Protect guest payment data - Test for weaknesses that could expose credit card information",
                "GDPR compliance verification - Ensure your systems meet Belgian and EU data protection requirements"
            ],
            nl: [
                "Webapplicaties - Uw website, klantenportalen, boekingssystemen",
                "Netwerkinfrastructuur - Firewalls, routers, Wi-Fi beveiliging",
                "Mobiele Apps - iOS en Android applicaties",
                "Cloud Systemen - AWS, Azure, Google Cloud configuraties",
                "Interne Systemen - Databases, bestandsservers, werknemersnetwerken",
                "Beveiligingstesten voor hotels & restaurants - Vind kwetsbaarheden in uw website, boekingssysteem en klantendatabases",
                "Bescherm betaalgegevens van gasten - Test op zwakke plekken die creditcardinformatie kunnen blootleggen",
                "GDPR-nalevingsverificatie - Zorg ervoor dat uw systemen voldoen aan de Belgische en EU-gegevensbeschermingsvereisten"
            ],
            fr: [
                "Applications Web - Votre site web, portails clients, systèmes de réservation",
                "Infrastructure Réseau - Pare-feu, routeurs, sécurité Wi-Fi",
                "Applications Mobiles - Applications iOS et Android",
                "Systèmes Cloud - Configurations AWS, Azure, Google Cloud",
                "Systèmes Internes - Bases de données, serveurs de fichiers, réseaux d'employés",
                "Tests de sécurité pour hôtels & restaurants - Trouvez des vulnérabilités dans votre site web, système de réservation et bases de données clients",
                "Protégez les données de paiement des clients - Testez les faiblesses qui pourraient exposer les informations de carte de crédit",
                "Vérification de la conformité RGPD - Assurez-vous que vos systèmes répondent aux exigences belges et européennes de protection des données"
            ]
        },
        perfectFor: {
            en: [
                "E-commerce Businesses (Protect customer payment data, PCI-DSS)",
                "Hotels & Hospitality (Protect guest credit card information, GDPR)",
                "SaaS & Tech Companies (Protect customer data, Compliance)",
                "Data-Sensitive Businesses (Healthcare, Legal, Finance)",
                "Any business with an online booking or e-commerce system"
            ],
            nl: [
                "E-commerce Bedrijven (Bescherm betaalgegevens klanten, PCI-DSS)",
                "Hotels & Horeca (Bescherm creditcardinformatie gasten, GDPR)",
                "SaaS & Tech Bedrijven (Bescherm klantgegevens, Compliance)",
                "Gevoelige Bedrijven (Zorg, Juridisch, Financiën)",
                "Elk bedrijf met een online boekings- of e-commerce systeem"
            ],
            fr: [
                "Entreprises E-commerce (Protégez les données de paiement clients, PCI-DSS)",
                "Hôtels & Hôtellerie (Protégez les informations de carte de crédit des clients, RGPD)",
                "Entreprises SaaS & Tech (Protégez les données clients, Conformité)",
                "Entreprises Sensibles aux Données (Santé, Juridique, Finance)",
                "Toute entreprise avec un système de réservation en ligne ou e-commerce"
            ]
        },
        ourProcess: [
            {
                title: { en: "Scoping session", nl: "Scoping sessie", fr: "Session de cadrage" },
                description: { en: "We define what systems to test and what's in/out of scope", nl: "We definiëren welke systemen getest moeten worden en wat binnen/buiten scope valt", fr: "Nous définissons quels systèmes tester et ce qui est dans/hors périmètre" }
            },
            {
                title: { en: "Reconnaissance", nl: "Verkenning", fr: "Reconnaissance" },
                description: { en: "We gather information about your systems (like a real attacker would)", nl: "We verzamelen informatie over uw systemen (zoals een echte aanvaller zou doen)", fr: "Nous rassemblons des informations sur vos systèmes (comme le ferait un vrai attaquant)" }
            },
            {
                title: { en: "Vulnerability scanning", nl: "Kwetsbaarheidsscan", fr: "Scan de vulnérabilité" },
                description: { en: "Automated tools identify potential weak points", nl: "Geautomatiseerde tools identificeren potentiële zwakke punten", fr: "Des outils automatisés identifient les points faibles potentiels" }
            },
            {
                title: { en: "Manual exploitation", nl: "Handmatige exploitatie", fr: "Exploitation manuelle" },
                description: { en: "Our experts attempt to exploit vulnerabilities ethically", nl: "Onze experts proberen kwetsbaarheden ethisch te exploiteren", fr: "Nos experts tentent d'exploiter les vulnérabilités de manière éthique" }
            },
            {
                title: { en: "Detailed reporting", nl: "Gedetailleerde rapportage", fr: "Rapport détaillé" },
                description: { en: "You get a comprehensive report with findings and recommendations", nl: "U krijgt een uitgebreid rapport met bevindingen en aanbevelingen", fr: "Vous obtenez un rapport complet avec des constatations et des recommandations" }
            },
            {
                title: { en: "Remediation guidance", nl: "Herstelbegeleiding", fr: "Conseils de remédiation" },
                description: { en: "We explain how to fix each issue (or fix them for you)", nl: "We leggen uit hoe elk probleem op te lossen (of lossen ze voor u op)", fr: "Nous expliquons comment corriger chaque problème (ou les corrigeons pour vous)" }
            },
            {
                title: { en: "Re-testing", nl: "Hertesten", fr: "Nouveaux tests" },
                description: { en: "We verify fixes at no extra charge", nl: "We verifiëren oplossingen zonder extra kosten", fr: "Nous vérifions les correctifs sans frais supplémentaires" }
            }
        ],
        results: {
            en: [
                "Complete visibility into your security posture",
                "Prioritized list of vulnerabilities (critical to low risk)",
                "Clear action plan for improving security",
                "Compliance documentation for GDPR and industry standards",
                "Peace of mind knowing you're protected",
                "Competitive advantage (you can advertise \"security tested\")"
            ],
            nl: [
                "Volledig inzicht in uw beveiligingsstatus",
                "Geprioriteerde lijst van kwetsbaarheden (kritiek tot laag risico)",
                "Duidelijk actieplan voor het verbeteren van de beveiliging",
                "Compliance-documentatie voor GDPR en industriestandaarden",
                "Gemoedsrust wetende dat u beschermd bent",
                "Concurrentievoordeel (u kunt adverteren met \"beveiliging getest\")"
            ],
            fr: [
                "Visibilité complète sur votre posture de sécurité",
                "Liste priorisée des vulnérabilités (critique à faible risque)",
                "Plan d'action clair pour améliorer la sécurité",
                "Documentation de conformité pour le RGPD et les normes de l'industrie",
                "Tranquillité d'esprit en sachant que vous êtes protégé",
                "Avantage concurrentiel (vous pouvez faire de la publicité \"sécurité testée\")"
            ]
        },
        whyThisMatters: {
            en: "One hotel we tested had a critical vulnerability that could have exposed all guest credit card data. We found it, they fixed it, and they avoided what could have been a business-ending breach.",
            nl: "Een hotel dat we testten had een kritieke kwetsbaarheid die alle creditcardgegevens van gasten had kunnen blootleggen. Wij vonden het, zij repareerden het, en ze vermeden wat een bedrijfsbeëindigend lek had kunnen zijn.",
            fr: "Un hôtel que nous avons testé avait une vulnérabilité critique qui aurait pu exposer toutes les données de carte de crédit des clients. Nous l'avons trouvée, ils l'ont corrigée, et ils ont évité ce qui aurait pu être une violation fatale pour l'entreprise."
        },
        investment: {
            en: "Penetration testing starts from €2,000 for basic website security assessments. Pricing varies based on the scope (number of systems), complexity, and depth of testing required. Annual re-testing packages available.",
            nl: "Penetratietesten starten vanaf €2.000 voor basis websitebeveiligingsbeoordelingen. Prijzen variëren op basis van de scope (aantal systemen), complexiteit en diepte van de vereiste tests. Jaarlijkse hertestpakketten beschikbaar.",
            fr: "Les tests d'intrusion commencent à partir de 2 000 € pour les évaluations de sécurité de base des sites web. Les prix varient en fonction de l'étendue (nombre de systèmes), de la complexité et de la profondeur des tests requis. Forfaits de nouveaux tests annuels disponibles."
        },
        cta: {
            en: "Get a free security assessment consultation to understand your risk level - Contact us at info@fluxive.be or +32 472 92 57 41",
            nl: "Ontvang een gratis beveiligingsbeoordelingsconsult om uw risiconiveau te begrijpen - Neem contact op via info@fluxive.be of +32 472 92 57 41",
            fr: "Obtenez une consultation gratuite d'évaluation de sécurité pour comprendre votre niveau de risque - Contactez-nous à info@fluxive.be ou au +32 472 92 57 41"
        }
    },
    {
        id: "cyber",
        title: {
            en: "Cybersecurity & Protection",
            nl: "Cybersecurity & Beveiliging",
            fr: "Cybersécurité & Protection"
        },
        icon: Lock,
        color: "from-red-500 to-pink-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        heroHeading: {
            en: "End-to-end security for small and medium businesses",
            nl: "End-to-end beveiliging voor kleine en middelgrote bedrijven",
            fr: "Sécurité de bout en bout pour les petites et moyennes entreprises"
        },
        subheading: {
            en: "Without enterprise-level complexity.",
            nl: "Zonder de complexiteit van grote ondernemingen.",
            fr: "Sans la complexité des grandes entreprises."
        },
        fullDescription: {
            en: "Most small and medium businesses are not ready for a real cyber incident: weak passwords, no backups, no clear plan, and employees who are not trained to spot phishing. We help you build a realistic security baseline for your size and budget: from secure configurations and backups to endpoint protection, access control and awareness training. If something goes wrong, we support you with incident response guidance so you can contain, recover and learn from the event.",
            nl: "De meeste kleine en middelgrote bedrijven zijn niet klaar voor een echt cyberincident: zwakke wachtwoorden, geen back-ups, geen duidelijk plan en werknemers die niet zijn opgeleid om phishing te herkennen. Wij helpen u een realistische beveiligingsbasis op te bouwen voor uw grootte en budget: van veilige configuraties en back-ups tot endpoint-beveiliging, toegangscontrole en bewustwordingstraining. Als er iets misgaat, ondersteunen we u met incident response begeleiding zodat u het incident kunt beheersen, herstellen en ervan kunt leren.",
            fr: "La plupart des petites et moyennes entreprises ne sont pas prêtes pour un véritable incident cybernétique : mots de passe faibles, pas de sauvegardes, pas de plan clair et des employés non formés pour repérer le phishing. Nous vous aidons à construire une base de sécurité réaliste pour votre taille et votre budget : des configurations sécurisées et sauvegardes à la protection des terminaux, au contrôle d'accès et à la formation de sensibilisation. Si quelque chose ne va pas, nous vous soutenons avec des conseils de réponse aux incidents afin que vous puissiez contenir, récupérer et apprendre de l'événement."
        },
        whatWeDo: {
            en: [
                "Security Baseline Setup - Firewall, Antivirus, Wi-Fi security, Network segmentation",
                "Email & Phishing Protection - Advanced filtering, Phishing simulation, SPF/DKIM setup",
                "Backup & Recovery - Automated daily backups (3-2-1 rule), Disaster recovery planning",
                "Access Control & Authentication - MFA setup, Password management, Role-based access",
                "Monitoring & Incident Response - 24/7 threat monitoring, Security alert management",
                "Policy & Compliance - GDPR guidance, Security policy documentation, Employee training"
            ],
            nl: [
                "Beveiligingsbasis Setup - Firewall, Antivirus, Wi-Fi beveiliging, Netwerksegmentatie",
                "E-mail & Phishing Bescherming - Geavanceerde filtering, Phishing simulatie, SPF/DKIM setup",
                "Back-up & Herstel - Geautomatiseerde dagelijkse back-ups (3-2-1 regel), Disaster recovery planning",
                "Toegangscontrole & Authenticatie - MFA setup, Wachtwoordbeheer, Rolgebaseerde toegang",
                "Monitoring & Incident Response - 24/7 dreigingsmonitoring, Beveiligingsalertbeheer",
                "Beleid & Compliance - GDPR-begeleiding, Beveiligingsbeleidsdocumentatie, Werknemerstraining"
            ],
            fr: [
                "Configuration de Base de Sécurité - Pare-feu, Antivirus, Sécurité Wi-Fi, Segmentation réseau",
                "Protection Email & Phishing - Filtrage avancé, Simulation de phishing, Configuration SPF/DKIM",
                "Sauvegarde & Récupération - Sauvegardes quotidiennes automatisées (règle 3-2-1), Planification de reprise après sinistre",
                "Contrôle d'Accès & Authentification - Configuration MFA, Gestion des mots de passe, Accès basé sur les rôles",
                "Surveillance & Réponse aux Incidents - Surveillance des menaces 24/7, Gestion des alertes de sécurité",
                "Politique & Conformité - Conseils RGPD, Documentation de politique de sécurité, Formation des employés"
            ]
        },
        perfectFor: {
            en: [
                "Small Businesses (5-50 Employees) without an IT department",
                "Hotels & Restaurants needing to protect guest data",
                "Retail & E-commerce (PCI-DSS compliance)",
                "Professional Services (Legal, Accounting, Consulting)"
            ],
            nl: [
                "Kleine Bedrijven (5-50 Werknemers) zonder IT-afdeling",
                "Hotels & Restaurants die gastgegevens moeten beschermen",
                "Retail & E-commerce (PCI-DSS compliance)",
                "Professionele Diensten (Juridisch, Boekhouding, Consulting)"
            ],
            fr: [
                "Petites Entreprises (5-50 Employés) sans département IT",
                "Hôtels & Restaurants devant protéger les données des clients",
                "Détail & E-commerce (Conformité PCI-DSS)",
                "Services Professionnels (Juridique, Comptabilité, Conseil)"
            ]
        },
        ourProcess: [
            {
                title: { en: "Assessment", nl: "Beoordeling", fr: "Évaluation" },
                description: { en: "We evaluate your current security posture", nl: "We evalueren uw huidige beveiligingsstatus", fr: "Nous évaluons votre posture de sécurité actuelle" }
            },
            {
                title: { en: "Plan", nl: "Plan", fr: "Plan" },
                description: { en: "We create a tailored security plan for your budget", nl: "We maken een beveiligingsplan op maat voor uw budget", fr: "Nous créons un plan de sécurité sur mesure pour votre budget" }
            },
            {
                title: { en: "Implement", nl: "Implementeren", fr: "Mise en œuvre" },
                description: { en: "We set up the necessary protections and policies", nl: "We zetten de nodige beschermingen en beleidsregels op", fr: "Nous mettons en place les protections et politiques nécessaires" }
            },
            {
                title: { en: "Train", nl: "Trainen", fr: "Formation" },
                description: { en: "We train your staff to recognize threats", nl: "We trainen uw personeel om bedreigingen te herkennen", fr: "Nous formons votre personnel à reconnaître les menaces" }
            },
            {
                title: { en: "Support", nl: "Ondersteuning", fr: "Support" },
                description: { en: "We provide ongoing guidance and incident response", nl: "We bieden doorlopende begeleiding en incident response", fr: "Nous fournissons des conseils continus et une réponse aux incidents" }
            }
        ],
        results: {
            en: [
                "Reduced Breach Risk - 90% reduction in successful phishing attacks",
                "GDPR Compliance - Documentation and processes to meet legal requirements",
                "Business Continuity - Recover from disasters in hours, not days",
                "Employee Awareness - Staff trained to recognize and report threats",
                "Peace of Mind - 24/7 monitoring and rapid incident response",
                "Insurance Benefits - Lower cyber insurance premiums with proven security"
            ],
            nl: [
                "Verminderd Inbreukrisico - 90% vermindering van succesvolle phishing-aanvallen",
                "GDPR-naleving - Documentatie en processen om aan wettelijke vereisten te voldoen",
                "Bedrijfscontinuïteit - Herstel van rampen in uren, niet dagen",
                "Werknemersbewustzijn - Personeel getraind om bedreigingen te herkennen en te melden",
                "Gemoedsrust - 24/7 monitoring en snelle incident response",
                "Verzekeringsvoordelen - Lagere cyberverzekeringspremies met bewezen beveiliging"
            ],
            fr: [
                "Risque de Violation Réduit - Réduction de 90% des attaques de phishing réussies",
                "Conformité RGPD - Documentation et processus pour répondre aux exigences légales",
                "Continuité des Affaires - Récupération après sinistre en heures, pas en jours",
                "Sensibilisation des Employés - Personnel formé pour reconnaître et signaler les menaces",
                "Tranquillité d'Esprit - Surveillance 24/7 et réponse rapide aux incidents",
                "Avantages d'Assurance - Primes d'assurance cyber réduites avec une sécurité éprouvée"
            ]
        },
        realWorldExample: {
            en: "A retail business we protect was targeted by a ransomware attack. Our monitoring caught it within minutes, our backups were intact, and they were back online in 2 hours with zero data loss. Without our protection, they would have faced weeks of downtime and a €50,000+ ransom demand.",
            nl: "Een retailbedrijf dat we beschermen werd getroffen door een ransomware-aanval. Onze monitoring ving het binnen enkele minuten op, onze back-ups waren intact en ze waren binnen 2 uur weer online zonder gegevensverlies. Zonder onze bescherming hadden ze wekenlange downtime en een losgeldeis van €50.000+ gehad.",
            fr: "Une entreprise de vente au détail que nous protégeons a été ciblée par une attaque de ransomware. Notre surveillance l'a détectée en quelques minutes, nos sauvegardes étaient intactes et ils étaient de nouveau en ligne en 2 heures sans perte de données. Sans notre protection, ils auraient fait face à des semaines d'arrêt et à une demande de rançon de 50 000 €+."
        },
        investment: {
            en: "Basic Security Package (Small Businesses): Starting from €500/month. Comprehensive Security Package (Growing SMEs): Starting from €1,200/month. All packages include a free initial security assessment (€800 value).",
            nl: "Basis Beveiligingspakket (Kleine Bedrijven): Vanaf €500/maand. Uitgebreid Beveiligingspakket (Groeiende KMO's): Vanaf €1.200/maand. Alle pakketten zijn inclusief een gratis initiële beveiligingsbeoordeling (waarde €800).",
            fr: "Forfait Sécurité de Base (Petites Entreprises) : À partir de 500 €/mois. Forfait Sécurité Complet (PME en croissance) : À partir de 1 200 €/mois. Tous les forfaits incluent une évaluation de sécurité initiale gratuite (valeur 800 €)."
        },
        cta: {
            en: "Secure your business today - Contact us at info@fluxive.be or +32 472 92 57 41",
            nl: "Beveilig uw bedrijf vandaag nog - Neem contact op via info@fluxive.be of +32 472 92 57 41",
            fr: "Sécurisez votre entreprise dès aujourd'hui - Contactez-nous à info@fluxive.be ou au +32 472 92 57 41"
        }
    }
];
