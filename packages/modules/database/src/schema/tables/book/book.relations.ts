import { relations } from 'drizzle-orm';

import { bookAuthor } from '../book-author/book-author.table';
import { user } from '../user/user.table';

import { book } from './book.table';

export const bookRelations = relations(book, ({ one, many }) => ({
  authors: many(bookAuthor),
  borrower: one(user, { fields: [book.borrowerId], references: [user.id] }),
}));
