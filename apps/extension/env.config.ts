import { defineEnv } from 'envin';
import { z } from 'zod';

import { NodeEnv } from './src/types';

export default defineEnv({
  shared: {
    NODE_ENV: z.nativeEnum(NodeEnv).default(NodeEnv.DEVELOPMENT),
  },
  clientPrefix: 'WXT_',
  client: {
    WXT_CLERK_FRONTEND_API: z.string().url().endsWith('accounts.dev'),
    WXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().nonempty().startsWith('pk_'),
  },
  env: {
    WXT_CLERK_FRONTEND_API: import.meta.env.WXT_CLERK_FRONTEND_API,
    WXT_PUBLIC_CLERK_PUBLISHABLE_KEY: import.meta.env.WXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  skip:
    (!!import.meta.env.SKIP_ENV_VALIDATION &&
      ['1', 'true'].includes(import.meta.env.SKIP_ENV_VALIDATION)) ||
    import.meta.env.npm_lifecycle_event === 'lint',
});
