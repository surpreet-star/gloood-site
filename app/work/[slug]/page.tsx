import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getCaseStudy, getCaseStudies } from "@/lib/content";
import { CTASection } from "@/components/site/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = "https://gloood.in";

export async function generateStaticParams() {
  const all = await getCaseStudies();
  return all.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getCaseStudy(slug);
  if (!s) return {};
  const og = `${SITE_URL}/api/og?title=${encodeURIComponent(s.title)}&eyebrow=${encodeURIComponent(`${s.client} · ${s.year}`)}&subtitle=${encodeURIComponent(s.excerpt)}`;
  return {
    title: s.title,
    description: s.excerpt,
    authors: [{ name: "gloood" }],
    alternates: { canonical: `/work/${s.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/work/${s.slug}`,
      title: s.title,
      description: s.excerpt,
      images: [{ url: og, width: 1200, height: 630, alt: s.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: s.title,
      description: s.excerpt,
      images: [og],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getCaseStudy(slug);
  if (!s) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: s.title,
    description: s.excerpt,
    author: { "@type": "Organization", name: "gloood", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    datePublished: `${s.year}-01-01`,
    mainEntityOfPage: `${SITE_URL}/work/${s.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Work", item: `${SITE_URL}/work` },
      { "@type": "ListItem", position: 3, name: s.title, item: `${SITE_URL}/work/${s.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <article className="mx-auto max-w-[900px] px-8 py-24">
        <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">{s.client} · {s.year}</div>
        <h1 className="mt-4 text-5xl md:text-7xl">{s.title}</h1>
        <p className="mt-6 text-xl text-[var(--color-muted)]">{s.excerpt}</p>
        <div className="mt-12 grid grid-cols-3 gap-8 py-10 border-y border-[var(--color-border-subtle)]">
          {s.metrics.map(m => (
            <div key={m.label}>
              <div className="num text-4xl md:text-5xl text-[var(--color-accent-2)]">{m.value}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="prose prose-invert prose-lg mt-12 max-w-none">
          <MDXRemote source={s.content} />
        </div>
      </article>
      <CTASection />
    </>
  );
}
