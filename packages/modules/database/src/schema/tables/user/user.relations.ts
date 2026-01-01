import { relations } from 'drizzle-orm';

import { book } from '../book/book.table';
import { bookAuthor } from '../book-author/book-author.table';

import { user } from './user.table';

export const userRelations = relations(user, ({ many }) => ({
  booksAuthored: many(bookAuthor),
  booksBorrowed: many(book),
}));
