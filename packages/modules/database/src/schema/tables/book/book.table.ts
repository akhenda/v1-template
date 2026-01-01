import { index, pgTable } from 'drizzle-orm/pg-core';

import { getColumns } from '../columns';

const tableName = 'book';
const { id, title, genre, isbn, borrowerId, createdAt, updatedAt } = getColumns();

export const book = pgTable(
  tableName,
  { id, title, genre, borrowerId, isbn, createdAt, updatedAt },
  (table) => [
    index(`${tableName}_borrower_id_idx`).on(table.borrowerId),
    index(`${tableName}_isbn_idx`).on(table.isbn), // Indexing ISBN for quick lookups
  ],
);

export type Book = typeof book.$inferSelect;
export type NewBook = typeof book.$inferInsert;
