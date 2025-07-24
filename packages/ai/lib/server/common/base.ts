import type { GenerateObjectResult, LanguageModelUsage, LanguageModelV1 } from 'ai';
import { generateObject, generateText } from 'ai';

import { DEFAULT_AI_TEMPERATURE } from './config';
import type { AIProvider } from './types';

export type Metadata = {
  id: string;
  provider: AIProvider;
  model: string;
  usage: LanguageModelUsage;
};

/**
 * Call the AI SDK to generate an object given a system and user prompt.
 *
 * @param system - The system prompt
 * @param user - The user prompt
 * @param model - The model to use
 * @returns An object with the generated `parsed` response and `metadata` containing the AI provider and usage
 */
export async function callAIGenerateObject<T>({
  system,
  user,
  model,
  maxTokens,
  temperature = DEFAULT_AI_TEMPERATURE,
}: {
  system: string;
  user: string;
  model: LanguageModelV1;
  temperature?: number;
  maxTokens?: number;
  stop?: string[];
  stream?: boolean;
}) {
  const result = (await generateObject({
    model,
    system,
    output: 'no-schema',
    temperature,
    maxTokens,
    messages: [{ role: 'user', content: [{ type: 'text', text: user }] }],
  })) as GenerateObjectResult<T>;

  const { object: parsed, usage, response } = result;
  const metadata = {
    id: response.id,
    provider: model.provider as AIProvider,
    model: response.modelId,
    usage,
  };

  return { parsed, metadata };
}

/**
 * Call the AI SDK to generate text given a system and user prompt.
 *
 * @param system - The system prompt
 * @param user - The user prompt
 * @param model - The model to use
 * @returns An object with the generated `text` response and `metadata` containing the AI provider and usage
 */
export async function callAIGenerateText({
  system,
  user,
  model,
  temperature = DEFAULT_AI_TEMPERATURE,
}: {
  system: string;
  user: string;
  model: LanguageModelV1;
  temperature?: number;
}) {
  const result = await generateText({
    model,
    system,
    temperature,
    messages: [{ role: 'user', content: [{ type: 'text', text: user }] }],
  });

  const { text, usage, response } = result;
  const metadata = {
    id: response.id,
    provider: model.provider as AIProvider,
    model: response.modelId,
    usage,
  };

  return { text, metadata, response };
}
