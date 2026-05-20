import type { MetadataRoute } from "next";

const BASE_URL = "https://phantasia.cl";
const LOCALES = ["es", "en", "fr"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "es" ? 1 : 0.8,
  }));
}
