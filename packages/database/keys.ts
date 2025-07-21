import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      DATABASE_URL: z.string().min(1).url(),
      DB_MIGRATION_DIR: z.string().default('./src/migrations'),
    },
    runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
      DB_MIGRATION_DIR: process.env.DB_MIGRATION_DIR,
    },
  });
