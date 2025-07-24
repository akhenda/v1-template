import { vercel } from '@t3-oss/env-core/presets-zod';
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    extends: [vercel()],
    server: {
      ANALYZE: z.string().optional(),
      MILLION_LINT: z
        .string()
        // transform to boolean using preferred coercion logic
        .transform((s) => s !== 'false' && s !== '0')
        .default('false'),

      // Added by Vercel
      NEXT_RUNTIME: z.enum(['nodejs', 'edge']).optional(),
    },
    client: {
      NEXT_PUBLIC_APP_URL: z.string().min(1).url(),
      NEXT_PUBLIC_WEB_URL: z.string().min(1).url(),
      NEXT_PUBLIC_API_URL: z.string().min(1).url().optional(),
      NEXT_PUBLIC_DOCS_URL: z.string().min(1).url().optional(),
    },
    runtimeEnv: {
      ANALYZE: process.env.ANALYZE,
      MILLION_LINT: process.env.MILLION_LINT,
      NEXT_RUNTIME: process.env.NEXT_RUNTIME,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
    },
  });
