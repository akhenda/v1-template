import { eq } from 'drizzle-orm';

import { db } from '../drizzle';
import { tables } from '../schema';
import { logger } from '../utils';

const query = db.query.bookAuthor;
const table = tables.bookAuthor;

/**
 * Creates a book author relationship.
 *
 * @param bookId The ID of the book.
 * @param authorId The ID of the author.
 *
 * @throws If the relationship already exists.
 *
 * @returns The created book author relationship.
 */
async function create(bookId: number, authorId: number) {
  logger.debug('create book author', { bookId, authorId });

  try {
    const [bookAuthor] = await db.insert(table).values({ bookId, authorId }).returning();

    logger.debug('created book author', bookAuthor);

    return bookAuthor;
  } catch (error) {
    logger.error('failed to create book author', error as Error);

    throw error;
  }
}

/**
 * Deletes a book author relationship by its ID.
 *
 * @param id The ID of the book author to delete.
 *
 * @throws If the relationship does not exist.
 *
 * @returns The deleted book author relationship.
 */
function deleteById(id: number) {
  logger.debug('delete book author', { id });

  try {
    return db.delete(table).where(eq(table.bookId, id));
  } catch (error) {
    logger.error('failed to delete book author', error as Error);

    throw error;
  }
}

/**
 * Finds all book authors by the given book IDs.
 *
 * @param bookIds The IDs of the books to find authors for.
 *
 * @returns The book authors found.
 */
async function findByBookIds(bookIds: number[]) {
  logger.debug('find book authors by book ids', bookIds);

  return query.findMany({ where: (t, { inArray }) => inArray(t.bookId, bookIds) });
}

export default {
  create,
  delete: deleteById,
  findByBookIds,
};
