// gloood-site/lib/rate-limit.ts
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const LIMIT = 3;
const WINDOW = "1 h" as const;

type Result = { allowed: boolean; remaining: number };

let memory = new Map<string, { count: number; resetAt: number }>();

export function _resetForTests() { memory = new Map(); }

function memoryCheck(key: string): Result {
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.resetAt < now) {
    memory.set(key, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return { allowed: true, remaining: LIMIT - 1 };
  }
  if (entry.count >= LIMIT) return { allowed: false, remaining: 0 };
  entry.count += 1;
  return { allowed: true, remaining: LIMIT - entry.count };
}

let kvLimiter: Ratelimit | null = null;
function getKvLimiter(): Ratelimit | null {
  if (kvLimiter) return kvLimiter;
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  kvLimiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(LIMIT, WINDOW),
    analytics: true,
    prefix: "gloood:quote",
  });
  return kvLimiter;
}

export async function checkRateLimit(ip: string): Promise<Result> {
  const kv = getKvLimiter();
  if (!kv) return memoryCheck(ip);
  const r = await kv.limit(ip);
  return { allowed: r.success, remaining: r.remaining };
}
