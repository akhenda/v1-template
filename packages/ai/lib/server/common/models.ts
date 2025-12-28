import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';

import { keys } from '../../../keys';

import type { LanguageModelV2 } from './types';

const openai = createOpenAI({ apiKey: keys().OPENAI_API_KEY });
const anthropic = createAnthropic({ apiKey: keys().ANTHROPIC_API_KEY });
const google = createGoogleGenerativeAI({ apiKey: keys().GEMINI_API_KEY });

export const models: Record<'chat' | 'embeddings', LanguageModelV2> = {
  chat: openai('gpt-4o-mini'),
  embeddings: openai('text-embedding-3-small'),
};

export const providers: Record<string, Record<'pdfParser', LanguageModelV2>> = {
  anthropic: { pdfParser: anthropic('claude-3-5-haiku-latest') },
  google: { pdfParser: google('gemini-2.0-flash') },
  openai: { pdfParser: openai('gpt-4o-mini') },
};
