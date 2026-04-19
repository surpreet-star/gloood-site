import Link from "next/link";
import { getCaseStudies } from "@/lib/content";

export const metadata = { title: "Work" };

type Params = { searchParams: Promise<{ tag?: string }> };

export default async function Work({ searchParams }: Params) {
  const { tag } = await searchParams;
  const studies = await getCaseStudies({ tag: tag as any });
  return (
    <div className="mx-auto max-w-[1200px] px-8 py-24">
      <h1 className="text-5xl md:text-7xl">Our work</h1>
      <p className="mt-6 max-w-xl text-[var(--color-muted)]">Selected projects. Sites we built, ads we ran, numbers we're proud of.</p>
      <div className="mt-10 flex gap-3">
        {[{ v: "", l: "All" }, { v: "web", l: "Web" }, { v: "performance", l: "Performance" }].map(t => (
          <Link
            key={t.l}
            href={t.v ? `/work?tag=${t.v}` : "/work"}
            className={`rounded-full border border-[var(--color-border-subtle)] px-4 py-2 text-xs font-display font-medium uppercase tracking-widest ${tag === t.v || (!tag && !t.v) ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]" : "text-[var(--color-muted)] hover:text-[var(--color-text)]"}`}
          >
            {t.l}
          </Link>
        ))}
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {studies.map(s => (
          <Link key={s.slug} href={`/work/${s.slug}`} className="group rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-elev)] p-10 hover:border-[var(--color-accent)] transition-all">
            <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">{s.client} · {s.year}</div>
            <h2 className="mt-3 text-3xl">{s.title}</h2>
            <p className="mt-4 text-[var(--color-muted)]">{s.excerpt}</p>
            <div className="mt-8 flex gap-10">
              {s.metrics.slice(0, 3).map(m => (
                <div key={m.label}>
                  <div className="num text-3xl text-[var(--color-accent-2)]">{m.value}</div>
                  <div className="text-xs text-[var(--color-muted)] uppercase tracking-widest font-display font-medium">{m.label}</div>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
