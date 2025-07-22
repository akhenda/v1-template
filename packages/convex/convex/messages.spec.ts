import { convexTest } from 'convex-test';

import { expect, test } from 'vitest';

import { api } from './_generated/api.js';
import schema from './schema.js';
import { modules } from './test.setup.js';

test('sending messages', async () => {
  const t = convexTest(schema, modules);

  await t.mutation(api.messages.send, { body: 'Hi!', author: 'Jerry' });
  await t.mutation(api.messages.send, { body: 'Hey!', author: 'Tom' });

  const messages = await t.query(api.messages.list);

  expect(messages).toMatchObject([
    { body: 'Hi!', author: 'Jerry' },
    { body: 'Hey!', author: 'Tom' },
  ]);
});
