import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      EXAMPLE_ENV_VAR: z.string().min(1).optional(),
    },
    runtimeEnv: {
      EXAMPLE_ENV_VAR: process.env.EXAMPLE_ENV_VAR,
    },
  });
