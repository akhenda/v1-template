// https://stackoverflow.com/questions/76559107/foreign-key-constraints-not-allowed-using-drizzle-orm
// https://planetscale.com/blog/working-with-related-data-using-drizzle-and-planetscale
// https://planetscale.com/docs/learn/operating-without-foreign-key-constraints#why-does-planetscale-not-recommend-constraints-
// https://planetscale.com/blog/challenges-of-supporting-foreign-key-constraints
import { boolean, integer, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { monotonicFactory } from 'ulid';

import type { Union2Tuple } from '@repo/types';

export const ulid = monotonicFactory();

export const roles = {
  AUTHOR: 'AUTHOR',
  READER: 'READER',
  ADMIN: 'ADMIN',
  LIBRARIAN: 'LIBRARIAN',
} as const;

export type Role = (typeof roles)[keyof typeof roles];
export type Roles = Union2Tuple<Role>;
export const roleNames = Object.values(roles) as Roles;

export const getULID = (prefix: string) => `${prefix}${ulid()}`;

export function getId<T extends string>(name: T) {
  let prefix = '';

  if (name === 'users') prefix = 'U_';
  if (name === 'books') prefix = 'BK_';

  return text('id')
    .primaryKey()
    .$defaultFn(() => getULID(prefix));
}

export function getColumns() {
  return {
    /**
     * User
     */
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    avatarUrl: varchar('avatar_url', { length: 255 }).notNull(),
    phone: varchar('contact_phone', { length: 20 }).unique().notNull(),
    phoneVerified: boolean('phone_verified').default(false),
    email: varchar('email', { length: 255 }).unique().notNull(),
    emailVerified: boolean('email_verified').default(false),
    confirmationCode: varchar('confirmation_code', { length: 8 }),
    password: text('password').notNull(),
    role: varchar('role', { enum: roleNames, length: 50 }).default(roles.READER).notNull(),
    clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull().unique(),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),

    /**
     * Book
     */
    title: varchar('title', { length: 255 }).notNull(),
    genre: varchar('genre', { length: 255 }).notNull(),
    isbn: varchar('isbn', { length: 20 }).notNull(),
    authorId: integer('author_id').notNull(),
    // Can be null if the book isn't borrowed
    borrowerId: integer('borrower_id'),

    /**
     * Book Authors
     */
    bookId: integer('book_id').notNull(),
  };
}
