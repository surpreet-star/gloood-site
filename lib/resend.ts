// gloood-site/lib/resend.ts
import { Resend } from "resend";
import type { QuoteFormInput } from "./schema";

const KEY = process.env.RESEND_API_KEY;
const TO = process.env.QUOTE_TO_EMAIL ?? "surpreet@gloood.in";
const FROM = process.env.QUOTE_FROM_EMAIL ?? "gloood <noreply@gloood.in>";

export async function sendQuoteEmail(
  input: QuoteFormInput,
  sourcePage: string
): Promise<{ ok: boolean; error?: string }> {
  if (!KEY) return { ok: true }; // dev: no-op
  const client = new Resend(KEY);
  const { error } = await client.emails.send({
    from: FROM,
    to: TO,
    replyTo: input.email,
    subject: `New quote — ${input.bundle} (${input.budget})`,
    text: `Name: ${input.name}
Email: ${input.email}
Phone: ${input.phone ?? "—"}
Bundle: ${input.bundle}
Budget: ${input.budget}
Source: ${sourcePage}

${input.message}`,
  });
  return error ? { ok: false, error: error.message } : { ok: true };
}
