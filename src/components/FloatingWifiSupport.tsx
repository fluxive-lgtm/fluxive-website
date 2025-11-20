"use client";

import { Wifi } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Lang = "nl" | "en" | "fr";

const labels: Record<Lang, string> = {
  en: "24/7 Wi-Fi Support",
  nl: "24/7 Wi-Fi Support",
  fr: "Support Wi-Fi 24/7",
};

export function FloatingWifiSupport() {
  const context = useLanguage();
  const language = context?.language || "en";
  const lang: Lang = ["nl", "en", "fr"].includes(language as string)
    ? (language as Lang)
    : "en";

  const label = labels[lang];

  return (
    <button
      onClick={() => (window.location.href = "/wifi-support")}
      className="
        fixed
        bottom-6 left-6    /* 👈 BOTTOM-LEFT POSITION */
        z-50
        bg-gradient-to-r from-primary-500 to-secondary-500
        text-white 
        px-5 py-4 
        rounded-full 
        shadow-lg shadow-primary-500/40 
        flex items-center gap-2
        hover:scale-105 transition-transform 
        focus:outline-none focus:ring-2 focus:ring-primary-500
      "
    >
      <Wifi className="w-5 h-5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
