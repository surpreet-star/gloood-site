import { QuoteForm } from "@/components/site/QuoteForm";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <div className="mx-auto max-w-[900px] px-8 py-24">
      <h1 className="text-5xl md:text-7xl">Let's talk.</h1>
      <p className="mt-6 text-xl text-[var(--color-muted)]">
        Tell us about your business. We'll get back within one working day with a plan.
      </p>
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <a href="mailto:surpreet@gloood.in" className="text-[var(--color-accent-2)] hover:underline">surpreet@gloood.in</a>
        <span className="text-[var(--color-muted)]">·</span>
        <a href="https://wa.me/918686636329" className="text-[var(--color-accent-2)] hover:underline">WhatsApp</a>
      </div>
      <div className="mt-16">
        <QuoteForm sourcePage="/contact" />
      </div>
    </div>
  );
}
