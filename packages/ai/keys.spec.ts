import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { keys } from './keys';

// Mock @t3-oss/env-nextjs
vi.mock('@t3-oss/env-nextjs', () => ({
  createEnv: vi.fn().mockImplementation(({ server, runtimeEnv }) => {
    // Simple implementation that returns the runtime env values
    // This allows us to test the schema validation indirectly
    return Object.fromEntries(Object.keys(server).map((key) => [key, runtimeEnv[key]]));
  }),
}));

describe('keys', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should export a function that returns environment variables', () => {
    expect(typeof keys).toBe('function');
    expect(typeof keys()).toBe('object');
  });

  it('should return environment variables from process.env', () => {
    // Set up test environment variables
    process.env.OPENAI_API_KEY = 'sk-proj-test123';
    process.env.ANTHROPIC_API_KEY = 'sk-ant-test123';
    process.env.GEMINI_API_KEY = 'AItest123';
    process.env.POSTHOG_KEY = 'phc_test123';
    process.env.POSTHOG_HOST = 'https://app.posthog.com';

    const env = keys();

    expect(env.OPENAI_API_KEY).toBe('sk-proj-test123');
    expect(env.ANTHROPIC_API_KEY).toBe('sk-ant-test123');
    expect(env.GEMINI_API_KEY).toBe('AItest123');
    expect(env.POSTHOG_KEY).toBe('phc_test123');
    expect(env.POSTHOG_HOST).toBe('https://app.posthog.com');
  });
});
