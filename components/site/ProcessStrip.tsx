const STEPS = [
  { n: "01", title: "Discover", desc: "Intro call, goals, audit of what you have today." },
  { n: "02", title: "Design", desc: "Wireframes → visual design → copy draft. Fast iteration." },
  { n: "03", title: "Build", desc: "Next.js site, analytics, launch checklist, UAT." },
  { n: "04", title: "Grow", desc: "Ads live (if Grow bundle), weekly reporting, monthly optimization." },
];

export function ProcessStrip() {
  return (
    <section className="mx-auto max-w-[1200px] px-8 py-24">
      <h2 className="text-4xl md:text-5xl mb-12">How we work</h2>
      <div className="grid gap-8 md:grid-cols-4">
        {STEPS.map(s => (
          <div key={s.n}>
            <div className="num text-2xl text-[var(--color-accent-2)]">{s.n}</div>
            <h3 className="mt-3 text-xl">{s.title}</h3>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
