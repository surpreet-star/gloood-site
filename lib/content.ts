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
  hero_image: string;
  excerpt: string;
  metrics: { value: string; label: string }[];
  featured?: boolean;
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
