import { JsonLd } from "@/components/seo/JsonLd";
import { webPageSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Brand Guide",
  description: "gloood brand guidelines — logo, palette, typography, and voice.",
};

const palette = [
  { token: "Ink", hex: "#0A0B10", use: "Page background" },
  { token: "Elevated", hex: "#14161F", use: "Card / surface background" },
  { token: "Border", hex: "#1F2230", use: "Hairlines" },
  { token: "Violet", hex: "#7C5CFF", use: "Primary CTA, links, focus" },
  { token: "Lime", hex: "#C8FF5E", use: "Accent for numbers, CTA hover" },
  { token: "Text", hex: "#F5F5F7", use: "Primary text" },
  { token: "Muted", hex: "#8A8D9A", use: "Secondary text" },
];

export default function BrandPage() {
  const description = "gloood brand guidelines — logo, palette, typography, and voice.";
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({ url: "/brand", title: "Brand Guide", description }),
          breadcrumbSchema([
            { name: "Home", href: "/" },
            { name: "Brand Guide", href: "/brand" },
          ]),
        ]}
      />
      <div className="mx-auto max-w-[1100px] px-8 py-24">
        {/* Intro */}
        <section>
          <p className="text-sm uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">
            Brand Guide · v1.0
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl">The gloood brand, in one page.</h1>
          <p className="mt-8 max-w-[760px] text-xl text-[var(--color-muted)]">
            A short, practical reference for anyone writing, designing, or building for gloood. The rules are
            intentionally few. Follow them and the brand will look like itself everywhere it shows up.
          </p>
        </section>

        {/* Logo */}
        <section className="mt-24">
          <h2 className="text-3xl">Logo</h2>
          <p className="mt-3 max-w-[720px] text-[var(--color-muted)]">
            The wordmark is lowercase &ldquo;gloood&rdquo; in Avenir Black with a trailing period. The period is
            always accent-coloured — lime on dark, violet on light. Never stretch, recolour, or tilt it.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[#0A0B10] p-10">
              <div className="flex min-h-[160px] items-center justify-center">
                <img src="/brand/logo-wordmark-dark.svg" alt="gloood wordmark on dark" width={360} height={100} />
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-4 text-sm">
                <span className="text-[var(--color-muted)]">Primary — on dark</span>
                <a href="/brand/logo-wordmark-dark.svg" download className="text-[var(--color-accent-1,#7C5CFF)] underline">Download SVG</a>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[#F5F5F7] p-10">
              <div className="flex min-h-[160px] items-center justify-center">
                <img src="/brand/logo-wordmark-light.svg" alt="gloood wordmark on light" width={360} height={100} />
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-sm text-[#0A0B10]">
                <span className="opacity-70">Inverse — on light</span>
                <a href="/brand/logo-wordmark-light.svg" download className="underline">Download SVG</a>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3 text-sm text-[var(--color-muted)]">
            <div className="rounded-xl border border-[var(--color-border-subtle)] p-5">
              <div className="font-display font-medium text-[var(--color-text)]">Clear space</div>
              <p className="mt-2">Leave space around the wordmark equal to the cap height of the &ldquo;g&rdquo;.</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border-subtle)] p-5">
              <div className="font-display font-medium text-[var(--color-text)]">Minimum size</div>
              <p className="mt-2">Never render the wordmark smaller than 96px wide on screen, 24mm in print.</p>
            </div>
            <div className="rounded-xl border border-[var(--color-border-subtle)] p-5">
              <div className="font-display font-medium text-[var(--color-text)]">Background</div>
              <p className="mt-2">Primary is Ink <code>#0A0B10</code>. Avoid busy imagery — use a dark scrim if you must.</p>
            </div>
          </div>
        </section>

        {/* Palette */}
        <section className="mt-24">
          <h2 className="text-3xl">Palette</h2>
          <p className="mt-3 max-w-[720px] text-[var(--color-muted)]">
            Seven tokens. Ink and Elevated carry 90% of the surface area. Violet is the primary action colour.
            Lime is an accent — use it for numbers, hover states, and the period in the wordmark.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {palette.map(p => (
              <div key={p.token} className="rounded-2xl border border-[var(--color-border-subtle)] overflow-hidden">
                <div className="h-28" style={{ background: p.hex }} aria-hidden />
                <div className="p-5">
                  <div className="font-display font-black text-lg">{p.token}</div>
                  <div className="mt-1 font-mono text-sm text-[var(--color-muted)]">{p.hex}</div>
                  <div className="mt-3 text-sm text-[var(--color-muted)]">{p.use}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mt-24">
          <h2 className="text-3xl">Typography</h2>
          <p className="mt-3 max-w-[720px] text-[var(--color-muted)]">
            Three typefaces do all the work. Avenir Black sets display headings and large numbers. Avenir Medium
            labels the UI. Inter handles body copy and forms.
          </p>

          <div className="mt-10 space-y-6">
            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-elevated,#14161F)] p-8">
              <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">Avenir Black · Display</div>
              <div className="mt-4 font-display font-black text-5xl md:text-6xl tracking-tight">
                Websites that convert.
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-elevated,#14161F)] p-8">
              <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">Avenir Medium · Subhead / UI labels</div>
              <div className="mt-4 font-display font-medium text-2xl">
                Launch + Grow — 90-day engagement
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-elevated,#14161F)] p-8">
              <div className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">Inter · Body</div>
              <p className="mt-4 text-lg text-[var(--color-muted)] max-w-[60ch]">
                gloood is a small, senior team building websites and running paid ads for SMBs across India. We
                measure success in qualified leads and revenue, not design awards. Reports go out weekly.
              </p>
            </div>
          </div>
        </section>

        {/* Voice & Tone */}
        <section className="mt-24">
          <h2 className="text-3xl">Voice &amp; tone</h2>
          <p className="mt-3 max-w-[720px] text-[var(--color-muted)]">
            Confident. Pragmatic. Outcome-focused. Write the way a senior operator would talk to another senior
            operator over coffee.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "Confident, pragmatic, outcome-focused.",
              "Direct. No fluff. No agency buzzwords.",
              "First-person plural (\u201Cwe\u201D).",
              "Specific numbers over vague claims.",
              "Indian context — \u20B9, Mumbai/India, GST, SMB.",
              "Short sentences. Real examples. No hedging.",
            ].map(line => (
              <li key={line} className="rounded-xl border border-[var(--color-border-subtle)] p-5 text-[var(--color-muted)]">
                {line}
              </li>
            ))}
          </ul>
        </section>

        {/* Dos and Don'ts */}
        <section className="mt-24">
          <h2 className="text-3xl">Do&rsquo;s and don&rsquo;ts</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-elevated,#14161F)] p-8">
              <div className="font-display font-black text-lg text-[#C8FF5E]">Do</div>
              <ul className="mt-4 space-y-3 text-[var(--color-muted)]">
                <li>Pair Violet with Lime sparingly. Use Lime for emphasis — numbers, hover states.</li>
                <li>Maintain clear space around the wordmark equal to the cap height of the &ldquo;g&rdquo;.</li>
                <li>Use Ink <code>#0A0B10</code> as the primary background — not pure black.</li>
                <li>Quote specific outcomes: &ldquo;2.8&times; bookings&rdquo;, &ldquo;71% lower CPA&rdquo;.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-elevated,#14161F)] p-8">
              <div className="font-display font-black text-lg text-[#7C5CFF]">Don&rsquo;t</div>
              <ul className="mt-4 space-y-3 text-[var(--color-muted)]">
                <li>Use Lime as body text — unreadable on most backgrounds.</li>
                <li>Stretch, recolour, or tilt the wordmark.</li>
                <li>Place the wordmark on busy imagery without a dark scrim.</li>
                <li>Write in agency voice — no &ldquo;synergy&rdquo;, &ldquo;leverage&rdquo;, or &ldquo;best-in-class&rdquo;.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Downloads */}
        <section className="mt-24">
          <h2 className="text-3xl">Downloads</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <a
              href="/brand/gloood-brand-guide.pdf"
              download
              className="rounded-2xl border border-[var(--color-border-subtle)] p-6 hover:border-[#7C5CFF]"
            >
              <div className="font-display font-black text-lg">Brand Guide PDF</div>
              <div className="mt-2 text-sm text-[var(--color-muted)]">A4, ~6 pages. Full guidelines.</div>
            </a>
            <a
              href="/brand/logo-wordmark-dark.svg"
              download
              className="rounded-2xl border border-[var(--color-border-subtle)] p-6 hover:border-[#7C5CFF]"
            >
              <div className="font-display font-black text-lg">Wordmark — Dark</div>
              <div className="mt-2 text-sm text-[var(--color-muted)]">SVG · for dark backgrounds.</div>
            </a>
            <a
              href="/brand/logo-wordmark-light.svg"
              download
              className="rounded-2xl border border-[var(--color-border-subtle)] p-6 hover:border-[#7C5CFF]"
            >
              <div className="font-display font-black text-lg">Wordmark — Light</div>
              <div className="mt-2 text-sm text-[var(--color-muted)]">SVG · for light backgrounds.</div>
            </a>
          </div>
          <p className="mt-8 text-sm text-[var(--color-muted)]">
            Questions or a missing asset? Email <a className="underline" href="mailto:surpreet@gloood.in">surpreet@gloood.in</a>.
          </p>
        </section>
      </div>
    </>
  );
}
