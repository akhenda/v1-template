import { getTableName, sql, type Table } from 'drizzle-orm';

import { keys } from '../keys';

import { connection, db } from './drizzle';
import { type DB, schema } from './schema';
import * as seeds from './seeds';

const env = keys();

if (!env.DB_SEEDING) throw new Error('You must set DB_SEEDING to "true" when running seeds');

function resetTable(db: DB, table: Table) {
  return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`));
}

(async () => {
  for (const table of [schema.book, schema.user]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(db, table);
  }

  await seeds.book();
  await seeds.user();

  await connection.end();
})();
