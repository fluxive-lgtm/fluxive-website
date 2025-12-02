"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { Mail, Phone, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Language = "nl" | "en" | "fr";

type ContactInfoItem = {
  id: "email" | "phone";
  icon: any;
  content: string;
  link: string;
};

const contactInfo: ContactInfoItem[] = [
  {
    id: "email",
    icon: Mail,
    content: "info@fluxive.be",
    link: "mailto:info@fluxive.be",
  },
  {
    id: "phone",
    icon: Phone,
    content: "+32 472 92 57 41",
    link: "tel:+32472925741",
  },
];

type ServiceOption = { value: string; label: string };

type ContactTexts = {
  headingPrefix: string;
  headingAccent: string;
  subheading: string;
  formTitle: string;

  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  companyLabel: string;
  serviceLabel: string;
  messageLabel: string;

  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  companyPlaceholder: string;
  messagePlaceholder: string;
  servicePlaceholder: string;

  serviceOptions: ServiceOption[];

  contactTitles: {
    email: string;
    phone: string;
  };

  businessHoursTitle: string;
  monFriLabel: string;
  monFriHours: string;
  satLabel: string;
  satHours: string;
  sunLabel: string;
  sunHours: string;

  toastSuccessTitle: string;
  toastSuccessDescription: string;
  toastErrorTitle: string;
  toastErrorDescription: string;

  sendLabel: string;
  sendingLabel: string;
};

const contactTexts: Record<Language, ContactTexts> = {
  en: {
    headingPrefix: "Get In",
    headingAccent: "Touch",
    subheading: "Ready to transform your business? Let's discuss your project.",
    formTitle: "Send Us a Message",

    nameLabel: "Name *",
    emailLabel: "Email *",
    phoneLabel: "Phone",
    companyLabel: "Company",
    serviceLabel: "Service *",
    messageLabel: "Message *",

    namePlaceholder: "John Doe",
    emailPlaceholder: "john@example.com",
    phonePlaceholder: "+32 472 92 57 41",
    companyPlaceholder: "Your Company",
    messagePlaceholder: "Tell us about your project...",
    servicePlaceholder: "Select a service",

    serviceOptions: [
      { value: "IT Services", label: "IT Services" },
      { value: "Marketing Solutions", label: "Marketing Solutions" },
      { value: "AI Automation", label: "AI Automation" },
      { value: "Web Development", label: "Web Development" },
      { value: "Penetration Testing", label: "Penetration Testing" },
      { value: "Cybersecurity", label: "Cybersecurity" },
    ],

    contactTitles: {
      email: "Email Us",
      phone: "Call Us",
    },

    businessHoursTitle: "Business Hours",
    monFriLabel: "Monday - Friday:",
    monFriHours: "9:00 AM - 6:00 PM",
    satLabel: "Saturday:",
    satHours: "10:00 AM - 4:00 PM",
    sunLabel: "Sunday:",
    sunHours: "Closed",

    toastSuccessTitle: "Message Sent! 🎉",
    toastSuccessDescription:
      "Thank you for contacting us. We'll get back to you within 24 hours.",
    toastErrorTitle: "Error",
    toastErrorDescription:
      "Something went wrong. Please try again.",

    sendLabel: "Send Message",
    sendingLabel: "Sending...",
  },

  nl: {
    headingPrefix: "Neem",
    headingAccent: "Contact op",
    subheading:
      "Klaar om je bedrijf te laten groeien? Laten we je project bespreken.",
    formTitle: "Stuur ons een bericht",

    nameLabel: "Naam *",
    emailLabel: "E-mail *",
    phoneLabel: "Telefoon",
    companyLabel: "Bedrijf",
    serviceLabel: "Service *",
    messageLabel: "Bericht *",

    namePlaceholder: "Jan Peeters",
    emailPlaceholder: "jan@example.com",
    phonePlaceholder: "+32 472 92 57 41",
    companyPlaceholder: "Jouw bedrijf",
    messagePlaceholder: "Vertel ons meer over je project...",
    servicePlaceholder: "Kies een service",

    serviceOptions: [
      { value: "IT Services", label: "IT-diensten" },
      { value: "Marketing Solutions", label: "Digitale marketing" },
      { value: "AI Automation", label: "AI-automatisatie" },
      { value: "Web Development", label: "Webontwikkeling" },
      { value: "Penetration Testing", label: "Penetratietesten" },
      { value: "Cybersecurity", label: "Cybersecurity" },
    ],

    contactTitles: {
      email: "E-mail",
      phone: "Bel ons",
    },

    businessHoursTitle: "Openingsuren",
    monFriLabel: "Maandag - vrijdag:",
    monFriHours: "09:00 - 18:00",
    satLabel: "Zaterdag:",
    satHours: "10:00 - 16:00",
    sunLabel: "Zondag:",
    sunHours: "Gesloten",

    toastSuccessTitle: "Bericht verzonden! 🎉",
    toastSuccessDescription:
      "Bedankt voor je bericht. We nemen binnen 24 uur contact met je op.",
    toastErrorTitle: "Fout",
    toastErrorDescription:
      "Er ging iets mis. Probeer het later opnieuw.",

    sendLabel: "Bericht verzenden",
    sendingLabel: "Verzenden...",
  },

  fr: {
    headingPrefix: "Prenez",
    headingAccent: "Contact",
    subheading:
      "Prêt à faire évoluer votre entreprise ? Parlons de votre projet.",
    formTitle: "Envoyez-nous un message",

    nameLabel: "Nom *",
    emailLabel: "E-mail *",
    phoneLabel: "Téléphone",
    companyLabel: "Entreprise",
    serviceLabel: "Service *",
    messageLabel: "Message *",

    namePlaceholder: "Jean Dupont",
    emailPlaceholder: "jean@example.com",
    phonePlaceholder: "+32 472 92 57 41",
    companyPlaceholder: "Votre entreprise",
    messagePlaceholder: "Parlez-nous de votre projet...",
    servicePlaceholder: "Choisissez un service",

    serviceOptions: [
      { value: "IT Services", label: "Services IT" },
      { value: "Marketing Solutions", label: "Marketing digital" },
      { value: "AI Automation", label: "Automatisation IA" },
      { value: "Web Development", label: "Développement web" },
      { value: "Penetration Testing", label: "Tests d’intrusion" },
      { value: "Cybersecurity", label: "Cybersécurité" },
    ],

    contactTitles: {
      email: "E-mail",
      phone: "Appelez-nous",
    },

    businessHoursTitle: "Heures d’ouverture",
    monFriLabel: "Lundi - vendredi :",
    monFriHours: "09:00 - 18:00",
    satLabel: "Samedi :",
    satHours: "10:00 - 16:00",
    sunLabel: "Dimanche :",
    sunHours: "Fermé",

    toastSuccessTitle: "Message envoyé ! 🎉",
    toastSuccessDescription:
      "Merci pour votre message. Nous vous répondrons dans les 24 heures.",
    toastErrorTitle: "Erreur",
    toastErrorDescription:
      "Une erreur s’est produite. Veuillez réessayer.",

    sendLabel: "Envoyer le message",
    sendingLabel: "Envoi en cours...",
  },
};

export default function Contact() {
  const { toast } = useToast();

  const langContext = useLanguage();
  const rawLang = (langContext?.language as Language) || "nl";
  const currentLang: Language =
    rawLang === "en" || rawLang === "fr" || rawLang === "nl" ? rawLang : "nl";

  const t = contactTexts[currentLang];

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone || "");
      formData.append("company", data.company || "");
      formData.append("service", data.service);
      formData.append("message", data.message);
      formData.append("lang", currentLang);
      // Honeypot (must be empty)
      formData.append("website", "");

      const response = await fetch("/contact-handler.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.ok) {
        setStatus("success");
        // Optional: still show toast or rely on the UI
        toast({
          title: t.toastSuccessTitle,
          description: t.toastSuccessDescription,
        });
        reset();
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      toast({
        variant: "destructive",
        title: t.toastErrorTitle,
        description: t.toastErrorDescription,
      });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {t.headingPrefix}{" "}
            <span className="gradient-text">{t.headingAccent}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.subheading}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-strong border-primary-500/30">
              <CardHeader>
                <CardTitle className="text-2xl font-display">
                  {t.formTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="flex flex-col items-center justify-center py-12 text-center space-y-6"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-5xl shadow-lg shadow-primary-500/30"
                    >
                      🚀
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold font-display gradient-text">
                        {t.toastSuccessTitle}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 max-w-xs mx-auto">
                        {t.toastSuccessDescription}
                      </p>
                    </div>
                    <Button
                      onClick={() => {
                        setStatus("idle");
                        reset();
                      }}
                      variant="outline"
                      className="mt-4 border-primary-500/30 hover:bg-primary-500/10"
                    >
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    suppressHydrationWarning
                  >
                    <div>
                      <Label htmlFor="name">{t.nameLabel}</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        autoComplete="name"
                        className="glass-card border-primary-500/20 mt-2"
                        placeholder={t.namePlaceholder}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">{t.emailLabel}</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        autoComplete="email"
                        className="glass-card border-primary-500/20 mt-2"
                        placeholder={t.emailPlaceholder}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">{t.phoneLabel}</Label>
                        <Input
                          id="phone"
                          {...register("phone")}
                          autoComplete="tel"
                          className="glass-card border-primary-500/20 mt-2"
                          placeholder={t.phonePlaceholder}
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">{t.companyLabel}</Label>
                        <Input
                          id="company"
                          {...register("company")}
                          autoComplete="organization"
                          className="glass-card border-primary-500/20 mt-2"
                          placeholder={t.companyPlaceholder}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="service">{t.serviceLabel}</Label>
                      <select
                        id="service"
                        {...register("service")}
                        suppressHydrationWarning
                        className="w-full h-10 rounded-md border border-primary-500/20 px-3 py-2 text-sm mt-2 
                                  bg-white dark:bg-black
                                  text-gray-900 dark:text-gray-100
                                  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
                                  transition-colors
                                  [&>option]:bg-white [&>option]:text-gray-900
                                  dark:[&>option]:bg-black dark:[&>option]:text-gray-100"
                      >
                        <option value="">{t.servicePlaceholder}</option>
                        {t.serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.service.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="message">{t.messageLabel}</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        className="glass-card border-primary-500/20 mt-2 min-h-[120px]"
                        placeholder={t.messagePlaceholder}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600"
                    >
                      {isSubmitting ? t.sendingLabel : t.sendLabel}
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const title =
                info.id === "email"
                  ? t.contactTitles.email
                  : t.contactTitles.phone;

              return (
                <motion.div
                  key={info.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="glass-card border-primary-500/20 hover:border-primary-500/40 transition-all group">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg mb-1">
                          {title}
                        </h3>
                        <a
                          href={info.link}
                          className="text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors"
                        >
                          {info.content}
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {/* Additional Info Card */}
            <Card className="glass-strong border-primary-500/30 mt-8">
              <CardContent className="p-8">
                <h3 className="text-2xl font-display font-bold mb-4 gradient-text">
                  {t.businessHoursTitle}
                </h3>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p className="flex justify-between">
                    <span>{t.monFriLabel}</span>
                    <span>{t.monFriHours}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>{t.satLabel}</span>
                    <span>{t.satHours}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>{t.sunLabel}</span>
                    <span>{t.sunHours}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
