"use client";
import { useEffect, useState } from "react";

const KEY = "gloood-consent-v1";

export function ConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  const decide = (choice: "accept" | "reject") => {
    localStorage.setItem(KEY, choice);
    if (choice === "accept") window.dispatchEvent(new Event("gloood:consent-granted"));
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-[100] rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elev)] p-6 shadow-2xl">
      <p className="text-sm text-[var(--color-muted)]">
        We use cookies for analytics and marketing. <a href="/privacy" className="underline hover:text-[var(--color-text)]">Learn more</a>.
      </p>
      <div className="mt-4 flex gap-3">
        <button onClick={() => decide("accept")} className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-xs font-display font-bold text-white">Accept</button>
        <button onClick={() => decide("reject")} className="rounded-lg border border-[var(--color-border-subtle)] px-4 py-2 text-xs font-display font-medium">Reject</button>
      </div>
    </div>
  );
}
