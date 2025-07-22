import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
    server: {
      // AI
      OPENAI_API_KEY: z.string().startsWith('sk-proj-'),
      ANTHROPIC_API_KEY: z.string().startsWith('sk-ant-'),
      GEMINI_API_KEY: z.string().startsWith('AI'),

      // Posthog
      POSTHOG_KEY: z.string().nonempty().startsWith('phc_'),
      POSTHOG_HOST: z.string().nonempty().url(),
    },
    runtimeEnv: {
      // AI
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,

      // Posthog
      POSTHOG_KEY: process.env.POSTHOG_KEY,
      POSTHOG_HOST: process.env.POSTHOG_HOST,
    },
  });
