import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getInsight, getInsights } from "@/lib/content";
import { CTASection } from "@/components/site/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = "https://gloood.in";

export async function generateStaticParams() {
  const all = await getInsights();
  return all.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = await getInsight(slug);
  if (!i) return {};
  const og = `${SITE_URL}/api/og?title=${encodeURIComponent(i.title)}&subtitle=${encodeURIComponent(i.description)}`;
  return {
    title: i.title,
    description: i.description,
    authors: [{ name: i.author }],
    alternates: { canonical: `/insights/${i.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/insights/${i.slug}`,
      title: i.title,
      description: i.description,
      images: [{ url: og, width: 1200, height: 630, alt: i.title }],
      publishedTime: i.publish_date,
      authors: [i.author],
    },
    twitter: { card: "summary_large_image", title: i.title, description: i.description, images: [og] },
  };
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = await getInsight(slug);
  if (!i) notFound();

  const og = `${SITE_URL}/api/og?title=${encodeURIComponent(i.title)}&subtitle=${encodeURIComponent(i.description)}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: i.title,
    description: i.description,
    author: { "@type": "Person", name: i.author, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    datePublished: i.publish_date,
    dateModified: i.publish_date,
    mainEntityOfPage: `${SITE_URL}/insights/${i.slug}`,
    image: {
      "@type": "ImageObject",
      url: og,
      width: 1200,
      height: 630,
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE_URL}/insights` },
      { "@type": "ListItem", position: 3, name: i.title, item: `${SITE_URL}/insights/${i.slug}` },
    ],
  };

  const related = (await getInsights()).filter(x => x.slug !== i.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumb]} />
      <article className="mx-auto max-w-[720px] px-8 py-24">
        <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">
          <time dateTime={i.publish_date}>{new Date(i.publish_date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</time>
          <span className="mx-2">·</span>
          <span>{i.reading_time} min read</span>
        </div>
        <h1 className="mt-4 text-4xl md:text-6xl">{i.title}</h1>
        <p className="mt-6 text-xl text-[var(--color-muted)]">{i.description}</p>
        <div className="mt-6 text-sm text-[var(--color-muted)]">By <span className="text-[var(--color-text)] font-display font-medium">{i.author}</span></div>
        <div className="prose prose-invert prose-lg mt-12 max-w-none">
          <MDXRemote source={i.content} />
        </div>
      </article>
      {related.length > 0 && (
        <section className="mx-auto max-w-[900px] px-8 py-16">
          <h2 className="text-3xl mb-8">Keep reading</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map(r => (
              <a key={r.slug} href={`/insights/${r.slug}`} className="group rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-elev)] p-6 hover:border-[var(--color-accent)] transition-all">
                <div className="text-[11px] uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">{new Date(r.publish_date).toLocaleDateString("en-IN", { year: "numeric", month: "short" })}</div>
                <div className="mt-2 text-lg group-hover:text-[var(--color-accent-2)]">{r.title}</div>
              </a>
            ))}
          </div>
        </section>
      )}
      <CTASection />
    </>
  );
}
