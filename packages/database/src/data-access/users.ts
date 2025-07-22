import { eq } from 'drizzle-orm';

import { db } from '../drizzle';
import type { InsertedRecord } from '../schema';
import { tables } from '../schema';
import { logger } from '../utils';

type TableName = 'user';

const query = db.query.user;
const table = tables.user;

/**
 * Creates a new user in the database.
 *
 * @param newRecord - The new user to insert, without an id (which will be generated).
 * @returns The new user, with an id.
 * @throws If the user cannot be inserted (e.g. due to a unique constraint violation).
 */
async function create(newRecord: InsertedRecord<TableName>) {
  logger.debug('create user', newRecord);

  try {
    const [user] = await db.insert(table).values(newRecord).returning();

    logger.debug('created user', user);

    return user;
  } catch (error) {
    logger.error('failed to create user', error as Error);

    throw error;
  }
}

/**
 * Finds a user by their ID.
 *
 * @param id - The ID of the user to find.
 * @returns The user with the given ID, or `undefined` if no user is found.
 */
async function findById(id: number) {
  logger.debug('find user by id', { id });

  const user = await query.findFirst({ where: (t, { eq }) => eq(t.id, id) });

  logger.debug('found user', user);

  return user;
}

/**
 * Finds a user by their email.
 *
 * @param email - The email of the user to find.
 * @returns The user with the given email, or `undefined` if no user is found.
 */
async function findByEmail(email: string) {
  logger.debug('find user by email', { email });

  const user = await query.findFirst({ where: (t, { eq }) => eq(t.email, email) });

  logger.debug('found user', user);

  return user;
}

/**
 * Finds all user records in the database.
 *
 * @returns An array of all user records in the database.
 */
function findAll() {
  logger.debug('find all users');

  return query.findMany();
}

/**
 * Updates a user record in the database.
 *
 * @param id - The ID of the user to update.
 * @param data - The new data to update the user with.
 * @returns The updated user record.
 * @throws If the update operation fails.
 */
async function update(id: number, data: InsertedRecord<TableName>) {
  logger.debug('update user', { id, data });

  try {
    const [updatedUser] = await db.update(table).set(data).where(eq(table.id, id)).returning();

    logger.debug('updated user', updatedUser);

    return updatedUser;
  } catch (error) {
    logger.error('failed to update user', error as Error);

    throw error;
  }
}

/**
 * Deletes a user by their ID.
 *
 * @param id - The ID of the user to delete.
 * @returns The deleted user, or `undefined` if no user is found.
 * @throws If the user cannot be deleted (e.g. due to a unique constraint violation).
 */
async function deleteById(id: number) {
  logger.debug('delete user by id', { id });

  try {
    const [deletedUser] = await db.delete(table).where(eq(table.id, id)).returning();

    return deletedUser;
  } catch (error) {
    logger.error('failed to delete user', error as Error);

    throw error;
  }
}

export default {
  create,
  findById,
  findByEmail,
  findAll,
  update,
  delete: deleteById,
};
