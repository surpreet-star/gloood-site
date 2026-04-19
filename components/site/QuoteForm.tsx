"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { QuoteFormSchema, BUNDLES, BUDGETS, type QuoteFormInput } from "@/lib/schema";
import { submitQuote } from "@/app/actions/submit-quote";

const BUNDLE_LABELS: Record<(typeof BUNDLES)[number], string> = {
  "launch": "Launch — new website",
  "grow": "Grow — performance ads",
  "launch-grow": "Launch + Grow",
  "revamp": "Revamp",
};
const BUDGET_LABELS: Record<(typeof BUDGETS)[number], string> = {
  "under-50k": "Under ₹50k",
  "50k-1L": "₹50k – ₹1L",
  "1L-3L": "₹1L – ₹3L",
  "3L-plus": "₹3L+",
  "not-sure": "Not sure yet",
};

export function QuoteForm({ defaultBundle = "launch", sourcePage }: { defaultBundle?: (typeof BUNDLES)[number]; sourcePage: string }) {
  const [state, setState] = useState<{ status: "idle" | "sending" | "ok" | "err"; msg?: string }>({ status: "idle" });
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<QuoteFormInput>({
    resolver: zodResolver(QuoteFormSchema),
    defaultValues: { bundle: defaultBundle, budget: "not-sure", turnstileToken: "", website: "" },
  });
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const onSubmit = async (data: QuoteFormInput) => {
    setState({ status: "sending" });
    const r = await submitQuote(data, sourcePage);
    if (r.ok) setState({ status: "ok" });
    else setState({ status: "err", msg: r.error });
  };

  if (state.status === "ok") {
    return <div className="rounded-2xl border border-[var(--color-accent-2)] bg-[var(--color-bg-elev)] p-8 text-center">Thanks — we'll be in touch within one working day.</div>;
  }

  const inputCls = "w-full rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elev)] px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-accent)] outline-none";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <input type="text" {...register("website")} className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden />
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--color-muted)] mb-2 font-display font-medium">Name</label>
          <input {...register("name")} className={inputCls} />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--color-muted)] mb-2 font-display font-medium">Email</label>
          <input type="email" {...register("email")} className={inputCls} />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--color-muted)] mb-2 font-display font-medium">Phone (optional)</label>
          <input {...register("phone")} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest text-[var(--color-muted)] mb-2 font-display font-medium">Bundle</label>
          <select {...register("bundle")} className={inputCls}>
            {BUNDLES.map(b => <option key={b} value={b}>{BUNDLE_LABELS[b]}</option>)}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs uppercase tracking-widest text-[var(--color-muted)] mb-2 font-display font-medium">Budget</label>
          <select {...register("budget")} className={inputCls}>
            {BUDGETS.map(b => <option key={b} value={b}>{BUDGET_LABELS[b]}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-[var(--color-muted)] mb-2 font-display font-medium">About your project</label>
        <textarea {...register("message")} rows={5} className={inputCls} />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
      </div>
      {siteKey && (
        <Turnstile
          siteKey={siteKey}
          onSuccess={token => setValue("turnstileToken", token)}
          options={{ theme: "dark" }}
        />
      )}
      {!siteKey && <input type="hidden" {...register("turnstileToken")} value="dev" />}
      <button
        type="submit"
        disabled={state.status === "sending"}
        className="mt-2 rounded-xl bg-[var(--color-accent)] px-7 py-4 text-sm font-bold font-display text-white hover:bg-[var(--color-accent-2)] hover:text-black transition-colors disabled:opacity-50"
      >
        {state.status === "sending" ? "Sending…" : "Send quote request →"}
      </button>
      {state.status === "err" && <p className="text-red-400 text-sm">{state.msg}</p>}
    </form>
  );
}
