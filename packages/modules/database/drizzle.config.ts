import { join } from 'node:path';

import { defineConfig } from 'drizzle-kit';

import { keys } from './keys';

const schemaPath = join(__dirname, './src/schema/index.ts');

export default defineConfig({
  schema: schemaPath,
  out: keys().DB_MIGRATION_DIR,
  dialect: 'postgresql',
  dbCredentials: { url: keys().DATABASE_URL },
  verbose: true,
  strict: true,
});
