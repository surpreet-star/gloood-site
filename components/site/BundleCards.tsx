import Link from "next/link";

const BUNDLES = [
  { tag: "Launch", title: "New website", desc: "5–7 pages, design + build + copy. Ready to convert from day one.", href: "/services/website-design" },
  { tag: "Grow", title: "Performance ads", desc: "Meta + Google Ads. Monthly retainer. Full reporting, zero guesswork.", href: "/services/performance-ads" },
  { tag: "Launch + Grow", title: "Site + 90 days ads", desc: "Build it and fill it. One team, one roadmap, measurable growth.", href: "/services/launch-grow" },
  { tag: "Revamp", title: "Redesign + CRO", desc: "Keep what works, fix what doesn't. Data-driven redesign of your existing site.", href: "/services/revamp" },
];

export function BundleCards() {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-24">
      <h2 className="text-4xl md:text-5xl mb-12">Pick your bundle</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {BUNDLES.map(b => (
          <Link key={b.href} href={b.href} className="group rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-elev)] p-8 transition-all hover:border-[var(--color-accent)] hover:-translate-y-0.5">
            <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent-2)] font-display font-medium mb-4">{b.tag}</div>
            <h3 className="text-2xl mb-2">{b.title}</h3>
            <p className="text-[var(--color-muted)] text-[15px] leading-relaxed">{b.desc}</p>
            <div className="mt-6 text-sm font-display font-medium">Learn more →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
