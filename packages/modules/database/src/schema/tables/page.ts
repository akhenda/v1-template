import { pgTable, serial, text } from 'drizzle-orm/pg-core';

// Define the 'Page' table schema for PostgreSQL
export const page = pgTable('Page', {
  // Corresponds to: id Int @id @default(autoincrement())
  // 'serial' creates an auto-incrementing integer primary key in PostgreSQL
  id: serial('id').primaryKey(),

  // Corresponds to: name String
  // Prisma's String maps typically to 'text' in Postgres unless constrained.
  // Prisma fields are non-nullable by default, so we add .notNull()
  name: text('name').notNull(),
});

// You might also want to define types for easier usage (optional but recommended)
export type Page = typeof page.$inferSelect; // type for select operations
export type NewPage = typeof page.$inferInsert; // type for insert operations
