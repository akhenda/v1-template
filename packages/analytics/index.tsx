import { Fragment, type PropsWithChildren } from 'react';

import { GoogleAnalytics } from './google';
import { keys } from './keys';
import { PostHogProvider } from './posthog/client';
import { VercelAnalytics } from './vercel';

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
