import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://fluxive.com";

    const routes = [
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
        lastModified: new Date("2025-01-01"),
        changeFrequency: "monthly" as const,
        priority: route === "" ? 1.0 : 0.8,
    }));

    return routes;
}
