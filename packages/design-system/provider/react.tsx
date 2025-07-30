import type { ThemeProviderProps } from 'next-themes';

import { AnalyticsProvider } from '@repo/analytics';
import { AuthProvider, type AuthProviderProps } from '@repo/auth/react/provider';

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
      privacyUrl={privacyUrl}
      termsUrl={termsUrl}
      helpUrl={helpUrl}
      publishableKey={publishableKey}
      afterSignOutUrl={afterSignOutUrl}
      signInFallbackRedirectUrl={signInFallbackRedirectUrl}
      signUpFallbackRedirectUrl={signUpFallbackRedirectUrl}
    >
      <AnalyticsProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </AnalyticsProvider>
    </AuthProvider>
  </ThemeProvider>
);
