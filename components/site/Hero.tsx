import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-24 md:py-32">
      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-subtle)] px-4 py-1.5 text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-2)] shadow-[0_0_12px_var(--color-accent-2)]" />
        Website design · Performance marketing
      </span>
      <h1 className="mt-8 font-display font-black text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
        Sites that <em className="not-italic text-[var(--color-accent-2)]">convert.</em>
        <br />
        Ads that <em className="not-italic text-[var(--color-accent-2)]">compound.</em>
      </h1>
      <p className="mt-6 max-w-xl text-lg text-[var(--color-muted)]">
        We build high-performing websites and run the paid media to fill them. One team, measurable results, no fluff.
      </p>
      <div className="mt-10 flex items-center gap-4">
        <Link href="/contact" className="rounded-xl bg-[var(--color-accent)] px-7 py-3.5 text-sm font-bold font-display text-white transition-colors hover:bg-[var(--color-accent-2)] hover:text-black">
          Get a quote →
        </Link>
        <Link href="/work" className="rounded-xl border border-[var(--color-border-subtle)] px-7 py-3.5 text-sm font-display font-medium text-[var(--color-text)] hover:border-[var(--color-text)]">
          See our work
        </Link>
      </div>
    </section>
  );
}
