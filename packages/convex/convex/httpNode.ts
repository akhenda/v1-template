'use node';

import { v } from 'convex/values';

import { internalAction } from './_generated/server';
import { handleClerkWebhookEvent, svixHeadersSchema } from './libs/utils/analytics';

export const handleClerkWebhook = internalAction({
  args: { headers: svixHeadersSchema, body: v.string() },
  handler: (ctx, { headers, body }) => handleClerkWebhookEvent(ctx, headers, body),
});
