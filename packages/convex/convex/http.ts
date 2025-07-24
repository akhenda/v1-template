import { httpRouter } from 'convex/server';

import type { AnyValue } from '@repo/types';

import { internal } from './_generated/api';
import { httpAction } from './_generated/server';
import { polar } from './billing';
import { log } from './libs/utils/logger';
import { UserModel } from './model';

const http = httpRouter();

http.route({
  path: '/webhooks/clerk/users',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    // Get the headers
    const headerPayload = request.headers;
    const svixId = headerPayload.get('svix-id');
    const svixTimestamp = headerPayload.get('svix-timestamp');
    const svixSignature = headerPayload.get('svix-signature');
    const svixHeaders = { svixId, svixTimestamp, svixSignature };

    // Get the body
    const body = await request.text();

    // Get the response
    const response = await ctx.runAction(internal.httpNode.handleClerkWebhook, {
      headers: svixHeaders,
      body,
    });

    return new Response(response.payload, { status: response.status, headers: response.headers });
  }),
});

// Register the webhook handler at /polar/events
polar.registerRoutes(http as AnyValue, {
  path: '/webhooks/polar/events',
  // Optional callbacks for webhook events
  onSubscriptionUpdated: async (ctx, event) => {
    // Handle subscription updates, like cancellations.
    // Note that a cancelled subscription will not be deleted from the database,
    // so this information remains available without a hook, eg., via
    // `getCurrentSubscription()`.
    if (event.data.customerCancellationReason) {
      log.info('Customer cancelled:', event.data.customerCancellationReason);
    }

    const user = await ctx.runQuery(internal.users.getPolarUserInfo, {
      email: event.data.customer.email,
    });

    if (!user) return;

    const plan = UserModel.getUserPlan(event.data.product.id);
    const subscriptionStatus = event.data.status;
    const subscriptionId = event.data.id;
    const nextRenewal = event.data.currentPeriodEnd?.valueOf();

    // use the user's billing info to update what we don't have
    // const name = user.fullName ?? event.data.customer.name ?? '';
    // const [newFirstName, newLastName] = name.split(' ');
    // const firstName = user.firstName ?? newFirstName;
    // const lastName = user.lastName ?? newLastName;

    await ctx.runMutation(internal.users.patchUser, {
      userId: user._id,
      data: { plan, subscriptionStatus, subscriptionId, nextRenewal },
    });
  },
});

export default http;
