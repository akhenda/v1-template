import type { PropsWithChildren } from 'react';
import { Fragment } from 'react';

import { GoogleAnalytics } from '@next/third-parties/google';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

import { PostHogProvider } from './client';
import { keys } from './keys';

type AnalyticsProviderProps = PropsWithChildren<{
  enablePostHog?: boolean;
  enableVercel?: boolean;
}>;

const { NEXT_PUBLIC_GA_MEASUREMENT_ID } = keys();

export const AnalyticsProvider = ({
  children,
  enableVercel = true,
  enablePostHog = true,
}: AnalyticsProviderProps) => {
  const Wrapper = enablePostHog ? PostHogProvider : Fragment;

  return (
    <Wrapper>
      {children}
      {enableVercel && <VercelAnalytics />}
      {NEXT_PUBLIC_GA_MEASUREMENT_ID && <GoogleAnalytics gaId={NEXT_PUBLIC_GA_MEASUREMENT_ID} />}
    </Wrapper>
  );
};
