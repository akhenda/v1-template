import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      EXAMPLE_VAR: z
        .union([z.string().startsWith('sk_'), z.string().startsWith('testsk_')])
        .optional(),
    },
    runtimeEnv: {
      EXAMPLE_VAR: process.env.EXAMPLE_VAR,
    },
  });
