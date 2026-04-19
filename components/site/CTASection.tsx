import Link from "next/link";

export function CTASection() {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-24">
      <div className="rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-bg-elev)] p-12 md:p-20 text-center">
        <h2 className="text-4xl md:text-6xl">Ready to grow?</h2>
        <p className="mt-6 max-w-lg mx-auto text-[var(--color-muted)]">Tell us about your business. We'll get back within one working day with a plan.</p>
        <Link href="/contact" className="mt-10 inline-block rounded-xl bg-[var(--color-accent)] px-8 py-4 text-sm font-bold font-display text-white hover:bg-[var(--color-accent-2)] hover:text-black transition-colors">
          Get a quote →
        </Link>
      </div>
    </section>
  );
}
