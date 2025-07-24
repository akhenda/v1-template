'use node';

import { type Infer, v } from 'convex/values';
import { nullable } from 'convex-helpers/validators';

import { PostHog } from 'posthog-node';
import { Webhook } from 'svix';

import type {
  DeletedObjectJSON,
  OrganizationJSON,
  OrganizationMembershipJSON,
  UserJSON,
  WebhookEvent,
} from '@repo/auth/server';
import { tryCatch } from '@repo/web/core/utils/errors';

import { internal } from '../../_generated/api';
import type { ActionCtx } from '../../_generated/server';
import { env } from '../../env';

import { log } from './logger';

export const svixHeadersSchema = v.object({
  svixId: nullable(v.string()),
  svixTimestamp: nullable(v.string()),
  svixSignature: nullable(v.string()),
});

export type SVIXHeaders = Infer<typeof svixHeadersSchema>;
export type ClerkWebhookResponse = {
  payload: string;
  status: number;
  headers?: { 'Content-Type': string };
};

export const analytics = new PostHog(env.POSTHOG_KEY, {
  host: env.POSTHOG_HOST,

  // Don't batch events and flush immediately - we're running in a serverless environment
  flushAt: 1,
  flushInterval: 0,
});

const handleUserCreated = async (ctx: ActionCtx, data: UserJSON) => {
  await ctx.runMutation(internal.users.upsertFromClerk, { data });

  analytics.identify({
    distinctId: data.id,
    properties: {
      email: data.email_addresses.at(0)?.email_address,
      firstName: data.first_name,
      lastName: data.last_name,
      createdAt: new Date(data.created_at),
      avatar: data.image_url,
      phoneNumber: data.phone_numbers.at(0)?.phone_number,
    },
  });

  analytics.capture({ event: 'User Created', distinctId: data.id });

  return { payload: 'User created', status: 201 };
};

const handleUserUpdated = async (ctx: ActionCtx, data: UserJSON) => {
  await ctx.runMutation(internal.users.upsertFromClerk, { data });

  analytics.identify({
    distinctId: data.id,
    properties: {
      email: data.email_addresses.at(0)?.email_address,
      firstName: data.first_name,
      lastName: data.last_name,
      createdAt: new Date(data.created_at),
      avatar: data.image_url,
      phoneNumber: data.phone_numbers.at(0)?.phone_number,
    },
  });

  analytics.capture({ event: 'User Updated', distinctId: data.id });

  return { payload: 'User updated', status: 201 };
};

const handleUserDeleted = async (ctx: ActionCtx, data: DeletedObjectJSON) => {
  if (data.id) {
    await ctx.runMutation(internal.users.deleteFromClerk, { clerkUserId: data.id });

    analytics.identify({ distinctId: data.id, properties: { deleted: new Date() } });
    analytics.capture({ event: 'User Deleted', distinctId: data.id });
  }

  return { payload: 'User deleted', status: 201 };
};

const handleOrganizationCreated = (data: OrganizationJSON) => {
  analytics.groupIdentify({
    groupKey: data.id,
    groupType: 'company',
    distinctId: data.created_by,
    properties: { name: data.name, avatar: data.image_url },
  });

  if (data.created_by) {
    analytics.capture({ event: 'Organization Created', distinctId: data.created_by });
  }

  return { payload: 'Organization created', status: 201 };
};

const handleOrganizationUpdated = (data: OrganizationJSON) => {
  analytics.groupIdentify({
    groupKey: data.id,
    groupType: 'company',
    distinctId: data.created_by,
    properties: { name: data.name, avatar: data.image_url },
  });

  if (data.created_by) {
    analytics.capture({ event: 'Organization Updated', distinctId: data.created_by });
  }

  return { payload: 'Organization updated', status: 201 };
};

const handleOrganizationMembershipCreated = (data: OrganizationMembershipJSON) => {
  analytics.groupIdentify({
    groupKey: data.organization.id,
    groupType: 'company',
    distinctId: data.public_user_data.user_id,
  });

  analytics.capture({
    event: 'Organization Member Created',
    distinctId: data.public_user_data.user_id,
  });

  return { payload: 'Organization membership created', status: 201 };
};

const handleOrganizationMembershipDeleted = (data: OrganizationMembershipJSON) => {
  // Need to unlink the user from the group

  analytics.capture({
    event: 'Organization Member Deleted',
    distinctId: data.public_user_data.user_id,
  });

  return { payload: 'Organization membership deleted', status: 201 };
};

export function validateClerkWebhookRequest(
  reqHeaders: SVIXHeaders,
  reqBody: string,
): WebhookEvent {
  // Get the headers
  const { svixId, svixTimestamp, svixSignature } = reqHeaders;

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    throw new Error('Error occured -- no svix headers');
  }

  // Get the body
  const body = reqBody;

  // Create a new SVIX instance with your secret.
  const webhook = new Webhook(env.CLERK_WEBHOOK_SECRET);

  let event: WebhookEvent | undefined;

  // Verify the payload with the headers
  try {
    const svixHeaders = {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    };

    event = webhook.verify(body, svixHeaders) as WebhookEvent;
  } catch {
    throw new Error('Error verifying webhook event');
  }

  // Get the ID and type
  const { id } = event.data;
  const eventType = event.type;

  log.info('Webhook', { id, eventType });

  return event;
}

export async function handleClerkWebhookEvent(
  ctx: ActionCtx,
  svixHeaders: SVIXHeaders,
  reqBody: string,
): Promise<ClerkWebhookResponse> {
  if (!env.CLERK_WEBHOOK_SECRET) {
    log.error('Error occured -- CLERK_WEBHOOK_SECRET Not configured');

    return {
      payload: JSON.stringify({ message: 'Not configured', ok: false }),
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    };
  }

  const [event, error] = tryCatch(validateClerkWebhookRequest(svixHeaders, reqBody));

  if (error) {
    log.error(error.message, { error });

    return { payload: error.message, status: 400 };
  }

  let response: ClerkWebhookResponse = { payload: '', status: 201 };

  switch (event.type) {
    case 'user.created': {
      response = await handleUserCreated(ctx, event.data);
      break;
    }
    case 'user.updated': {
      response = await handleUserUpdated(ctx, event.data);
      break;
    }
    case 'user.deleted': {
      response = await handleUserDeleted(ctx, event.data);
      break;
    }
    case 'organization.created': {
      response = handleOrganizationCreated(event.data);
      break;
    }
    case 'organization.updated': {
      response = handleOrganizationUpdated(event.data);
      break;
    }
    case 'organizationMembership.created': {
      response = handleOrganizationMembershipCreated(event.data);
      break;
    }
    case 'organizationMembership.deleted': {
      response = handleOrganizationMembershipDeleted(event.data);
      break;
    }
    default: {
      break;
    }
  }

  await analytics.shutdown();

  return response;
}
