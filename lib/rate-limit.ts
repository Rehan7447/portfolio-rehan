/**
 * Fixed-window rate limiting, in process memory.
 *
 * Deliberately dependency-free. The trade-off is that the window is per server
 * instance: on a platform that runs several lambdas the effective allowance is
 * the configured limit multiplied by the number of warm instances. That is
 * fine for what this guards — a public lead-intake endpoint where the goal is
 * blunting floods, not exact accounting. Swap in Upstash/Redis if this site
 * ever needs a hard global ceiling.
 */

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

// Bounded so a stream of unique keys can't grow the map without limit.
const MAX_TRACKED_KEYS = 5_000;

function sweep(now: number) {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key);
  }
  if (windows.size <= MAX_TRACKED_KEYS) return;
  // Still oversized after expiry sweep: drop oldest-inserted entries.
  const overflow = windows.size - MAX_TRACKED_KEYS;
  let dropped = 0;
  for (const key of windows.keys()) {
    windows.delete(key);
    if (++dropped >= overflow) break;
  }
}

export type RateLimitResult = {
  ok: boolean;
  limit: number;
  remaining: number;
  /** Seconds until the window resets. */
  retryAfter: number;
  resetAt: number;
};

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = windows.get(key);
  const window =
    existing && existing.resetAt > now
      ? existing
      : { count: 0, resetAt: now + windowMs };

  window.count += 1;
  windows.set(key, window);

  const remaining = Math.max(0, limit - window.count);
  return {
    ok: window.count <= limit,
    limit,
    remaining,
    retryAfter: Math.max(1, Math.ceil((window.resetAt - now) / 1000)),
    resetAt: window.resetAt,
  };
}

/**
 * Best-effort caller identity. Proxy headers are spoofable, so this throttles
 * honest clients and casual abuse — it is not a security boundary.
 */
export function clientKey(req: Request, prefix = "") {
  const headers = req.headers;
  const forwarded = headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "unknown";
  return `${prefix}${ip}`;
}

/** Headers that let a well-behaved agent back off instead of retrying blind. */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "RateLimit-Limit": String(result.limit),
    "RateLimit-Remaining": String(result.remaining),
    "RateLimit-Reset": String(result.retryAfter),
    ...(result.ok ? {} : { "Retry-After": String(result.retryAfter) }),
  };
}
