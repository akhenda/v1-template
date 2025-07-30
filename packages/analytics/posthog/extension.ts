import { PostHog } from 'posthog-js/dist/module.no-external';

import { keys } from '../keys';

const posthog = new PostHog();

posthog.init(keys().NEXT_PUBLIC_POSTHOG_KEY, {
  api_host: keys().NEXT_PUBLIC_POSTHOG_HOST,
  disable_external_dependency_loading: true,
  persistence: 'localStorage',
});
