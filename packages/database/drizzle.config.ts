import { defineConfig } from 'drizzle-kit';

import { keys } from './keys';

export default defineConfig({
  schema: './src/schema/index.ts',
  out: keys().DB_MIGRATION_DIR,
  dialect: 'postgresql',
  dbCredentials: { url: keys().DATABASE_URL },
  verbose: true,
  strict: true,
});
