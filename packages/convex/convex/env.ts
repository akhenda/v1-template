import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

import { keys as ai } from '@repo/ai/keys';

export const env = createEnv({
  extends: [ai()],
  server: {
    SITE_URL: z.string().url(),
    CONVEX_SITE_URL: z.string().url(),
    DEV_CACHE_TTL: z
      .number()
      .int()
      .default(60 * 10)
      .describe('Cache TTL in seconds (default: 2 minutes)'), // 2 minutes
    PROD_CACHE_TTL: z
      .number()
      .int()
      .default(60 * 60 * 24 * 90)
      .describe('Cache TTL in seconds (default: 90 days)'), // 90 days

    // Loops
    LOOPS_FORM_ID: z.optional(z.string().nonempty()),

    // Resend
    RESEND_API_KEY: z.optional(z.string().nonempty()),
    RESEND_SENDER_EMAIL_AUTH: z.optional(z.string().email()),

    // Clerk
    CLERK_SECRET_KEY: z.string().nonempty().startsWith('sk_'),
    CLERK_FRONTEND_API_URL: z.string().nonempty().url(),
    CLERK_WEBHOOK_SECRET: z.string().nonempty().startsWith('whsec_'),

    // Polar
    POLAR_SERVER: z.enum(['sandbox', 'production']).default('production').describe('Polar server'),
    POLAR_ACCESS_TOKEN: z.string().nonempty().describe('Polar personal API access token'),
    POLAR_ORGANIZATION_ID: z.string().nonempty().describe('Polar organization ID'),
    POLAR_ORGANIZATION_TOKEN: z.string().nonempty().describe('Polar organization token'),
    POLAR_WEBHOOK_SECRET: z.string().nonempty(),
    POLAR_PRODUCT_FREE: z.string().default('product-id'),
    POLAR_PRODUCT_LEGEND: z.string().default('product-id'),
    POLAR_PRODUCT_PRO_MONTHLY: z.string().default('product-id'),
    POLAR_PRODUCT_PRO_YEARLY: z.string().default('product-id'),
    POLAR_PRODUCT_PLUS_SMALL_PACK: z.string().default('product-id'),
    POLAR_PRODUCT_PLUS_MEDIUM_PACK: z.string().default('product-id'),
    POLAR_PRODUCT_PLUS_LARGE_PACK: z.string().default('product-id'),
  },
  runtimeEnv: {
    CONVEX_SITE_URL: process.env.CONVEX_SITE_URL,
    SITE_URL: process.env.SITE_URL,
    DEV_CACHE_TTL: process.env.DEV_CACHE_TTL,
    PROD_CACHE_TTL: process.env.PROD_CACHE_TTL,

    // Loops
    LOOPS_FORM_ID: process.env.LOOPS_FORM_ID,

    // Resend
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_SENDER_EMAIL_AUTH: process.env.RESEND_SENDER_EMAIL_AUTH,

    // Clerk
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CLERK_FRONTEND_API_URL: process.env.CLERK_FRONTEND_API_URL,
    CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,

    // Polar
    POLAR_SERVER: process.env.POLAR_SERVER,
    POLAR_ACCESS_TOKEN: process.env.POLAR_ACCESS_TOKEN,
    POLAR_ORGANIZATION_ID: process.env.POLAR_ORGANIZATION_ID,
    POLAR_ORGANIZATION_TOKEN: process.env.POLAR_ORGANIZATION_TOKEN,
    POLAR_WEBHOOK_SECRET: process.env.POLAR_WEBHOOK_SECRET,
    POLAR_PRODUCT_FREE: process.env.POLAR_PRODUCT_FREE,
    POLAR_PRODUCT_LEGEND: process.env.POLAR_PRODUCT_LEGEND,
    POLAR_PRODUCT_PRO_MONTHLY: process.env.POLAR_PRODUCT_PRO_MONTHLY,
    POLAR_PRODUCT_PRO_YEARLY: process.env.POLAR_PRODUCT_PRO_YEARLY,
    POLAR_PRODUCT_PLUS_SMALL_PACK: process.env.POLAR_PRODUCT_PLUS_SMALL_PACK,
    POLAR_PRODUCT_PLUS_MEDIUM_PACK: process.env.POLAR_PRODUCT_PLUS_MEDIUM_PACK,
    POLAR_PRODUCT_PLUS_LARGE_PACK: process.env.POLAR_PRODUCT_PLUS_LARGE_PACK,
  },
  skipValidation: !process.env.VALIDATE_ENV,
});
