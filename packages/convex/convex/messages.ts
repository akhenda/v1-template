import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const send = mutation({
  args: { author: v.string(), body: v.string() },
  handler: async (ctx, { author, body }) => {
    await ctx.db.insert('messages', { author, body });
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query('messages').collect();
  },
});
