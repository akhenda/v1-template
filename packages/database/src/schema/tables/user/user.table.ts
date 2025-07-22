import { index, pgTable, uniqueIndex } from 'drizzle-orm/pg-core';

import { getColumns } from '../columns';

const tableName = 'user';
const {
  id,
  name,
  avatarUrl,
  phone,
  phoneVerified,
  email,
  emailVerified,
  confirmationCode,
  password,
  role,
  clerkUserId,
  createdAt,
  updatedAt,
} = getColumns();

export const user = pgTable(
  tableName,
  {
    id,
    name,
    avatarUrl,
    phone,
    phoneVerified,
    email,
    emailVerified,
    confirmationCode,
    password,
    role,
    clerkUserId,
    createdAt,
    updatedAt,
  },
  (table) => [
    uniqueIndex(`${tableName}_email_idx`).on(table.email),
    uniqueIndex(`${tableName}_phone_idx`).on(table.phone),
    index(`${tableName}_role_idx`).on(table.role),
    uniqueIndex(`${tableName}_clerk_user_id_idx`).on(table.clerkUserId),
    // Useful for "find user by email OR phone"
    index(`${tableName}_email_phone_idx`).on(table.email, table.phone),
  ],
);

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
