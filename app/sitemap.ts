import type { MetadataRoute } from "next";
import { getCaseStudies, getInsights, getAllIndustries, getAllLocations } from "@/lib/content";

const BASE = "https://gloood.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [studies, insights, industries, locations] = await Promise.all([
    getCaseStudies(),
    getInsights(),
    getAllIndustries(),
    getAllLocations(),
  ]);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/work`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
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

  const insightRoutes: MetadataRoute.Sitemap = insights.map(i => ({
    url: `${BASE}/insights/${i.slug}`,
    lastModified: new Date(i.publish_date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const industryRoutes: MetadataRoute.Sitemap = industries.map(x => ({
    url: `${BASE}/industries/${x.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const locationRoutes: MetadataRoute.Sitemap = locations.map(x => ({
    url: `${BASE}/locations/${x.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...studyRoutes, ...insightRoutes, ...industryRoutes, ...locationRoutes];
}
