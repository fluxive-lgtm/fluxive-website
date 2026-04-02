"use client";

import { Wifi } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

type Lang = "nl" | "en" | "fr";

const labels: Record<Lang, string> = {
  en: "24/7 Wi-Fi Support",
  nl: "24/7 Wi-Fi-support",
  fr: "Support Wi-Fi 24h/24",
};

export function FloatingWifiSupport() {
  const context = useLanguage();
  const language = context?.language ?? "nl";
  const router = useRouter();

  const lang: Lang =
    (language as Lang) === "en" ||
      (language as Lang) === "fr" ||
      (language as Lang) === "nl"
      ? (language as Lang)
      : "nl";

  const label = labels[lang];

  const handleClick = () => {
    // ✅ Client-side navigation, does NOT reload the page
    router.push("/wifi-support");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="
        fixed
        bottom-6 left-6
        z-50
        bg-[#5DDB89] hover:bg-[#4bc978]
        text-white
        font-medium
        px-6 py-3
        rounded-full
        shadow-lg shadow-green-500/20
        flex items-center gap-2
        hover:scale-105 transition-all
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
      "
    >
      <Wifi className="w-5 h-5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
