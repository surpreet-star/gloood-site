import Link from "next/link";
import type { CaseStudy } from "@/lib/content";

export function CaseStudyCard({ study, size = "sm" }: { study: CaseStudy; size?: "sm" | "lg" }) {
  return (
    <Link href={`/work/${study.slug}`} className={`group rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-elev)] p-8 transition-all hover:border-[var(--color-accent)] ${size === "lg" ? "md:p-12" : ""}`}>
      <div className="text-[11px] uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">{study.client} · {study.year}</div>
      <h3 className={`mt-3 ${size === "lg" ? "text-3xl md:text-4xl" : "text-xl"}`}>{study.title}</h3>
      <p className="mt-3 text-[var(--color-muted)]">{study.excerpt}</p>
      <div className="mt-6 flex gap-8">
        {study.metrics.slice(0, 2).map(m => (
          <div key={m.label}>
            <div className="num text-2xl md:text-3xl text-[var(--color-accent-2)]">{m.value}</div>
            <div className="text-xs text-[var(--color-muted)] uppercase tracking-widest font-display font-medium">{m.label}</div>
          </div>
        ))}
      </div>
    </Link>
  );
}
