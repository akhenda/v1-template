import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { keys } from '../keys';

import { connection, db } from './drizzle.js';

const env = keys();

if (!env.DB_MIGRATING) {
  throw new Error('You must set DB_MIGRATING to "true" when running migrations');
}

(async () => {
  await migrate(db, { migrationsFolder: env.DB_MIGRATION_DIR });

  await connection.end();
})();
