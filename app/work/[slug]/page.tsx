import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCaseStudy, getCaseStudies } from "@/lib/content";
import { CTASection } from "@/components/site/CTASection";
import { CaseStudyCard } from "@/components/site/CaseStudyCard";
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

  const allOthers = (await getCaseStudies()).filter(c => c.slug !== s.slug);
  const sameTagFirst = allOthers.sort((a, b) => {
    const aShares = a.tags.some(t => s.tags.includes(t)) ? 0 : 1;
    const bShares = b.tags.some(t => s.tags.includes(t)) ? 0 : 1;
    return aShares - bShares;
  });
  const related = sameTagFirst.slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: s.title,
    description: s.excerpt,
    author: { "@type": "Person", name: "Surpreet Mahal", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    datePublished: s.publish_date ?? `${s.year}-01-01`,
    dateModified: s.publish_date ?? `${s.year}-01-01`,
    mainEntityOfPage: `${SITE_URL}/work/${s.slug}`,
    image: `${SITE_URL}${s.hero_image}`,
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
      <div className="relative w-full aspect-[21/9] md:aspect-[21/8] overflow-hidden bg-black">
        <Image
          src={s.hero_image}
          alt={`${s.client} — ${s.title}`}
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-70"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/30 to-transparent" />
      </div>
      <article className="mx-auto max-w-[900px] px-8 py-24 -mt-32 relative">
        <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">{s.client} · {s.year}</div>
        <h1 className="mt-4 text-5xl md:text-7xl">{s.title}</h1>
        <p className="mt-6 text-xl text-[var(--color-muted)]">{s.excerpt}</p>
        <div className="mt-6 flex items-center gap-3 text-sm text-[var(--color-muted)]">
          <span className="font-display font-medium">By Surpreet Mahal</span>
          <span>·</span>
          <time dateTime={s.publish_date ?? `${s.year}-01-01`}>
            {new Date(s.publish_date ?? `${s.year}-01-01`).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
          </time>
        </div>
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
      {related.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-8 py-16">
          <h2 className="text-3xl mb-8">More work</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map(r => <CaseStudyCard key={r.slug} study={r} />)}
          </div>
        </section>
      )}
      <CTASection />
    </>
  );
}
