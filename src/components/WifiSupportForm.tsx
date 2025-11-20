"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Wifi, Send, X } from "lucide-react";

type Lang = "nl" | "en" | "fr";

type TextContent = {
  pageTitle: string;
  pageSubtitle: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  issueType: string;
  urgency: string;
  message: string;
  issueWifiDown: string;
  issueSlow: string;
  issueCoverage: string;
  issueOther: string;
  urgNow: string;
  urg24h: string;
  urgWeek: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  close: string;
};

const texts: Record<Lang, TextContent> = {
  en: {
    pageTitle: "Wi-Fi Support",
    pageSubtitle: "Describe your Wi-Fi problem and we will contact you.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    company: "Company (optional)",
    location: "Location (room / office)",
    issueType: "Issue type",
    urgency: "Urgency",
    message: "Describe the problem",
    issueWifiDown: "Wi-Fi / Internet down",
    issueSlow: "Slow Wi-Fi",
    issueCoverage: "Coverage problem (some rooms)",
    issueOther: "Other",
    urgNow: "Now / urgent",
    urg24h: "Within 24h",
    urgWeek: "This week",
    submit: "Submit request",
    sending: "Sending...",
    success:
      "Request saved. We will contact you soon. This window will close automatically.",
    error: "Something went wrong. Please try again.",
    close: "Close",
  },
  nl: {
    pageTitle: "Wi-Fi Support",
    pageSubtitle: "Beschrijf je Wi-Fi probleem, wij nemen contact op.",
    name: "Naam",
    email: "E-mail",
    phone: "Telefoon",
    company: "Bedrijf (optioneel)",
    location: "Locatie (kamer / kantoor)",
    issueType: "Probleemtype",
    urgency: "Urgentie",
    message: "Beschrijf het probleem",
    issueWifiDown: "Wi-Fi / internet werkt niet",
    issueSlow: "Trage Wi-Fi",
    issueCoverage: "Bereikprobleem (sommige ruimtes)",
    issueOther: "Anders",
    urgNow: "Nu / dringend",
    urg24h: "Binnen 24u",
    urgWeek: "Deze week",
    submit: "Verzoek versturen",
    sending: "Verzenden...",
    success:
      "Aanvraag opgeslagen. We nemen snel contact op. Dit venster wordt automatisch gesloten.",
    error: "Er ging iets mis. Probeer opnieuw.",
    close: "Sluiten",
  },
  fr: {
    pageTitle: "Assistance Wi-Fi",
    pageSubtitle: "Décrivez votre problème Wi-Fi, nous vous contacterons.",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    company: "Société (optionnel)",
    location: "Lieu (chambre / bureau)",
    issueType: "Type de problème",
    urgency: "Urgence",
    message: "Décrivez le problème",
    issueWifiDown: "Wi-Fi / Internet coupé",
    issueSlow: "Wi-Fi lent",
    issueCoverage: "Problème de couverture (certaines pièces)",
    issueOther: "Autre",
    urgNow: "Maintenant / urgent",
    urg24h: "Sous 24h",
    urgWeek: "Cette semaine",
    submit: "Envoyer la demande",
    sending: "Envoi...",
    success:
      "Demande enregistrée. Nous vous contacterons bientôt. Cette fenêtre se fermera automatiquement.",
    error: "Une erreur est survenue. Veuillez réessayer.",
    close: "Fermer",
  },
};

export function WifiSupportForm() {
  const langContext = useLanguage();
  const router = useRouter();

  const current = langContext?.language as Lang | undefined;
  const lang: Lang =
    current === "en" || current === "fr" || current === "nl" ? current : "nl";
  const t = texts[lang];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
    issueType: "Wi-Fi / Internet down",
    urgency: "now",
    message: "",
    website: "", // 👈 honeypot field for anti-spam
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const handleChange =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const handleClose = () => {
    // client-side navigation so language context is preserved
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("company", form.company);
      fd.append("location", form.location);
      fd.append("issueType", form.issueType);
      fd.append("urgency", form.urgency);
      fd.append("message", form.message);
      fd.append("lang", lang);
      fd.append("website", form.website); // 👈 honeypot

      const res = await fetch("/wifi-support-handler.php", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "failed");

      setStatus("ok");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        location: "",
        issueType: "Wi-Fi / Internet down",
        urgency: "now",
        message: "",
        website: "",
      });

      // ✅ Auto-close after short delay (2.5s)
      setTimeout(() => {
        handleClose();
      }, 2500);
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-display font-bold flex items-center justify-center gap-2">
          <Wifi className="w-7 h-7" />
          {t.pageTitle}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          {t.pageSubtitle}
        </p>
      </div>

      {/* Form card */}
      <Card className="glass-card border-primary-500/30 max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>{t.pageTitle}</CardTitle>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label={t.close}
            className="rounded-full p-1.5 border border-border hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Honeypot field - hidden from real users */}
            <input
              type="text"
              name="website"
              autoComplete="off"
              value={form.website}
              onChange={handleChange("website")}
              className="hidden"
            />

            {/* Row 1: Name + Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>{t.name}</Label>
                <Input
                  value={form.name}
                  onChange={handleChange("name")}
                  required
                />
              </div>
              <div>
                <Label>{t.email}</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                />
              </div>
            </div>

            {/* Row 2: Phone + Company */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>{t.phone}</Label>
                <Input
                  value={form.phone}
                  onChange={handleChange("phone")}
                />
              </div>
              <div>
                <Label>{t.company}</Label>
                <Input
                  value={form.company}
                  onChange={handleChange("company")}
                />
              </div>
            </div>

            {/* Row 3: Location + Issue type */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>{t.location}</Label>
                <Input
                  value={form.location}
                  onChange={handleChange("location")}
                />
              </div>
              <div>
                <Label>{t.issueType}</Label>
                <select
                  className="w-full h-10 rounded-md border bg-background px-3"
                  value={form.issueType}
                  onChange={handleChange("issueType")}
                >
                  <option value="Wi-Fi / Internet down">
                    {t.issueWifiDown}
                  </option>
                  <option value="Slow Wi-Fi">{t.issueSlow}</option>
                  <option value="Coverage problem">
                    {t.issueCoverage}
                  </option>
                  <option value="Other">{t.issueOther}</option>
                </select>
              </div>
            </div>

            {/* Row 4: Urgency */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>{t.urgency}</Label>
                <select
                  className="w-full h-10 rounded-md border bg-background px-3"
                  value={form.urgency}
                  onChange={handleChange("urgency")}
                >
                  <option value="now">{t.urgNow}</option>
                  <option value="24h">{t.urg24h}</option>
                  <option value="week">{t.urgWeek}</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <Label>{t.message}</Label>
              <Textarea
                rows={5}
                value={form.message}
                onChange={handleChange("message")}
                required
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" disabled={loading} className="min-w-40">
                <Send className="w-4 h-4 mr-2" />
                {loading ? t.sending : t.submit}
              </Button>

              {status === "ok" && (
                <p className="text-sm text-green-600">{t.success}</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">{t.error}</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
