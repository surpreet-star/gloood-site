// gloood-site/lib/schema.ts
import { z } from "zod";

export const BUNDLES = ["launch", "grow", "launch-grow", "revamp"] as const;
export const BUDGETS = ["under-50k", "50k-1L", "1L-3L", "3L-plus", "not-sure"] as const;

export const QuoteFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  bundle: z.enum(BUNDLES),
  budget: z.enum(BUDGETS),
  message: z.string().min(1, "Tell us what you need"),
  turnstileToken: z.string().min(1),
  website: z.string().max(0).optional(), // honeypot — must be empty
});

export type QuoteFormInput = z.infer<typeof QuoteFormSchema>;
