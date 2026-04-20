// gloood-site/lib/content.ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies");

export type CaseStudyTag = "web" | "performance";

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  tags: CaseStudyTag[];
  year: number;
  publish_date?: string;
  hero_image: string;
  excerpt: string;
  metrics: { value: string; label: string }[];
  featured?: boolean;
  meta?: {
    industry?: string;
    location?: string;
    services?: string[];
    tech_stack?: string[];
    timeline?: string;
    team_size?: number;
    channels?: string[];
  };
  content: string;
};

export async function getCaseStudies(
  opts: { tag?: CaseStudyTag } = {}
): Promise<CaseStudy[]> {
  const files = await fs.readdir(CASE_STUDIES_DIR);
  const mdxFiles = files.filter(f => f.endsWith(".mdx"));
  const studies = await Promise.all(
    mdxFiles.map(async file => {
      const raw = await fs.readFile(path.join(CASE_STUDIES_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return { ...data, content } as CaseStudy;
    })
  );
  const sorted = studies.sort((a, b) => b.year - a.year);
  return opts.tag ? sorted.filter(s => s.tags.includes(opts.tag!)) : sorted;
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const all = await getCaseStudies();
  return all.find(s => s.slug === slug) ?? null;
}

const SERVICES_DIR = path.join(process.cwd(), "content/services");

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  includes: string[];
  deliverables: string[];
  faq: { q: string; a: string }[];
  content: string;
};

export async function getService(slug: string): Promise<Service | null> {
  try {
    const raw = await fs.readFile(path.join(SERVICES_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return { ...data, content } as Service;
  } catch {
    return null;
  }
}

export async function getAllServices(): Promise<Service[]> {
  const files = await fs.readdir(SERVICES_DIR);
  return Promise.all(
    files
      .filter(f => f.endsWith(".mdx"))
      .map(async f => (await getService(f.replace(/\.mdx$/, "")))!)
  );
}

const INSIGHTS_DIR = path.join(process.cwd(), "content/insights");

export type Insight = {
  slug: string;
  title: string;
  description: string;
  publish_date: string;
  author: string;
  tags: string[];
  reading_time: number;
  content: string;
};

export async function getInsights(): Promise<Insight[]> {
  const files = await fs.readdir(INSIGHTS_DIR);
  const out = await Promise.all(
    files.filter(f => f.endsWith(".mdx")).map(async file => {
      const raw = await fs.readFile(path.join(INSIGHTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return { ...data, content } as Insight;
    })
  );
  return out.sort((a, b) => b.publish_date.localeCompare(a.publish_date));
}

export async function getInsight(slug: string): Promise<Insight | null> {
  const all = await getInsights();
  return all.find(i => i.slug === slug) ?? null;
}

const INDUSTRIES_DIR = path.join(process.cwd(), "content/industries");

export type Industry = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keyword: string;
  case_study_slugs: string[];
  content: string;
};

export async function getIndustry(slug: string): Promise<Industry | null> {
  try {
    const raw = await fs.readFile(path.join(INDUSTRIES_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return { ...data, content } as Industry;
  } catch {
    return null;
  }
}

export async function getAllIndustries(): Promise<Industry[]> {
  const files = await fs.readdir(INDUSTRIES_DIR);
  return Promise.all(
    files
      .filter(f => f.endsWith(".mdx"))
      .map(async f => (await getIndustry(f.replace(/\.mdx$/, "")))!)
  );
}

const LOCATIONS_DIR = path.join(process.cwd(), "content/locations");

export type Location = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  keyword: string;
  intro: string;
  content: string;
};

export async function getLocation(slug: string): Promise<Location | null> {
  try {
    const raw = await fs.readFile(path.join(LOCATIONS_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return { ...data, content } as Location;
  } catch {
    return null;
  }
}

export async function getAllLocations(): Promise<Location[]> {
  const files = await fs.readdir(LOCATIONS_DIR);
  return Promise.all(
    files
      .filter(f => f.endsWith(".mdx"))
      .map(async f => (await getLocation(f.replace(/\.mdx$/, "")))!)
  );
}
