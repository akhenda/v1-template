import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      SVIX_TOKEN: z
        .union([
          z.string().nonempty().startsWith('sk_'),
          z.string().nonempty().startsWith('testsk_'),
        ])
        .optional(),
    },
    runtimeEnv: {
      SVIX_TOKEN: process.env.SVIX_TOKEN,
    },
  });
