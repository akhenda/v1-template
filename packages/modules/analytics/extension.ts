import { PostHog } from 'posthog-js/dist/module.no-external';

const posthog = new PostHog();

if (!process.env.WXT_PUBLIC_POSTHOG_KEY || !process.env.WXT_PUBLIC_POSTHOG_HOST) {
  throw new Error('Missing Analytics environment variables');
}

posthog.init(process.env.WXT_PUBLIC_POSTHOG_KEY, {
  api_host: process.env.WXT_PUBLIC_POSTHOG_HOST,
  disable_external_dependency_loading: true,
  persistence: 'localStorage',
});
