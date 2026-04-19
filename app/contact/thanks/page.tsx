import Link from "next/link";

export const metadata = { title: "Thanks" };

export default function Thanks() {
  return (
    <div className="mx-auto max-w-[700px] px-8 py-32 text-center">
      <h1 className="text-5xl md:text-7xl">Thanks.</h1>
      <p className="mt-6 text-xl text-[var(--color-muted)]">We got your message. We'll be in touch within one working day.</p>
      <Link href="/" className="mt-12 inline-block rounded-xl border border-[var(--color-border-subtle)] px-7 py-3.5 text-sm font-display font-medium">Back to home</Link>
    </div>
  );
}
