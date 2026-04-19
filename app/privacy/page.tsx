export const metadata = {
  title: "Privacy Policy",
  description: "How gloood collects, uses, and protects information submitted through this website.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[800px] px-8 py-24 prose prose-invert prose-lg">
      <h1 className="text-5xl md:text-6xl">Privacy Policy</h1>
      <p className="text-[var(--color-muted)]">
        This policy explains what we collect when you use gloood.in and how we use it.
      </p>

      <h2>Information we collect</h2>
      <p>
        When you submit a contact or quote form, we collect the details you share — typically name, email, company,
        and a short note about your project. We also collect standard analytics data (page views, referrer, device
        type, rough location) via Google Tag Manager and analytics providers, but only after you grant consent via
        our cookie banner.
      </p>

      <h2>How we use it</h2>
      <p>
        Form submissions are used to respond to your enquiry and scope potential work. Analytics data is aggregated
        and used to improve the site. We do not sell personal data to third parties.
      </p>

      <h2>Third parties</h2>
      <p>
        We use Resend to deliver transactional email, and Google Tag Manager / Google Analytics for site analytics.
        These processors handle data under their own privacy policies.
      </p>

      <h2>Your choices</h2>
      <p>
        You can decline analytics cookies via the consent banner. You can request deletion of any personal data
        you've shared by emailing us at <a href="mailto:surpreet@gloood.in">surpreet@gloood.in</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email <a href="mailto:surpreet@gloood.in">surpreet@gloood.in</a>.
      </p>
    </div>
  );
}
