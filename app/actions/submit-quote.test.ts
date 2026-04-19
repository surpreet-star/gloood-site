// gloood-site/app/actions/submit-quote.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { submitQuote } from "./submit-quote";
import * as resend from "@/lib/resend";
import * as rl from "@/lib/rate-limit";

beforeEach(() => {
  vi.restoreAllMocks();
  rl._resetForTests();
  vi.spyOn(resend, "sendQuoteEmail").mockResolvedValue({ ok: true });
  process.env.TURNSTILE_SECRET = "test-secret";
  global.fetch = vi.fn(async () =>
    new Response(JSON.stringify({ success: true }), { status: 200 })
  ) as any;
});

const base = {
  name: "Ada", email: "ada@example.com", phone: "",
  bundle: "launch" as const, budget: "50k-1L" as const, message: "hi",
  turnstileToken: "t", website: "",
};

describe("submitQuote", () => {
  it("returns success for valid input", async () => {
    const r = await submitQuote(base, "1.1.1.1", "/services/website-design");
    expect(r.ok).toBe(true);
  });

  it("returns validation error for bad email", async () => {
    const r = await submitQuote({ ...base, email: "nope" }, "1.1.1.1", "/");
    expect(r.ok).toBe(false);
    expect(r.error).toContain("email");
  });

  it("rejects honeypot submissions silently", async () => {
    const r = await submitQuote({ ...base, website: "spammy" }, "1.1.1.1", "/");
    expect(r.ok).toBe(false);
  });

  it("rate limits after 3 submissions from same IP", async () => {
    for (let i = 0; i < 3; i++) await submitQuote(base, "5.5.5.5", "/");
    const r = await submitQuote(base, "5.5.5.5", "/");
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/too many/i);
  });
});
