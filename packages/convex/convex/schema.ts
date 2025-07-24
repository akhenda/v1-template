import { defineSchema, defineTable } from 'convex/server';
import { type Infer, v } from 'convex/values';
import { literals, typedV } from 'convex-helpers/validators';

export const aiProviderEnum = literals('openai', 'anthropic', 'google');
export const openAIModelEnum = literals(
  'o3',
  'o3-mini',
  'o4-mini',
  'o4-mini-high',
  'gpt-4.1',
  'gpt-4.1-nano',
  'gpt-4o-mini',
  'gpt-4o',
  'gpt-3.5-turbo',
);
export const anthropicModelEnum = literals(
  'claude-3-7-sonnet-latest',
  'claude-3-5-haiku-latest',
  'claude-3-5-sonnet-latest',
  'claude-3-opus-latest',
);
export const googleModelEnum = literals(
  'gemini-2.5-pro-preview-05-06',
  'gemini-2.5-flash-preview-04-17',
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash',
);
export const aiModelEnum = v.union(openAIModelEnum, anthropicModelEnum, googleModelEnum);
export const planEnum = literals('legend', 'free', 'plus', 'pro');
export const subscriptionStatusEnum = literals(
  'incomplete',
  'incomplete_expired',
  'trialing',
  'active',
  'past_due',
  'canceled',
  'unpaid',
);

export const aiMetadataTypeEnum = literals('test');
export const creditTransactionsReasonEnum = literals('test');

export const AIMetadataSchema = v.object({
  id: v.optional(v.string()),
  provider: v.optional(v.string()),
  model: v.optional(v.string()),
  usage: v.optional(v.any()),
  extra: v.optional(
    v.object({
      // openai
      created: v.optional(v.number()),
      object: v.optional(v.string()),
      serviceTier: v.optional(v.any()),
      systemFingerprint: v.optional(v.string()),

      // anthropic
      role: v.optional(v.string()),
      type: v.optional(v.string()),
      stopReason: v.optional(v.any()),
      stopSequence: v.optional(v.any()),

      // google
      createTime: v.optional(v.string()),
    }),
  ),
});

export type AIProvider = Infer<typeof aiProviderEnum>;
export type OpenAIModel = Infer<typeof openAIModelEnum>;
export type AnthropicModel = Infer<typeof anthropicModelEnum>;
export type GoogleModel = Infer<typeof googleModelEnum>;
export type AIModel = Infer<typeof aiModelEnum>;
export type Plan = Infer<typeof planEnum>;
export type SubscriptionStatus = Infer<typeof subscriptionStatusEnum>;
export type AIMeatadataType = Infer<typeof aiMetadataTypeEnum>;
export type CreditTransactionsReason = Infer<typeof creditTransactionsReasonEnum>;
export type AIMetadata = Infer<typeof AIMetadataSchema>;

const schema = defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.optional(v.string()),
    username: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    fullName: v.optional(v.string()),
    avatarUrl: v.string(),
    plan: planEnum,
    onboarded: v.optional(v.boolean()),
    credits: v.number(),
    apiKey: v.optional(v.string()),
    aiProvider: v.optional(aiProviderEnum),
    aiModel: v.optional(aiModelEnum),
    subscriptionId: v.optional(v.string()),
    subscriptionStatus: v.optional(subscriptionStatusEnum),
    nextRenewal: v.optional(v.number()),
  })
    .index('by_email', ['email'])
    .index('by_clerkId', ['clerkId'])
    .index('by_email_clerkId', ['email', 'clerkId'])
    .index('by_plan', ['plan']),

  aiMetadata: defineTable({
    ...AIMetadataSchema.fields,
    type: aiMetadataTypeEnum,
    typeId: v.optional(v.union(v.id('resumes'), v.id('applications'), v.id('summaryJobs'))),
  })
    .index('by_metadataId', ['id'])
    .index('by_model', ['model'])
    .index('by_provider', ['provider'])
    .index('by_type', ['type'])
    .index('by_typeId', ['typeId'])
    .index('by_type_typeId', ['type', 'typeId']),

  creditTransactions: defineTable({
    userId: v.id('users'),
    delta: v.number(),
    reason: creditTransactionsReasonEnum,
    relatedId: v.optional(v.union(v.id('resumes'), v.id('applications'), v.id('summaryJobs'))),
    timestamp: v.number(),
  })
    .index('by_userId', ['userId'])
    .index('by_relatedId', ['relatedId']),

  messages: defineTable({ author: v.string(), body: v.string() }),
});

export default schema;

export const vv = typedV(schema);
