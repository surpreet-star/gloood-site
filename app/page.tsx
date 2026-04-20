import Link from "next/link";
import { Hero } from "@/components/site/Hero";
import { MetricCounter } from "@/components/site/MetricCounter";
import { BundleCards } from "@/components/site/BundleCards";
import { Marquee } from "@/components/site/Marquee";
import { CaseStudyCard } from "@/components/site/CaseStudyCard";
import { ProcessStrip } from "@/components/site/ProcessStrip";
import { TestimonialPull } from "@/components/site/TestimonialPull";
import { CTASection } from "@/components/site/CTASection";
import { HomeFAQ } from "@/components/site/HomeFAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCaseStudies, getInsights } from "@/lib/content";

const SITE_URL = "https://gloood.in";

export default async function Home() {
  const studies = (await getCaseStudies()).filter(s => s.featured).slice(0, 3);
  const insights = (await getInsights()).slice(0, 3);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "gloood",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <Hero />
      <section className="mx-auto max-w-[1200px] px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-[var(--color-border-subtle)]">
        <MetricCounter value="4.2×" label="Avg. ROAS lift" />
        <MetricCounter value="62%" label="CPA reduction" />
        <MetricCounter value="120+" label="Sites shipped" />
      </section>
      <BundleCards />
      {studies.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-8 py-24">
          <h2 className="text-4xl md:text-5xl mb-12">Featured work</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {studies.map(s => <CaseStudyCard key={s.slug} study={s} />)}
          </div>
        </section>
      )}
      <Marquee />
      <TestimonialPull />
      <ProcessStrip />
      {insights.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-8 py-24">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="text-4xl md:text-5xl">Latest insights</h2>
            <Link href="/insights" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent-2)] font-display font-medium">All insights →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {insights.map(i => (
              <Link
                key={i.slug}
                href={`/insights/${i.slug}`}
                className="group rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-elev)] p-6 hover:border-[var(--color-accent)] transition-colors"
              >
                <div className="text-[11px] uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">
                  <time dateTime={i.publish_date}>{new Date(i.publish_date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</time>
                  <span className="mx-2">·</span>
                  <span>{i.reading_time} min read</span>
                </div>
                <h3 className="mt-3 text-xl group-hover:text-[var(--color-accent-2)] transition-colors">{i.title}</h3>
                <p className="mt-3 text-sm text-[var(--color-muted)] line-clamp-3">{i.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      <HomeFAQ />
      <CTASection />
    </>
  );
}
