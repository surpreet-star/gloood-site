import type { MetadataRoute } from "next";
import { getCaseStudies } from "@/lib/content";

const BASE = "https://gloood.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const studies = await getCaseStudies();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/services/website-design`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/performance-ads`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/launch-grow`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/revamp`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const studyRoutes: MetadataRoute.Sitemap = studies.map(s => ({
    url: `${BASE}/work/${s.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...studyRoutes];
}
