import { index, pgTable, primaryKey } from 'drizzle-orm/pg-core';

import { getColumns } from '../columns';

const tableName = 'book-author';
const { authorId, bookId } = getColumns();

export const bookAuthor = pgTable(tableName, { authorId, bookId }, (table) => [
  primaryKey({ columns: [table.bookId, table.authorId] }),
  index(`${tableName}_book_id_idx`).on(table.bookId),
  index(`${tableName}_author_id_idx`).on(table.authorId),
]);

export type BookAuthor = typeof bookAuthor.$inferSelect;
export type NewBookAuthor = typeof bookAuthor.$inferInsert;
