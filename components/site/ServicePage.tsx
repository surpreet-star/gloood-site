import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Service } from "@/lib/content";
import { getCaseStudies } from "@/lib/content";
import { CaseStudyCard } from "./CaseStudyCard";
import { QuoteForm } from "./QuoteForm";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = "https://gloood.in";

export async function ServicePage({ service }: { service: Service }) {
  const studies = (await getCaseStudies()).slice(0, 3);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.name} — ${service.tagline}`,
    description: service.summary,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: "IN",
    url: `${SITE_URL}/services/${service.slug}`,
  };

  const faqSchema = service.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: SITE_URL },
      { "@type": "ListItem", position: 3, name: service.name, item: `${SITE_URL}/services/${service.slug}` },
    ],
  };

  const schemas = faqSchema ? [serviceSchema, faqSchema, breadcrumbSchema] : [serviceSchema, breadcrumbSchema];

  return (
    <>
      <JsonLd data={schemas}  />
      <section className="mx-auto max-w-[1200px] px-8 py-24 md:py-32">
        <div className="text-xs uppercase tracking-widest text-[var(--color-accent-2)] font-display font-medium">{service.name}</div>
        <h1 className="mt-4 text-5xl md:text-7xl">{service.tagline}</h1>
        <p className="mt-6 max-w-xl text-lg text-[var(--color-muted)]">{service.summary}</p>
        <div className="mt-10">
          <Link href="#quote" className="rounded-xl bg-[var(--color-accent)] px-7 py-3.5 text-sm font-bold font-display text-white hover:bg-[var(--color-accent-2)] hover:text-black transition-colors">Get a quote →</Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-8 py-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-3xl mb-6">What's included</h2>
          <ul className="space-y-3 text-[var(--color-muted)]">
            {service.includes.map(i => <li key={i} className="flex gap-3"><span className="text-[var(--color-accent-2)]">→</span>{i}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl mb-6">What you get</h2>
          <ul className="space-y-3 text-[var(--color-muted)]">
            {service.deliverables.map(d => <li key={d} className="flex gap-3"><span className="text-[var(--color-accent-2)]">✓</span>{d}</li>)}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-8 py-16 prose prose-invert prose-lg max-w-3xl">
        <MDXRemote source={service.content} />
      </section>

      {studies.length > 0 && (
        <section className="mx-auto max-w-[1200px] px-8 py-16">
          <h2 className="text-3xl mb-8">Recent work</h2>
          <div className="grid gap-6 md:grid-cols-3">{studies.map(s => <CaseStudyCard key={s.slug} study={s} />)}</div>
        </section>
      )}

      <section className="mx-auto max-w-[1200px] px-8 py-16">
        <h2 className="text-3xl mb-8">FAQ</h2>
        <div className="space-y-4">
          {service.faq.map(f => (
            <details key={f.q} className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elev)] p-6 group">
              <summary className="cursor-pointer text-lg font-display font-medium list-none flex justify-between">
                {f.q}
                <span className="text-[var(--color-accent-2)] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-[var(--color-muted)]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-[1200px] px-8 py-24">
        <h2 className="text-3xl mb-8">Get a quote for {service.name}</h2>
        <QuoteForm defaultBundle={service.slug as any} sourcePage={`/services/${service.slug}`} />
      </section>
    </>
  );
}
