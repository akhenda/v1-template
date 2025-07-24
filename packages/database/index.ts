import 'server-only';

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import { keys } from './keys';
import * as schema from './src/schema';

const client = neon(keys().DATABASE_URL);

export * from './src/schema';
export const database = drizzle({ client, schema });
