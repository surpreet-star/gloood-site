// gloood-site/lib/rate-limit.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { checkRateLimit, _resetForTests } from "./rate-limit";

beforeEach(() => _resetForTests());

describe("checkRateLimit", () => {
  it("allows first N requests, blocks (N+1)", async () => {
    const ip = "1.2.3.4";
    for (let i = 0; i < 3; i++) {
      expect((await checkRateLimit(ip)).allowed).toBe(true);
    }
    expect((await checkRateLimit(ip)).allowed).toBe(false);
  });

  it("isolates by ip", async () => {
    for (let i = 0; i < 3; i++) await checkRateLimit("1.1.1.1");
    expect((await checkRateLimit("2.2.2.2")).allowed).toBe(true);
  });
});
