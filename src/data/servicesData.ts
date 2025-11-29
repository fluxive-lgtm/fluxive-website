import { Server, TrendingUp, Bot, Code, Shield, Lock } from "lucide-react";

export interface ServiceData {
    id: string;
    title: string;
    icon: any;
    heroHeading: string;
    subheading: string;
    fullDescription: string;
    whatWeDo: string[];
    perfectFor: string[];
    ourProcess: { title: string; description: string }[];
    results: string[];
    investment: string;
    cta: string;
    caseStudy?: string;
    featuredWork?: string;
    realWorldExample?: string;
    whyThisMatters?: string;
    color: string;
    bgColor: string;
    borderColor: string;
}

export const servicesData: ServiceData[] = [
    {
        id: "it-wifi",
        title: "IT Services & Wi-Fi Solutions",
        icon: Server,
        color: "from-cyan-500 to-blue-500",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30",
        heroHeading: "Professional Network & Wi-Fi Infrastructure That Keeps Your Business Running",
        subheading: "Eliminate dead zones, boost productivity, and keep guests satisfied with enterprise-grade Wi-Fi designed for high-traffic environments.",
        fullDescription: "Poor Wi-Fi isn't just frustrating—it's costing you money. Guest complaints, bad reviews, lost bookings, and unproductive staff all stem from inadequate network infrastructure. At Fluxive, we design and maintain stable, scalable Wi-Fi solutions specifically for hotels, restaurants, offices, and growing SMEs across Belgium.",
        whatWeDo: [
            "Hotel & restaurant Wi-Fi installation - Complete network design or upgrade your existing system",
            "Eliminate Wi-Fi dead zones - Strategic placement of commercial-grade access points for 100% coverage",
            "Guest Wi-Fi & business network separation - Keep customer data secure while providing fast guest access",
            "24/7 network monitoring & support - We fix issues before your guests complain",
            "Future-proof infrastructure - Scalable systems that handle peak traffic (conferences, full bookings, dinner rush)"
        ],
        perfectFor: [
            "Hotels with guest complaints about Wi-Fi coverage or speed",
            "Restaurants needing reliable POS and guest Wi-Fi",
            "Offices with 10+ employees experiencing slow connectivity",
            "Any business where internet downtime = lost revenue"
        ],
        ourProcess: [
            { title: "Free site survey", description: "We map your current coverage and identify problem areas" },
            { title: "Custom network design", description: "Tailored to your building layout and user density" },
            { title: "Professional installation", description: "Commercial-grade equipment, proper cabling, optimal placement" },
            { title: "Testing & optimization", description: "We verify coverage in every corner" },
            { title: "Ongoing support", description: "Monitoring, updates, and rapid response when you need us" }
        ],
        results: [
            "Zero dead zones throughout your property",
            "10-15 Mbps per user minimum (with 25-30% buffer)",
            "Reduced guest complaints and improved online reviews",
            "Higher staff productivity with reliable connectivity",
            "Peace of mind with enterprise-level security"
        ],
        investment: "Projects start from €2,500 depending on property size, number of access points needed, and complexity. Each solution is custom-quoted based on your specific requirements.",
        cta: "Get your free Wi-Fi site survey today (€500 value) - Contact us at info@fluxive.be or +32 472 92 57 41"
    },
    {
        id: "marketing",
        title: "Digital Marketing & Google Maps",
        icon: TrendingUp,
        color: "from-teal-500 to-cyan-500",
        bgColor: "bg-teal-500/10",
        borderColor: "border-teal-500/30",
        heroHeading: "Get Found on Google. Get More Direct Bookings. Keep More Revenue.",
        subheading: "Stop losing customers to competitors and paying high commissions to booking platforms. Dominate local search with our proven digital marketing strategies.",
        fullDescription: "80% of customers search on Google before choosing a hotel or restaurant. If you're not showing up on Google Maps and local search results, you're invisible—and your competitors are taking your customers. Worse, if you're relying entirely on Booking.com or TripAdvisor, you're paying 15-25% commissions on every booking.\n\nFluxive specializes in local SEO and digital marketing for hospitality and service businesses. We help you rank higher, get more reviews, and drive direct bookings that keep more money in your pocket.",
        whatWeDo: [
            "Google Business Profile optimization - Rank higher on Google Maps for \"hotel in [your city]\" and \"restaurant near me\" searches",
            "Local SEO for hospitality businesses - Get found by customers searching for accommodations and dining in your area",
            "Review generation & reputation management - Earn more 5-star reviews and respond professionally to all feedback",
            "Content marketing that ranks - Blog posts and location pages that bring organic traffic and direct bookings",
            "Reduce Booking.com dependency - Drive more direct bookings through your website and save 15-25% in commissions",
            "Monthly performance reports - Track rankings, reviews, website traffic, and booking sources"
        ],
        perfectFor: [
            "Hotels and restaurants with poor Google Maps visibility",
            "Businesses with fewer than 20 Google reviews",
            "Anyone paying high commissions to booking platforms",
            "Service businesses that rely on local customers",
            "Companies that want measurable marketing ROI"
        ],
        ourProcess: [
            { title: "Free SEO audit", description: "We analyze your current Google presence and identify opportunities" },
            { title: "Strategy development", description: "Custom plan based on your goals, competition, and budget" },
            { title: "Implementation", description: "We optimize your profiles, build citations, and create content" },
            { title: "Review generation", description: "Systematic approach to earning more 5-star reviews" },
            { title: "Ongoing optimization", description: "Monthly monitoring, reporting, and continuous improvement" }
        ],
        results: [
            "Higher rankings on Google Maps and local search",
            "3-5x more Google reviews within 6 months",
            "Increased direct bookings and phone calls",
            "Reduced dependency on expensive booking platforms",
            "Clear ROI tracking with monthly reports"
        ],
        caseStudy: "Hotel Koffieboontje saw a 40% increase in direct bookings within 4 months of working with Fluxive, reducing their Booking.com dependency and saving thousands in commissions.",
        investment: "Marketing services start from €800/month. Packages are customized based on your market competition, goals, and the scope of services required.",
        cta: "Get your free SEO audit and Google visibility report - Contact us at info@fluxive.be or +32 472 92 57 41"
    },
    {
        id: "ai-automation",
        title: "AI Automation & Custom Chatbots",
        icon: Bot,
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30",
        heroHeading: "Automate Customer Service. Capture More Leads. Never Miss an Opportunity.",
        subheading: "Save hours every week with AI-powered chatbots and smart workflows that handle inquiries, bookings, and follow-ups—even while you sleep.",
        fullDescription: "How many potential customers have you lost because you couldn't respond fast enough? How many hours does your team waste answering the same questions over and over? In today's fast-paced world, customers expect instant responses—and if they don't get them, they move on to your competitor.\n\nFluxive builds custom AI chatbots and automation workflows that handle routine tasks, qualify leads, answer FAQs, and even process bookings—24/7, without human intervention. This isn't generic chatbot software; these are tailored solutions built specifically for your business processes.",
        whatWeDo: [
            "AI chatbots for hotels & restaurants - Human-like conversations that handle inquiries 24/7, even when you're closed",
            "Automated booking & reservation handling - Capture reservation requests, check availability, and send confirmations instantly",
            "Never miss a lead again - Respond to inquiries in seconds, not hours—capture customers before they contact competitors",
            "FAQ automation for hospitality - Instant answers to \"What are your hours?\", \"Do you have parking?\", \"What's your cancellation policy?\"",
            "Save 5-10 hours per week - Reduce time spent on repetitive customer questions and phone calls",
            "Multi-language support - Serve Belgian customers in Dutch, French, and English automatically",
            "Integration with booking systems - Connect to your existing reservation software and CRM"
        ],
        perfectFor: [
            "Hotels and restaurants receiving high volumes of booking inquiries",
            "Service businesses that get the same questions repeatedly",
            "Companies that lose leads outside business hours",
            "Businesses wanting to scale customer service without hiring more staff",
            "Anyone spending 10+ hours/week on routine customer communication"
        ],
        ourProcess: [
            { title: "Discovery session", description: "We map your customer journey and identify automation opportunities" },
            { title: "Custom chatbot design", description: "Built around your specific FAQs, booking process, and brand voice" },
            { title: "Integration & testing", description: "We connect to your website, CRM, and booking systems" },
            { title: "Training & optimization", description: "We teach the AI to handle your specific scenarios" },
            { title: "Ongoing improvement", description: "Monthly reviews and updates based on real conversations" }
        ],
        results: [
            "80% of routine inquiries handled automatically",
            "Instant responses 24/7 (even weekends and holidays)",
            "3-5 hours saved per week on customer communication",
            "Higher lead conversion (no more missed opportunities)",
            "Better customer experience with immediate answers"
        ],
        realWorldExample: "A restaurant using our chatbot reduced phone interruptions by 60% during dinner service, while capturing 40% more reservation requests after hours.",
        investment: "Custom chatbot projects start from €2,000 depending on complexity, integrations needed, and the number of workflows. Monthly maintenance and hosting fees apply based on usage volume.",
        cta: "Schedule a free automation consultation to see how much time and money you could save - Contact us at info@fluxive.be or +32 472 92 57 41"
    },
    {
        id: "web-design",
        title: "Modern Web Design & Development",
        icon: Code,
        color: "from-cyan-500 to-teal-500",
        bgColor: "bg-cyan-500/10",
        borderColor: "border-cyan-500/30",
        heroHeading: "Lightning-Fast Websites That Convert Visitors Into Customers",
        subheading: "Your website is your 24/7 salesperson. Make sure it's working hard with a modern, mobile-optimized site built for conversions, not just looks.",
        fullDescription: "Your website has 3 seconds to make an impression. If it's slow, outdated, or confusing, visitors leave—and they're not coming back. In today's mobile-first world, your website needs to load instantly, look stunning on every device, and guide visitors toward booking, calling, or contacting you.\n\nFluxive builds modern, high-performance websites specifically for hotels, restaurants, and service businesses. We don't just make pretty designs—we create conversion machines that turn traffic into revenue.",
        whatWeDo: [
            "Hotel & restaurant website design - Custom sites that showcase your property and convert visitors into bookings",
            "Lightning-fast loading (under 2 seconds) - Google rewards speed with higher rankings; guests reward it with bookings",
            "Mobile-optimized for on-the-go bookings - 70% of hotel searches happen on phones—your site must work perfectly on mobile",
            "Conversion-focused design - Strategic booking buttons, clear CTAs, and friction-free reservation forms that increase bookings by 30-50%",
            "Built-in SEO from day one - Proper technical structure so Google can find and rank your pages immediately",
            "Direct booking system integration - Connect to your reservation software, reduce OTA dependency, keep more revenue",
            "Easy to update yourself - Change menus, prices, photos, and promotions without calling a developer",
            "Secure hosting included - Fast Belgian servers, SSL certificates, daily backups, and 99.9% uptime guarantee"
        ],
        perfectFor: [
            "Businesses with outdated websites (3+ years old)",
            "Hotels and restaurants with slow-loading or non-mobile-friendly sites",
            "Companies with high traffic but low conversion rates",
            "Anyone embarrassed to share their website URL",
            "Businesses launching new services or rebranding"
        ],
        ourProcess: [
            { title: "Discovery & strategy", description: "We understand your business, goals, and target customers" },
            { title: "Design mockups", description: "You see exactly what your site will look like before we build" },
            { title: "Development", description: "We build with modern frameworks (fast, secure, scalable)" },
            { title: "Content creation", description: "Professional copywriting and image optimization" },
            { title: "Testing & launch", description: "We verify everything works perfectly on all devices" },
            { title: "Training & support", description: "We teach you how to manage your site and provide ongoing support" }
        ],
        results: [
            "Professional, modern design that builds trust instantly",
            "2-3x faster loading speed (better Google rankings and user experience)",
            "30-50% higher conversion rates with optimized user flows",
            "Mobile traffic that actually converts (not just bounces)",
            "SEO-ready foundation for long-term organic growth"
        ],
        featuredWork: "Check out hotel-koffieboontje.be - a modern, fast-loading site that increased their direct bookings by 40% and reduced bounce rate by 35%.",
        investment: "Website projects start from €3,000 for small business sites. The final investment depends on the number of pages, custom features, integrations, and content requirements. Optional monthly maintenance packages available.",
        cta: "Get a free website audit and conversion analysis - Contact us at info@fluxive.be or +32 472 92 57 41"
    },
    {
        id: "pentest",
        title: "Penetration Testing",
        icon: Shield,
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
        heroHeading: "Find Your Security Vulnerabilities Before Hackers Do",
        subheading: "Professional penetration testing—normally reserved for Fortune 500 companies—now accessible for Belgian SMEs. Protect your business, customers, and reputation.",
        fullDescription: "61% of cyberattacks target small and medium-sized businesses. Why? Because hackers know SMEs have valuable data but weak security. One successful attack can mean stolen customer data, ransomware demands, regulatory fines, and destroyed reputation. The average cost of a data breach for SMEs is €200,000—many never recover.\n\nPenetration testing (ethical hacking) is how you find security holes before criminals exploit them. Fluxive offers professional penetration testing services typically only available to large corporations—but at prices SMEs can afford.",
        whatWeDo: [
            "Security testing for hotels & restaurants - Find vulnerabilities in your website, booking system, and customer databases before hackers do",
            "Protect guest payment data - Test for weaknesses that could expose credit card information and lead to massive fines",
            "GDPR compliance verification - Ensure your systems meet Belgian and EU data protection requirements",
            "Prevent data breaches that cost €200,000+ on average - One breach can destroy an SME; we find and fix holes before criminals exploit them",
            "Employee phishing tests - See if your staff would fall for fake emails that steal passwords and customer data",
            "Clear, non-technical reports - We explain what's wrong in plain language and exactly how to fix it",
            "Fix-it support included - We don't just find problems—we help you solve them (or do it for you)"
        ],
        perfectFor: [
            "Hotels and restaurants handling customer payment data",
            "Any business with an online booking or e-commerce system",
            "Companies storing sensitive customer information",
            "Businesses required to meet GDPR compliance",
            "Organizations that have never had a professional security assessment",
            "Anyone who wants to sleep better knowing their systems are secure"
        ],
        ourProcess: [
            { title: "Scoping session", description: "We define what systems to test and what's in/out of scope" },
            { title: "Reconnaissance", description: "We gather information about your systems (like a real attacker would)" },
            { title: "Vulnerability scanning", description: "Automated tools identify potential weak points" },
            { title: "Manual exploitation", description: "Our experts attempt to exploit vulnerabilities ethically" },
            { title: "Detailed reporting", description: "You get a comprehensive report with findings and recommendations" },
            { title: "Remediation guidance", description: "We explain how to fix each issue (or fix them for you)" },
            { title: "Re-testing", description: "We verify fixes at no extra charge" }
        ],
        results: [
            "Complete visibility into your security posture",
            "Prioritized list of vulnerabilities (critical to low risk)",
            "Clear action plan for improving security",
            "Compliance documentation for GDPR and industry standards",
            "Peace of mind knowing you're protected",
            "Competitive advantage (you can advertise \"security tested\")"
        ],
        whyThisMatters: "One hotel we tested had a critical vulnerability that could have exposed all guest credit card data. We found it, they fixed it, and they avoided what could have been a business-ending breach.",
        investment: "Penetration testing starts from €2,000 for basic website security assessments. Pricing varies based on the scope (number of systems), complexity, and depth of testing required. Annual re-testing packages available.",
        cta: "Get a free security assessment consultation to understand your risk level - Contact us at info@fluxive.be or +32 472 92 57 41"
    },
    {
        id: "cyber",
        title: "Cybersecurity & Protection",
        icon: Lock,
        color: "from-red-500 to-pink-500",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        heroHeading: "End-to-end security for small and medium businesses",
        subheading: "Without enterprise-level complexity.",
        fullDescription: "Most small and medium businesses are not ready for a real cyber incident: weak passwords, no backups, no clear plan, and employees who are not trained to spot phishing. We help you build a realistic security baseline for your size and budget: from secure configurations and backups to endpoint protection, access control and awareness training. If something goes wrong, we support you with incident response guidance so you can contain, recover and learn from the event.",
        whatWeDo: [
            "Baseline Security for SMEs",
            "Email & Phishing Protection",
            "Incident Response Guidance",
            "Policies, Backups & Best Practices"
        ],
        perfectFor: [
            "Small and medium businesses",
            "Companies with remote workers",
            "Businesses handling sensitive client data",
            "Organizations without a dedicated security team"
        ],
        ourProcess: [
            { title: "Assessment", description: "We evaluate your current security posture" },
            { title: "Plan", description: "We create a tailored security plan for your budget" },
            { title: "Implement", description: "We set up the necessary protections and policies" },
            { title: "Train", description: "We train your staff to recognize threats" },
            { title: "Support", description: "We provide ongoing guidance and incident response" }
        ],
        results: [
            "Reduced risk of cyber attacks",
            "Data protection and compliance",
            "Employee awareness and readiness",
            "Business continuity assurance"
        ],
        investment: "Contact us for a custom quote based on your business size and needs.",
        cta: "Secure your business today - Contact us"
    }
];
