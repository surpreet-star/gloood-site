// gloood-site/app/actions/submit-quote.ts
"use server";
import { headers } from "next/headers";
import { QuoteFormSchema, type QuoteFormInput } from "@/lib/schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendQuoteEmail } from "@/lib/resend";

const TURNSTILE_VERIFY = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true; // dev: skip
  const res = await fetch(TURNSTILE_VERIFY, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export async function submitQuote(
  input: QuoteFormInput,
  sourcePage: string
): Promise<{ ok: boolean; error?: string }> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "0.0.0.0";
  return submitQuoteImpl(input, ip, sourcePage);
}

export async function submitQuoteImpl(
  input: QuoteFormInput,
  ip: string,
  sourcePage: string
): Promise<{ ok: boolean; error?: string }> {
  const parsed = QuoteFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues.map(i => i.message).join("; ") };
  }
  if (parsed.data.website) return { ok: false, error: "Invalid submission" }; // honeypot

  const rl = await checkRateLimit(ip);
  if (!rl.allowed) return { ok: false, error: "Too many requests — try again later" };

  const okTurnstile = await verifyTurnstile(parsed.data.turnstileToken);
  if (!okTurnstile) return { ok: false, error: "Verification failed" };

  return sendQuoteEmail(parsed.data, sourcePage);
}
