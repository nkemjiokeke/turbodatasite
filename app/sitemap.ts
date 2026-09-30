import type { MetadataRoute } from "next"
import { site } from "@/lib/site"
import { services } from "@/lib/services"
import { articles } from "@/lib/insights"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/services", "/who-we-help", "/how-it-works", "/about", "/insights", "/contact", "/privacy"]
  return [
    ...staticPaths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...articles.map((a) => ({ url: `${site.url}/insights/${a.slug}`, lastModified: a.date, priority: 0.6 })),
  ]
}
