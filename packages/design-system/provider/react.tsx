import type { ThemeProviderProps } from 'next-themes';

import { AnalyticsProvider } from '@repo/analytics/provider';
import type { AuthProviderProps } from '@repo/auth/react/provider';
import { AuthProvider } from '@repo/auth/react/provider';

import { Toaster } from '../components/ui/sonner';
import { TooltipProvider } from '../components/ui/tooltip';

import { ThemeProvider } from './providers/theme';

export type DesignSystemProviderProps = ThemeProviderProps & AuthProviderProps;

export const DesignSystemProvider = ({
  children,
  privacyUrl,
  termsUrl,
  helpUrl,
  publishableKey,
  afterSignOutUrl,
  signInFallbackRedirectUrl,
  signUpFallbackRedirectUrl,
  ...props
}: DesignSystemProviderProps) => (
  <ThemeProvider {...props}>
    <AuthProvider
      afterSignOutUrl={afterSignOutUrl}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      publishableKey={publishableKey}
      signInFallbackRedirectUrl={signInFallbackRedirectUrl}
      signUpFallbackRedirectUrl={signUpFallbackRedirectUrl}
      termsUrl={termsUrl}
    >
      <AnalyticsProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </AnalyticsProvider>
    </AuthProvider>
  </ThemeProvider>
);
