import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/lib/content";

export function CaseStudyCard({ study, size = "sm" }: { study: CaseStudy; size?: "sm" | "lg" }) {
  return (
    <Link href={`/work/${study.slug}`} className={`group block rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-elev)] overflow-hidden transition-all hover:border-[var(--color-accent)]`}>
      <div className={`relative w-full overflow-hidden bg-black ${size === "lg" ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
        <Image
          src={study.hero_image}
          alt={`${study.client} case study — ${study.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-elev)] via-transparent to-transparent" />
      </div>
      <div className={`p-8 ${size === "lg" ? "md:p-10" : ""}`}>
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
      </div>
    </Link>
  );
}
