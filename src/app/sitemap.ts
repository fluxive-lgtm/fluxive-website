import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fluxive.be";

    return [
        "",
        "/services",
        "/our-work",
        "/case-studies",
        "/blog",
        "/wifi-support",
        "/review",
        "/contact",
        "/privacy",
        "/terms",
        "/cookies",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1.0 : 0.8,
    }));
}
