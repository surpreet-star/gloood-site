import Link from "next/link";
import { getCaseStudies } from "@/lib/content";
import { CaseStudyCard } from "@/components/site/CaseStudyCard";

export const metadata = { title: "Work" };

type Params = { searchParams: Promise<{ tag?: string }> };

export default async function Work({ searchParams }: Params) {
  const { tag } = await searchParams;
  const studies = await getCaseStudies({ tag: tag as "web" | "performance" | undefined });
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
        {studies.map(s => <CaseStudyCard key={s.slug} study={s} size="lg" />)}
      </div>
    </div>
  );
}
