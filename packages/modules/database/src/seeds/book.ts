import dal from '../data-access';
import { logger } from '../utils';

import books from './fixtures/books.json' with { type: 'json' };

export default async function seed() {
  logger.info('Seeding books...');

  await Promise.all(
    books.map(async (book) => {
      await dal.books.create({ ...book, borrowerId: null });
    }),
  );
}
