// gloood-site/lib/schema.test.ts
import { describe, it, expect } from "vitest";
import { QuoteFormSchema } from "./schema";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  phone: "+91 98765 43210",
  bundle: "launch",
  budget: "50k-1L",
  message: "We need a new site.",
  turnstileToken: "test-token",
};

describe("QuoteFormSchema", () => {
  it("accepts a valid submission", () => {
    expect(QuoteFormSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(QuoteFormSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
  });

  it("rejects empty name", () => {
    expect(QuoteFormSchema.safeParse({ ...valid, name: "" }).success).toBe(false);
  });

  it("rejects unknown bundle", () => {
    expect(QuoteFormSchema.safeParse({ ...valid, bundle: "mystery" }).success).toBe(false);
  });

  it("makes phone optional", () => {
    const { phone, ...rest } = valid;
    expect(QuoteFormSchema.safeParse(rest).success).toBe(true);
  });

  it("requires turnstileToken", () => {
    const { turnstileToken, ...rest } = valid;
    expect(QuoteFormSchema.safeParse(rest).success).toBe(false);
  });
});
