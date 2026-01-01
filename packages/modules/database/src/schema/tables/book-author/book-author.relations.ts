import { relations } from 'drizzle-orm';

import { book } from '../book/book.table';
import { user } from '../user/user.table';

import { bookAuthor } from './book-author.table';

export const bookAuthorRelations = relations(bookAuthor, ({ one }) => ({
  author: one(user, { fields: [bookAuthor.authorId], references: [user.id] }),
  book: one(book, { fields: [bookAuthor.bookId], references: [book.id] }),
}));
