import { test, expect } from "@playwright/test";

test("home renders hero + CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/convert/i);
  await expect(page.getByRole("link", { name: /get a quote/i }).first()).toBeVisible();
});

test("work index loads and links to a case study", async ({ page }) => {
  await page.goto("/work");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/our work/i);
  await page.getByRole("link").filter({ hasText: /king of kurry/i }).first().click();
  await expect(page).toHaveURL(/\/work\/king-of-kurry/);
});

test("contact page has the form", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByLabel(/name/i)).toBeVisible();
  await expect(page.getByLabel(/email/i)).toBeVisible();
});
