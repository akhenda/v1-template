# Environment Configuration Module

## Overview

The `keys.ts` module provides a type-safe way to access environment variables required by the AI package. It uses `@t3-oss/env-nextjs` to validate environment variables at runtime, ensuring that all required API keys and configuration values are present and correctly formatted.

## API Reference

### `keys()`

A function that returns validated environment variables with proper TypeScript types.

#### Returns

An object containing the following validated environment variables:

- **`OPENAI_API_KEY`**: OpenAI API key (must start with `sk-proj-`)
- **`ANTHROPIC_API_KEY`**: Anthropic API key (must start with `sk-ant-`)
- **`GEMINI_API_KEY`**: Google Gemini API key (must start with `AI`)
- **`POSTHOG_KEY`**: PostHog analytics key (must start with `phc_`)
- **`POSTHOG_HOST`**: PostHog host URL (must be a valid URL)

#### Example

```typescript
import { keys } from '@repo/ai/keys';

// Get validated environment variables
const env = keys();

// Use environment variables
const openAIClient = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const anthropicClient = new Anthropic({
  apiKey: env.ANTHROPIC_API_KEY,
});

const analyticsClient = new PostHog(env.POSTHOG_KEY, {
  host: env.POSTHOG_HOST,
});
```

## Implementation Details

The module uses Zod schemas to validate environment variables:

- **OpenAI API Key**: Must start with `sk-proj-`
- **Anthropic API Key**: Must start with `sk-ant-`
- **Gemini API Key**: Must start with `AI`
- **PostHog Key**: Must be non-empty and start with `phc_`
- **PostHog Host**: Must be a non-empty valid URL

If any environment variable fails validation, an error will be thrown at runtime, preventing the application from starting with invalid configuration.

## Testing

The module is tested using Vitest with mocked environment variables to ensure proper validation. Tests verify that:

1. The `keys()` function returns an object with the expected properties
2. Environment variables are correctly accessed from `process.env`
3. The validation rules are correctly applied

## Usage Notes

- This module should be used whenever access to AI provider API keys is needed
- It's recommended to call this function once and reuse the returned object
- For testing environments, mock this module to avoid accessing real API keys
