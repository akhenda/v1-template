import { HOUR, MINUTE, RateLimiter } from '@convex-dev/rate-limiter';

import { components } from '../../_generated/api';

/*********************** 1. Rate Limiter ****************************/
export const rateLimiter = new RateLimiter(components.rateLimiter, {
  // One global / singleton rate limit, using a "fixed window" algorithm.
  freeTrialSignUp: { kind: 'fixed window', rate: 100, period: HOUR },

  // A per-user limit, allowing one every ~6 seconds.
  // Allows up to 3 in quick succession if they haven't sent many recently.
  sendMessage: { kind: 'token bucket', rate: 10, period: MINUTE, capacity: 3 },

  failedLogins: { kind: 'token bucket', rate: 10, period: HOUR },

  // Use sharding to increase throughput without compromising on correctness.
  llmTokens: { kind: 'token bucket', rate: 40000, period: MINUTE, shards: 10 },

  llmRequests: { kind: 'fixed window', rate: 1000, period: MINUTE, shards: 10 },

  // One global AI rate‑limit: 30 requests per minute (token‑bucket).
  aiGlobal: { kind: 'token bucket', rate: 30, period: MINUTE, capacity: 30 },
  // no burst beyond 30
});
