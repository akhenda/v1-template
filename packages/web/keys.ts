import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

import { keys as cms } from '@repo/cms/keys';
import { keys as email } from '@repo/email/keys';
import { keys as flags } from '@repo/feature-flags/keys';
import { keys as core } from '@repo/next-config/keys';
import { keys as observability } from '@repo/observability/keys';
import { keys as rateLimit } from '@repo/rate-limit/keys';
import { keys as security } from '@repo/security/keys';

export const keys = () =>
  createEnv({
    extends: [cms(), core(), email(), observability(), flags(), security(), rateLimit()],
    server: {},
    client: {
      NEXT_PUBLIC_API_BASE_URL: z.string().min(1).optional(),
    },
    runtimeEnv: {
      NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    },
  });
