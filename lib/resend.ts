import nodemailer from "nodemailer";
import type { QuoteFormInput } from "./schema";

const HOST = process.env.SMTP_HOST;
const PORT = Number(process.env.SMTP_PORT ?? 465);
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASSWORD;
const TO = process.env.QUOTE_TO_EMAIL ?? "surpreet@gloood.in";
const FROM = process.env.QUOTE_FROM_EMAIL ?? `gloood <${USER ?? "surpreet@gloood.in"}>`;

export async function sendQuoteEmail(
  input: QuoteFormInput,
  sourcePage: string
): Promise<{ ok: boolean; error?: string }> {
  if (!HOST || !USER || !PASS) return { ok: true };

  const transport = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: PORT === 465,
    auth: { user: USER, pass: PASS },
  });

  try {
    await transport.sendMail({
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
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
