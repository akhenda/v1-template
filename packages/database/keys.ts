import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const stringBoolean = z.coerce
  .string()
  .transform((val) => val === 'true')
  .default('false');

export const keys = () =>
  createEnv({
    server: {
      NODE_ENV: z.string().default('development'),
      // DB_HOST: z.string(),
      // DB_USER: z.string(),
      // DB_PASSWORD: z.string(),
      // DB_NAME: z.string(),
      // DB_PORT: z.coerce.number(),
      DATABASE_URL: z.string().min(1).url(),
      DB_MIGRATION_DIR: z.string().default('./src/migrations'),
      DB_MIGRATING: stringBoolean,
      DB_SEEDING: stringBoolean,
      DB_LOG_LEVEL: z.enum(['info', 'warn', 'error', 'debug', 'trace']).default('info'),
    },
    runtimeEnv: {
      NODE_ENV: process.env.NODE_ENV,
      // DB_HOST: process.env.DB_HOST,
      // DB_USER: process.env.DB_USER,
      // DB_PASSWORD: process.env.DB_PASSWORD,
      // DB_NAME: process.env.DB_NAME,
      // DB_PORT: process.env.DB_PORT,
      DATABASE_URL: process.env.DATABASE_URL,
      DB_MIGRATION_DIR: process.env.DB_MIGRATION_DIR,
      DB_MIGRATING: process.env.DB_MIGRATING,
      DB_SEEDING: process.env.DB_SEEDING,
      DB_LOG_LEVEL: process.env.DB_LOG_LEVEL,
    },
  });
