import Link from "next/link";

const LINKS = [
  { href: "/services/website-design", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)]/60 bg-[var(--color-bg)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-8 py-4">
        <Link href="/" className="font-display text-xl font-black tracking-tight">
          gloood<span className="text-[var(--color-accent-2)]">.</span>
        </Link>
        <nav className="hidden gap-8 text-sm text-[var(--color-muted)] md:flex">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-[var(--color-text)] transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="font-display rounded-full bg-[var(--color-accent)] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[var(--color-accent-2)] hover:text-black"
        >
          Get a quote
        </Link>
      </div>
    </header>
  );
}
