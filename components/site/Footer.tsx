import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--color-border-subtle)]">
      <div className="mx-auto max-w-[1200px] px-8 py-16 grid gap-8 md:grid-cols-6">
        <div className="md:col-span-2">
          <div className="font-display text-xl font-black">gloood<span className="text-[var(--color-accent-2)]">.</span></div>
          <p className="mt-3 text-sm text-[var(--color-muted)]">Websites that convert. Ads that compound.</p>
          <p className="mt-6 text-sm text-[var(--color-muted)]">surpreet@gloood.in</p>
          <p className="text-sm text-[var(--color-muted)]">Mumbai, IN</p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">Services</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/services/website-design">Launch</Link></li>
            <li><Link href="/services/performance-ads">Grow</Link></li>
            <li><Link href="/services/launch-grow">Launch + Grow</Link></li>
            <li><Link href="/services/revamp">Revamp</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">Industries</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/industries/restaurants">Restaurants</Link></li>
            <li><Link href="/industries/b2b-industrial">B2B & Industrial</Link></li>
            <li><Link href="/industries/healthcare">Healthcare</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">Locations</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/locations/mumbai">Mumbai</Link></li>
            <li><Link href="/locations/india">India</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[var(--color-muted)] font-display font-medium">Company</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/insights">Insights</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/brand">Brand Guide</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border-subtle)] px-8 py-6 text-xs text-[var(--color-muted)] mx-auto max-w-[1200px]">
        © {new Date().getFullYear()} gloood. All rights reserved.
      </div>
    </footer>
  );
}
