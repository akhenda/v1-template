import type { ThemeProviderProps } from 'next-themes';

import { AnalyticsProvider } from '@repo/analytics';
import { AuthProvider } from '@repo/auth/extension/provider';

import { Toaster } from '../components/ui/sonner';
import { TooltipProvider } from '../components/ui/tooltip';

import { ThemeProvider } from './providers/theme';

type DesignSystemProviderProps = ThemeProviderProps & {
  privacyUrl?: string;
  termsUrl?: string;
  helpUrl?: string;
  clerkPublishableKey: string;
  clerkAfterSignOutUrl?: string;
  clerkSignInFallbackRedirectUrl?: string;
  clerkSignUpFallbackRedirectUrl?: string;
};

export const DesignSystemProvider = ({
  children,
  privacyUrl,
  termsUrl,
  helpUrl,
  clerkPublishableKey,
  clerkAfterSignOutUrl,
  clerkSignInFallbackRedirectUrl,
  clerkSignUpFallbackRedirectUrl,
  ...props
}: DesignSystemProviderProps) => (
  <ThemeProvider {...props}>
    <AuthProvider
      privacyUrl={privacyUrl}
      termsUrl={termsUrl}
      helpUrl={helpUrl}
      publishableKey={clerkPublishableKey}
      afterSignOutUrl={clerkAfterSignOutUrl}
      signInFallbackRedirectUrl={clerkSignInFallbackRedirectUrl}
      signUpFallbackRedirectUrl={clerkSignUpFallbackRedirectUrl}
    >
      <AnalyticsProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </AnalyticsProvider>
    </AuthProvider>
  </ThemeProvider>
);
