import { ConvexError, type Validator, v } from 'convex/values';

import type { UserJSON } from '@repo/auth/server';

import type { Doc } from './_generated/dataModel';
import {
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from './_generated/server';
import { polar } from './billing';
import { log } from './libs/utils/logger';
import * as Users from './model/users';
import { vv } from './schema';

export const current = query({ handler: async (ctx) => Users.getCurrentUser(ctx) });

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    await Users.getCurrentUserOrThrow(ctx);

    return ctx.storage.generateUploadUrl();
  },
});

export const assertCurrentUserCanAfford = internalQuery({
  args: { cost: v.number() },
  returns: vv.doc('users'),
  handler: async (ctx, { cost }) => Users.assertCurrentUserCanAfford(ctx, cost),
});

export const assertUserCanAfford = internalQuery({
  args: { cost: v.number(), userId: v.id('users') },
  returns: vv.doc('users'),
  handler: async (ctx, { cost, userId }) => Users.assertUserCanAfford(ctx, userId, cost),
});

// User query to use in the Polar component
export const getCurrentPolarUserInfo = internalQuery({
  handler: async (ctx) => {
    const user = await Users.getCurrentUser(ctx);

    if (!user) throw new ConvexError('User not found');
    if (!user.email) throw new ConvexError('User email is required');

    return { userId: user._id, email: user.email };
  },
});

export const getPolarUserInfo = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', email))
      .first();

    if (!user) throw new ConvexError('User not found');

    return user;
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {
    const clerkId = data.id;
    const avatarUrl = data.image_url;
    const username = data.username ?? '';
    const firstName = data.first_name ?? data.username ?? '';
    const lastName = data.last_name ?? '';
    const fullName = `${firstName} ${lastName}`.trim();
    const email = data.email_addresses.at(0)?.email_address ?? '';
    const onboarded = !!data.public_metadata.onboarded;

    const user = await Users.getUserByClerkId(ctx, data.id);
    const userAttributes = {
      clerkId,
      email,
      username,
      firstName,
      lastName,
      fullName,
      avatarUrl,
      onboarded,
    };

    log.debug('Upserting user', { clerkId, fullName, onboarded });

    if (user === null) {
      await ctx.db.insert('users', { ...userAttributes, plan: 'free', credits: 10 });
    } else await ctx.db.patch(user._id, { ...userAttributes });
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await Users.getUserByClerkId(ctx, clerkUserId);

    if (user !== null) await ctx.db.delete(user._id);
    else {
      log.warn(`Can't delete user, there is none for Clerk user ID: ${clerkUserId}`);
    }
  },
});

export const patchUser = internalMutation({
  args: {
    userId: v.id('users'),
    data: v.any() as Validator<Partial<Omit<Doc<'users'>, '_id' | '_creationTime'>>>,
  },
  async handler(ctx, { userId, data }) {
    log.debug('Patching user: ', data);

    try {
      await ctx.db.patch(userId, data);
    } catch (error) {
      log.error('Error patching user: ', error);
    }
  },
});

/**
 * Get the current user and their subscription
 */
export const getUser = query({
  handler: async (ctx) => {
    const user = await Users.getCurrentUser(ctx);
    if (!user) return null;

    const subscription = await polar.getCurrentSubscription(ctx, { userId: user._id });
    const { _id: id, _creationTime, ...rest } = user;

    return { id, ...rest, subscription };
  },
});

export const onboardingComplete = query({
  handler: async (ctx) => {
    const user = await Users.getCurrentUser(ctx);

    if (!user) return { onboarded: false, credits: 0 };

    return { onboarded: user.onboarded, credits: user.credits };
  },
});

export const finishOnboarding = internalAction({
  args: { clerkUserId: v.string() },
  handler: (_ctx, { clerkUserId }) => Users.completeOnboarding(clerkUserId),
});
