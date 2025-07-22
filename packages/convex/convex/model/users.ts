import { ConvexError } from 'convex/values';

import { createClerkClient } from '@clerk/backend';

import type { AnyValue } from '@repo/types';

import type { Doc, Id } from '../_generated/dataModel';
import type { ActionCtx, MutationCtx, QueryCtx } from '../_generated/server';
import { env } from '../env';
import { log } from '../libs/utils/logger';
import type { CreditTransactionsReason, Plan, SubscriptionStatus } from '../schema';

export type Ctx = MutationCtx | QueryCtx | ActionCtx;
export type DatabaseCtx = MutationCtx | QueryCtx;

/**
 * Returns true if the user is on a pay-as-you-go plan.
 *
 * A user is on a pay-as-you-go plan if they are on the free or plus plan, or if they are on the pro plan but don't have an active subscription.
 * @param user - The user record.
 * @returns true if the user is on a pay-as-you-go plan, false otherwise.
 */
export function isPayAsYouGo(user: { plan: Plan; subscriptionStatus?: SubscriptionStatus }) {
  return (
    user.plan === 'free' ||
    user.plan === 'plus' ||
    (user.plan === 'pro' && user.subscriptionStatus !== 'active')
  );
}

/**
 * Given a Polar product ID, returns the corresponding Convex plan.
 * @param id - Polar product ID.
 * @returns The corresponding Convex plan.
 */
export function getUserPlan(id: string): Plan {
  switch (id) {
    case env.POLAR_PRODUCT_LEGEND:
      return 'legend';
    case env.POLAR_PRODUCT_PLUS_SMALL_PACK:
    case env.POLAR_PRODUCT_PLUS_MEDIUM_PACK:
    case env.POLAR_PRODUCT_PLUS_LARGE_PACK:
      return 'plus';
    case env.POLAR_PRODUCT_PRO_MONTHLY:
    case env.POLAR_PRODUCT_PRO_YEARLY:
      return 'pro';
    default:
      return 'free';
  }
}

/**
 * Given a user record, returns an object that can be used to configure the AI provider
 *
 * @param user - The user record.
 * @returns An object that can be used to configure the AI provider.
 */
export function getAIOptions(user: Doc<'users'>) {
  return {
    plan: user.plan,
    apiKey: user.apiKey,
    aiProvider: user.aiProvider,
    aiModel: user.aiModel,
    clerkId: user.clerkId,
  };
}

/**
 * Fetches a user record by its ID.
 *
 * @param ctx - The query context used for database operations.
 * @param id - The ID of the user to fetch.
 * @returns The user record with the given ID, if it exists.
 */
export function getUserById(ctx: DatabaseCtx, id: Id<'users'>) {
  return ctx.db.get(id);
}

/**
 * Fetches a user record by their email address.
 *
 * @param ctx - The query context used for database operations.
 * @param email - The email address of the user to fetch.
 * @returns The user record with the given email address, if it exists.
 */
export function getUserByEmail(ctx: DatabaseCtx, email: string) {
  return ctx.db
    .query('users')
    .withIndex('by_email', (q) => q.eq('email', email))
    .unique();
}

/**
 * Fetches a user record by their Clerk ID.
 *
 * @param ctx - The query context used for database operations.
 * @param clerkId - The Clerk ID of the user to fetch.
 * @returns The user record with the given Clerk ID, if it exists.
 */
export function getUserByClerkId(ctx: DatabaseCtx, clerkId: string) {
  return ctx.db
    .query('users')
    .withIndex('by_clerkId', (q) => q.eq('clerkId', clerkId))
    .unique();
}

/**
 * Retrieves the current user record based on their authentication identity.
 *
 * This function fetches the current user's identity from the authentication
 * context and uses it to query the database for the user record associated
 * with the Clerk ID.
 *
 * @param ctx - The database context used for authentication and database operations.
 * @returns The user record if the identity is found, otherwise null.
 */
export async function getCurrentUser(ctx: DatabaseCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) return null;

  return getUserByClerkId(ctx, identity.subject);
}

/**
 * Retrieves the current user record based on their authentication identity,
 * throwing an error if the user is not found.
 *
 * This function fetches the current user's identity from the authentication
 * context and uses it to query the database for the user record associated
 * with the Clerk ID. If no user is found, it throws a ConvexError.
 *
 * @param ctx - The database context used for authentication and database operations.
 * @returns The user record associated with the current authentication identity.
 * @throws ConvexError if the current user cannot be retrieved.
 */
export async function getCurrentUserOrThrow(ctx: DatabaseCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new ConvexError("Can't get current user");

  return userRecord;
}

/**
 * Retrieves a user record by its ID, throwing an error if the user is not found.
 *
 * @param ctx - The database context used for database operations.
 * @param userId - The ID of the user to fetch.
 * @returns The user record associated with the given ID.
 * @throws ConvexError if the user record is not found.
 */
export async function getUserOrThrow(ctx: DatabaseCtx, userId: Id<'users'>) {
  const userRecord = await getUserById(ctx, userId);
  if (!userRecord) throw new ConvexError('User not found');

  return userRecord;
}

/**
 * Quick read‑only guard: throw if unauthenticated or not enough credits.
 *
 * Throws a ConvexError if the user does not have enough credits to afford the given cost.
 *
 * @param cost - The cost to check against the user's credits.
 * @param user - The user record to check.
 * @returns The user record if the cost is affordable.
 * @throws ConvexError if the user cannot afford the given cost.
 */
export function canAfford(cost: number, user: Doc<'users'>) {
  const payAsYouGo = isPayAsYouGo(user);

  if (payAsYouGo && user.credits < cost) throw new ConvexError('Insufficient credits');

  return user;
}

/**
 * Quick read-only guard: throw if unauthenticated or not enough credits.
 *
 * Throws a ConvexError if the current user does not have enough credits to afford the given cost.
 *
 * @param ctx - The query context used for database operations.
 * @param cost - The cost to check against the current user's credits.
 * @returns The current user record if the cost is affordable.
 * @throws ConvexError if the current user cannot afford the given cost.
 */
export async function assertCurrentUserCanAfford(ctx: QueryCtx, cost: number) {
  const user = await getCurrentUserOrThrow(ctx);

  return canAfford(cost, user);
}

/**
 * Quick read-only guard: throw if user doesn't have enough credits.
 *
 * Throws a ConvexError if the user with the given ID does not have enough credits to afford the given cost.
 *
 * @param ctx - The query context used for database operations.
 * @param userId - The ID of the user to check.
 * @param cost - The cost to check against the user's credits.
 * @returns The user record if the cost is affordable.
 * @throws ConvexError if the user cannot afford the given cost.
 */
export async function assertUserCanAfford(ctx: QueryCtx, userId: Id<'users'>, cost: number) {
  const user = await getUserOrThrow(ctx, userId);

  return canAfford(cost, user);
}

/**
 * Charges the given user for the specified cost, if they are on a pay-as-you-go plan.
 *
 * This function will throw a ConvexError if the user does not have enough credits to cover the cost.
 * If the user has enough credits, it will subtract the cost from their credits and insert a record
 * into the 'creditTransactions' table with the given reason and related ID.
 *
 * @param ctx - The mutation context used for database operations.
 * @param cost - The cost to charge the user.
 * @param reason - The reason for the charge.
 * @param relatedId - The ID of the related record, if any.
 * @param user - The user record to charge.
 * @returns The user record if the charge is successful.
 * @throws ConvexError if the user does not have enough credits.
 */
export async function maybeCharge(
  ctx: MutationCtx,
  {
    cost,
    reason,
    relatedId,
    user,
  }: {
    cost: number;
    reason: CreditTransactionsReason;
    relatedId?: AnyValue;
    user: Doc<'users'>;
  },
) {
  const payAsYouGo = isPayAsYouGo(user);

  if (payAsYouGo && cost > 0) {
    if (user.credits < cost) throw new ConvexError('Insufficient credits');

    await ctx.db.patch(user._id, { credits: user.credits - cost });
    await ctx.db.insert('creditTransactions', {
      userId: user._id,
      delta: -cost,
      reason,
      relatedId,
      timestamp: Date.now(),
    });
  }

  return user;
}

/**
 * Retrieves the current user record and charges the user for the given cost.
 *
 * This function wraps {@link maybeCharge} and first retrieves the current user
 * record using {@link getCurrentUserOrThrow}.
 *
 * @param ctx - The mutation context used for database operations.
 * @param cost - The cost to charge the user.
 * @param reason - The reason for the charge.
 * @param relatedId - The ID of the related record, if any.
 * @returns The user record if the charge is successful.
 * @throws ConvexError if the user does not have enough credits.
 */
export async function getCurrentUserAndMaybeCharge(
  ctx: MutationCtx,
  {
    cost,
    reason,
    relatedId,
  }: {
    cost: number;
    reason: CreditTransactionsReason;
    relatedId?: AnyValue;
  },
) {
  const user = await getCurrentUserOrThrow(ctx);

  return maybeCharge(ctx, { cost, reason, relatedId, user });
}

/**
 * Retrieves a user record by their ID and charges them for the specified cost.
 *
 * This function wraps {@link maybeCharge} and first retrieves the user record
 * using {@link getUserOrThrow}.
 *
 * @param ctx - The mutation context used for database operations.
 * @param cost - The cost to charge the user.
 * @param reason - The reason for the charge.
 * @param userId - The ID of the user to charge.
 * @param relatedId - The ID of the related record, if any.
 * @returns The user record if the charge is successful.
 * @throws ConvexError if the user does not have enough credits.
 */
export async function getUserAndMaybeCharge(
  ctx: MutationCtx,
  {
    cost,
    reason,
    userId,
    relatedId,
  }: {
    cost: number;
    reason: CreditTransactionsReason;
    userId: Id<'users'>;
    relatedId?: AnyValue;
  },
) {
  const user = await getUserOrThrow(ctx, userId);

  return maybeCharge(ctx, { cost, reason, relatedId, user });
}

/**
 * Marks a user as having completed onboarding by setting a flag in their Clerk
 * user metadata.
 *
 * @param clerkUserId - The Clerk user ID of the user to mark as having completed
 * onboarding.
 * @returns An object with a single property, `message`, which contains the
 * updated public metadata for the user.
 * @throws ConvexError if there was an error updating the user metadata.
 */
export const completeOnboarding = async (clerkUserId: string) => {
  const client = createClerkClient({ secretKey: env.CLERK_SECRET_KEY });

  try {
    const res = await client.users.updateUser(clerkUserId, {
      publicMetadata: { onboarded: true },
    });

    log.info('onboarding complete', { clerkUserId });

    return { message: res.publicMetadata };
  } catch (err) {
    log.error(err);

    throw new ConvexError('There was an error updating the user metadata.');
  }
};
