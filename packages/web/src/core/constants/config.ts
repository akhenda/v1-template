import { keys } from '../../../keys';

export const ENV = keys();

export const CONFIG = {
  /**
   * App-specific constants
   */

  /**
   * API base url
   */
  apiURL: ENV.NEXT_PUBLIC_API_BASE_URL,
  appUrl: ENV.NEXT_PUBLIC_APP_URL,
  websiteUrl: ENV.NEXT_PUBLIC_WEB_URL,
  signInUrl: `${ENV.NEXT_PUBLIC_APP_URL}/sign-in`,
  signUpUrl: `${ENV.NEXT_PUBLIC_APP_URL}/sign-up`,

  /**
   * Services/SDKs
   */
  postHog: {
    apiKey: '',
    // "https://us.i.posthog.com" | "https://eu.i.posthog.com"
    apiHost: 'https://eu.i.posthog.com',
    // "always" | "identified_only"
    personProfiles: 'always', // 'always' to use feature flags with posthog
  },
} as const;
