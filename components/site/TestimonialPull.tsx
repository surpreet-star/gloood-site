import testimonials from "@/content/testimonials.json";

export function TestimonialPull() {
  const t = testimonials[0];
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-24">
      <blockquote className="text-3xl md:text-5xl leading-[1.15] font-display font-black tracking-tight">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <div className="mt-8 text-sm text-[var(--color-muted)]">
        — {t.name}, {t.role} at {t.company}
      </div>
    </section>
  );
}
