// gloood-site/lib/content.test.ts
import { describe, it, expect } from "vitest";
import { getCaseStudies, getCaseStudy, getInsights, getInsight } from "./content";

describe("content loader", () => {
  it("returns case studies sorted by year descending", async () => {
    const all = await getCaseStudies();
    expect(all.length).toBeGreaterThan(0);
    expect(all[0]).toHaveProperty("slug");
    expect(all[0]).toHaveProperty("title");
    expect(all[0]).toHaveProperty("tags");
    for (let i = 1; i < all.length; i++) {
      expect(all[i - 1].year).toBeGreaterThanOrEqual(all[i].year);
    }
  });

  it("filters by tag", async () => {
    const web = await getCaseStudies({ tag: "web" });
    expect(web.every(c => c.tags.includes("web"))).toBe(true);
  });

  it("returns a single case study by slug", async () => {
    const all = await getCaseStudies();
    const one = await getCaseStudy(all[0].slug);
    expect(one?.slug).toBe(all[0].slug);
    expect(one?.content).toBeTypeOf("string");
  });

  it("returns null for missing slug", async () => {
    const one = await getCaseStudy("does-not-exist");
    expect(one).toBeNull();
  });
});

describe("insights loader", () => {
  it("returns insights sorted by publish_date desc", async () => {
    const all = await getInsights();
    expect(all.length).toBeGreaterThan(0);
    for (let i = 1; i < all.length; i++) {
      expect(all[i - 1].publish_date >= all[i].publish_date).toBe(true);
    }
  });
  it("returns a single insight by slug", async () => {
    const all = await getInsights();
    const one = await getInsight(all[0].slug);
    expect(one?.slug).toBe(all[0].slug);
  });
});
