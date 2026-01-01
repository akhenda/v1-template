import { defineEnv } from 'envin';
import { z } from 'zod';

import { NodeEnv } from './src/types';

export default defineEnv({
  shared: {
    NODE_ENV: z.nativeEnum(NodeEnv).default(NodeEnv.DEVELOPMENT),
  },
  clientPrefix: 'WXT_',
  client: {
    WXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().nonempty().startsWith('pk_'),
    WXT_CLERK_FRONTEND_API: z.url().endsWith('accounts.dev'),
    WXT_CLERK_SYNC_HOST: z.url().nonempty(),

    WXT_PUBLIC_CONVEX_URL: z.url().nonempty(),

    WXT_PUBLIC_POSTHOG_KEY: z.string().nonempty().startsWith('phc_'),
    WXT_PUBLIC_POSTHOG_HOST: z.url().nonempty(),
  },
  env: {
    WXT_PUBLIC_CLERK_PUBLISHABLE_KEY: import.meta.env.WXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    WXT_CLERK_FRONTEND_API: import.meta.env.WXT_CLERK_FRONTEND_API,
    WXT_CLERK_SYNC_HOST: import.meta.env.WXT_CLERK_SYNC_HOST,

    WXT_PUBLIC_CONVEX_URL: import.meta.env.WXT_PUBLIC_CONVEX_URL,

    WXT_PUBLIC_POSTHOG_KEY: import.meta.env.WXT_PUBLIC_POSTHOG_KEY,
    WXT_PUBLIC_POSTHOG_HOST: import.meta.env.WXT_PUBLIC_POSTHOG_HOST,
  },
  skip:
    (!!import.meta.env.SKIP_ENV_VALIDATION &&
      ['1', 'true'].includes(import.meta.env.SKIP_ENV_VALIDATION)) ||
    import.meta.env.npm_lifecycle_event === 'lint',
});
