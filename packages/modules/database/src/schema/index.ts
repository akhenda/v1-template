import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import type { TableNames } from './tables';
import { relations, tables } from './tables';

export * from './tables';

export const schema = { ...tables, ...relations } as const;

export type Schema = typeof schema;
export type DB = PostgresJsDatabase<Schema>;
export type Query<T extends TableNames> = DB['query'][T];
