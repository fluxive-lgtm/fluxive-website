"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

export default function NewsletterSignup() {
    const context = useLanguage();
    const language = context?.language || "en";
    const { toast } = useToast();

    const [email, setEmail] = useState("");
    const [honeypot, setHoneypot] = useState(""); // Hidden field for spam protection
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const content = {
        en: {
            title: "Get IT & Marketing Tips Delivered to Your Inbox",
            description: "Join 500+ Belgian business owners receiving monthly guides on Wi-Fi, SEO, and technology. No spam, just value.",
            placeholder: "your@email.com",
            button: "Subscribe",
            disclaimer: "Unsubscribe at any time.",
            success: "Thanks for subscribing!",
            error: "Something went wrong. Please try again.",
            subscribing: "Subscribing..."
        },
        nl: {
            title: "Ontvang IT & Marketing Tips in uw Inbox",
            description: "Sluit u aan bij 500+ Belgische ondernemers die maandelijkse gidsen ontvangen over Wi-Fi, SEO en technologie. Geen spam, alleen waarde.",
            placeholder: "uw@email.com",
            button: "Abonneren",
            disclaimer: "Uitschrijven kan op elk moment.",
            success: "Bedankt voor het abonneren!",
            error: "Er is iets misgegaan. Probeer het opnieuw.",
            subscribing: "Aanmelden..."
        },
        fr: {
            title: "Recevez des Conseils IT & Marketing dans votre Boîte de Réception",
            description: "Rejoignez 500+ chefs d'entreprise belges qui reçoivent des guides mensuels sur le Wi-Fi, le SEO et la technologie. Pas de spam, juste de la valeur.",
            placeholder: "votre@email.com",
            button: "S'abonner",
            disclaimer: "Désabonnement à tout moment.",
            success: "Merci de vous être abonné !",
            error: "Une erreur s'est produite. Veuillez réessayer.",
            subscribing: "Inscription..."
        }
    };

    const t = content[language];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus("idle");
        setMessage("");

        try {
            const fd = new FormData();
            fd.append("email", email);
            fd.append("website_url", honeypot); // Honeypot

            const response = await fetch("/api/newsletter.php", {
                method: "POST",
                body: fd,
            });

            // Handle non-JSON responses (e.g., if PHP fails hard)
            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error("Invalid JSON response:", text);
                throw new Error(t.error);
            }

            if (!response.ok || !data.ok) {
                throw new Error(data.error || t.error);
            }

            setStatus("success");
            setMessage(t.success);
            setEmail("");
            toast({
                title: t.success,
                description: t.success,
                variant: "default",
            });

        } catch (error: any) {
            setStatus("error");
            setMessage(error.message);
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-accent-500" />

                    <div className="relative z-10">
                        <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
                            {status === "success" ? (
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            ) : (
                                <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                            )}
                        </div>

                        <h2 className="text-3xl font-bold font-display mb-4">
                            {t.title}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            {t.description}
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative" onSubmit={handleSubmit}>
                            {/* Honeypot Field - Hidden from users */}
                            <input
                                type="text"
                                name="website_url"
                                value={honeypot}
                                onChange={(e) => setHoneypot(e.target.value)}
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            <div className="relative flex-grow">
                                <Input
                                    type="email"
                                    placeholder={t.placeholder}
                                    className="h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 w-full"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading || status === "success"}
                                />
                            </div>
                            <Button
                                type="submit"
                                size="lg"
                                className="h-12 rounded-xl px-8 font-bold min-w-[140px]"
                                disabled={isLoading || status === "success"}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {t.subscribing}
                                    </>
                                ) : status === "success" ? (
                                    "Subscribed"
                                ) : (
                                    t.button
                                )}
                            </Button>
                        </form>

                        {status === "error" && (
                            <p className="text-red-500 mt-4 flex items-center justify-center gap-2">
                                <AlertCircle className="w-4 h-4" /> {message}
                            </p>
                        )}

                        <p className="text-xs text-gray-400 mt-4">
                            {t.disclaimer}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
