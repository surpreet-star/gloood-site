export const metadata = { title: "About" };

export default function About() {
  return (
    <div className="mx-auto max-w-[900px] px-8 py-24">
      <h1 className="text-5xl md:text-7xl">We build sites. We run ads. That's it.</h1>
      <p className="mt-8 text-xl text-[var(--color-muted)]">
        gloood is a small, senior team focused on two things: websites that convert, and the paid media to fill them.
        No strategy decks that never ship. No layers of account managers. Just design, build, and growth — done by the
        people doing the work.
      </p>
      <h2 className="mt-16 text-3xl">How we think</h2>
      <div className="mt-6 space-y-5 text-[var(--color-muted)]">
        <p><strong className="text-[var(--color-text)]">Outcomes over outputs.</strong> A beautiful site nobody converts on is a waste. We measure success in qualified leads and revenue, not design awards.</p>
        <p><strong className="text-[var(--color-text)]">Speed matters.</strong> Most SMBs don't have 6 months to launch a site. We ship in weeks, then iterate live based on real data.</p>
        <p><strong className="text-[var(--color-text)]">Transparent reporting.</strong> Every client gets direct access to the ad accounts, analytics, and weekly reports. No black boxes.</p>
        <p><strong className="text-[var(--color-text)]">Honest scoping.</strong> If you don't need what we sell, we'll tell you. If a cheaper solution will work, we'll point you to it.</p>
      </div>
    </div>
  );
}
