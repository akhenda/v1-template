import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { withTracing } from '@posthog/ai';
import type { LanguageModelV1 } from 'ai';
import { PostHog } from 'posthog-node';

import type { Plan } from '@repo/types';

import { keys } from '../../../keys';

import type { AIConfig, AIConfigMap, AIProvider, GoogleModel, ProviderModelMap } from './types';

export type AIOpts<T extends AIProvider, U extends Plan = Plan> = {
  aiProvider?: T;
  aiModel?: ProviderModelMap[T];
  cheapAIModel?: ProviderModelMap[T];
  apiKey?: string;
  plan: U;
  useCheapAIModel?: boolean;
  stream?: boolean;

  /** Clerk user Id */
  clerkId: string;
  traceId?: string;
  conversationId?: string;

  verifierMode?: 'single' | 'batch';
  guardStrategy?: 'throw' | 'strip' | 'partial';
};

/**
 * My Preferred Models
 * Open AI - gpt-4.1-mini
 * Anthropic - claude-3-haiku-latest
 * Google - gemini-2.5-flash-preview
 */

export const DEFAULT_AI_PROVIDER: AIProvider = 'google';
export const DEFAULT_AI_MODEL: GoogleModel = 'gemini-2.5-flash-preview-04-17';
export const CHEAP_AI_MODEL: GoogleModel = 'gemini-2.5-flash-preview-04-17';
export const DEFAULT_AI_API_KEY: string = keys().GEMINI_API_KEY;
export const DEFAULT_AI_TEMPERATURE: number = 0;

const isPaidPlan = (plan: Plan) => plan === 'plus' || plan === 'pro';

export const phClient = new PostHog(keys().POSTHOG_KEY, { host: keys().POSTHOG_HOST });

/**
 * Given AI config options, returns a normalized AI config object.
 *
 * If the user is on the legend plan, this function will return the user-provided
 * AI provider and model. If the user is not on the legend plan, this function
 * will return the default AI provider and model.
 *
 * @throws if the user is on the legend plan but the user-provided AI config
 * is not valid (i.e. the user-provided AI provider, model, or API key is not
 * valid).
 *
 * @param aiProvider - The AI provider to use. If not provided, the default
 * AI provider is used.
 * @param aiModel - The AI model to use. If not provided, the default AI model
 * is used.
 * @param apiKey - The API key to use. If not provided, the default API key is
 * used.
 * @param plan - The user's plan. If the user is on the legend plan, the
 * user-provided AI config is used. If the user is not on the legend plan, the
 * default AI config is used.
 *
 * @returns A normalized AI config object.
 */
export function getAIConfig<T extends AIProvider = AIProvider, U extends Plan = Plan>({
  aiProvider: provider,
  aiModel: model,
  apiKey,
  plan,
  cheapAIModel,
  useCheapAIModel,
}: Omit<AIOpts<T, U>, 'clerkId'>): AIConfig {
  if (plan === 'legend' && (!model || !apiKey || !provider)) {
    throw new Error('AI Config Key is not valid');
  }

  if (plan === 'legend' && model && apiKey && provider) {
    return {
      apiKey,
      provider,
      model: useCheapAIModel && cheapAIModel ? cheapAIModel : model,
    } as AIConfigMap[T];
  }

  return {
    provider: DEFAULT_AI_PROVIDER,
    model: useCheapAIModel ? CHEAP_AI_MODEL : DEFAULT_AI_MODEL,
    apiKey: DEFAULT_AI_API_KEY,
  } as AIConfigMap[T];
}

/**
 * Wrap a language model with analytics.
 *
 * @param model - The language model to wrap.
 * @param options - The options to pass to the `withTracing` function.
 *
 * @returns The wrapped language model.
 */
export function wrapModelWithAnalytics(
  model: LanguageModelV1,
  options: { clerkId?: string; traceId?: string; conversationId?: string; paid?: boolean },
) {
  return withTracing(model, phClient, {
    posthogPrivacyMode: false,
    posthogDistinctId: options.clerkId, // optional
    posthogTraceId: options.traceId, // optional
    posthogProperties: { conversation_id: options.conversationId, paid: options.paid ?? true },
  });
}

/**
 * Given AI config options, returns a wrapped language model that can be used for AI inference.
 *
 * If the user is on the legend plan, this function will return a language model that is
 * configured with the user-provided AI provider and model. If the user is not on the
 * legend plan, this function will return a language model that is configured with the
 * default AI provider and model.
 *
 * The returned language model is wrapped with analytics.
 *
 * @param aiProvider - The AI provider to use. If not provided, the default AI provider is used.
 * @param aiModel - The AI model to use. If not provided, the default AI model is used.
 * @param apiKey - The API key to use. If not provided, the default API key is used.
 * @param plan - The user's plan. If the user is on the legend plan, the user-provided AI config
 * is used. If the user is not on the legend plan, the default AI config is used.
 * @param clerkId - The Clerk user Id.
 * @param traceId - The trace Id to use for analytics.
 * @param conversationId - The conversation Id to use for analytics.
 *
 * @returns The wrapped language model.
 */
export function getAIModel<T extends AIProvider = AIProvider, U extends Plan = Plan>({
  apiKey: aiAPIKey,
  aiProvider,
  aiModel,
  cheapAIModel,
  useCheapAIModel,
  plan,
  clerkId,
  traceId,
  conversationId,
}: AIOpts<T, U>) {
  const {
    provider,
    model: modelId,
    apiKey,
  } = getAIConfig({ aiProvider, aiModel, apiKey: aiAPIKey, plan, cheapAIModel, useCheapAIModel });

  let model = createOpenAI({ apiKey, compatibility: 'strict' })(modelId);

  if (provider === 'anthropic') model = createAnthropic({ apiKey })(modelId);
  if (provider === 'google') model = createGoogleGenerativeAI({ apiKey })(modelId);

  return wrapModelWithAnalytics(model, {
    clerkId,
    traceId,
    conversationId,
    paid: isPaidPlan(plan),
  });
}

phClient.shutdown();
