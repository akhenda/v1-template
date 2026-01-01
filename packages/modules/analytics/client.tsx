'use client';

import type { ReactNode } from 'react';

import posthog from 'posthog-js';
import { PostHogProvider as PostHogProviderRaw } from 'posthog-js/react';

type PostHogProviderProps = { readonly children: ReactNode };

export const PostHogProvider = (props: Omit<PostHogProviderProps, 'client'>) => (
  <PostHogProviderRaw client={posthog} {...props} />
);

export { usePostHog as useAnalytics } from 'posthog-js/react';
