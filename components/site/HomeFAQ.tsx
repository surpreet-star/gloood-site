import { JsonLd } from "@/components/seo/JsonLd";

const FAQS = [
  {
    q: "What does gloood do?",
    a: "We build conversion-focused websites and run performance marketing campaigns for small and mid-market businesses in India. Two services, one team, measurable outcomes.",
  },
  {
    q: "How much does a new website cost?",
    a: "Most Launch-bundle sites fall between ₹75,000 and ₹2,00,000 depending on page count, custom design needs, and integrations. We scope each project individually — get a quote for your specific needs.",
  },
  {
    q: "How long does it take to launch a site?",
    a: "Typically 2–3 weeks from kickoff to launch for a standard Launch bundle. Revamps take 3–4 weeks because they include a data audit and 301 redirect mapping.",
  },
  {
    q: "Do you run ads on Meta and Google?",
    a: "Yes — our Grow and Launch+Grow bundles cover Meta Ads (Facebook + Instagram) and Google Ads (Search + Performance Max). LinkedIn and YouTube are available as add-ons.",
  },
  {
    q: "Do I need to sign a long-term contract?",
    a: "No. Website projects are scoped per-project with a clear SOW. Ad retainers are month-to-month after an initial 3-month period to prove results.",
  },
  {
    q: "Can you work with my existing website instead of rebuilding?",
    a: "Yes — the Revamp bundle is designed for exactly this. We audit your current site, identify conversion blockers, and rebuild what's broken while preserving your SEO.",
  },
];

export function HomeFAQ() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="mx-auto max-w-[900px] px-8 py-24">
      <JsonLd data={schema} />
      <h2 className="text-4xl md:text-5xl mb-12">Questions, answered.</h2>
      <div className="space-y-4">
        {FAQS.map(f => (
          <details key={f.q} className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elev)] p-6 group">
            <summary className="cursor-pointer text-lg font-display font-medium list-none flex justify-between items-start gap-4">
              <span>{f.q}</span>
              <span className="text-[var(--color-accent-2)] group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
            </summary>
            <p className="mt-4 text-[var(--color-muted)] leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
