import type { AnthropicProvider } from '@ai-sdk/anthropic';
import type { GoogleGenerativeAIProvider } from '@ai-sdk/google';
import type { OpenAIProvider } from '@ai-sdk/openai';

// import type { LooseToStrict } from '@repo/types';

export type AIProvider = 'openai' | 'anthropic' | 'google';
// export type OpenAIModel = LooseToStrict<Parameters<OpenAIProvider['languageModel']>[0]>;
// export type AnthropicModel = LooseToStrict<Parameters<AnthropicProvider['languageModel']>[0]>;
// export type GoogleModel = LooseToStrict<Parameters<GoogleGenerativeAIProvider['languageModel']>[0]>;
export type OpenAIModel = Parameters<OpenAIProvider['languageModel']>[0];
export type AnthropicModel = Parameters<AnthropicProvider['languageModel']>[0];
export type GoogleModel = Parameters<GoogleGenerativeAIProvider['languageModel']>[0];
export type BaseConfig = { apiKey: string };
export type OpenAIConfig = BaseConfig & { provider: 'openai'; model: OpenAIModel };
export type AnthropicConfig = BaseConfig & { provider: 'anthropic'; model: AnthropicModel };
export type GoogleConfig = BaseConfig & { provider: 'google'; model: GoogleModel };
export type ProviderModelMap = {
  openai: OpenAIModel;
  anthropic: AnthropicModel;
  google: GoogleModel;
};
export type AIConfig = OpenAIConfig | AnthropicConfig | GoogleConfig;
export type AIConfigMap = {
  openai: OpenAIConfig;
  anthropic: AnthropicConfig;
  google: GoogleConfig;
};
