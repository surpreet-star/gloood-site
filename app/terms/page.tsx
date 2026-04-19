export const metadata = {
  title: "Terms of Service",
  description: "Terms covering use of gloood.in and engagements with gloood for website and advertising services.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[800px] px-8 py-24 prose prose-invert prose-lg">
      <h1 className="text-5xl md:text-6xl">Terms of Service</h1>
      <p className="text-[var(--color-muted)]">
        These terms cover use of gloood.in and engagements between you and gloood.
      </p>

      <h2>Website use</h2>
      <p>
        Content on gloood.in is provided as-is for informational purposes. We work to keep it accurate but make no
        warranty that pages are free of errors. Case studies describe real client outcomes; results will vary.
      </p>

      <h2>Engagements</h2>
      <p>
        Any paid work is governed by a separate written proposal or statement of work signed by both parties. That
        document takes precedence over anything on this site if they conflict.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The gloood name, brand, and this site's design and copy are owned by gloood unless otherwise noted. Client
        logos and case study materials are used with permission and remain the property of their respective owners.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, gloood is not liable for indirect or consequential damages arising from use
        of this website.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href="mailto:surpreet@gloood.in">surpreet@gloood.in</a>.
      </p>
    </div>
  );
}
