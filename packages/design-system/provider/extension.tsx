import type { ThemeProviderProps } from 'next-themes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider, type AuthProviderProps } from '@repo/auth/extension/provider';

import { Toaster } from '../components/ui/sonner';
import { TooltipProvider } from '../components/ui/tooltip';

import { ThemeProvider } from './providers/theme';

import '@repo/analytics/posthog/extension';

import type { Prettify } from '@repo/types';

export type DesignSystemProviderProps = Prettify<ThemeProviderProps & AuthProviderProps>;

const queryClient = new QueryClient();

export const DesignSystemProvider = ({
  children,
  privacyUrl,
  termsUrl,
  helpUrl,
  syncHost,
  publishableKey,
  afterSignOutUrl,
  signInFallbackRedirectUrl,
  signUpFallbackRedirectUrl,
  ...props
}: DesignSystemProviderProps) => {
  return (
    <ThemeProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider
          privacyUrl={privacyUrl}
          termsUrl={termsUrl}
          helpUrl={helpUrl}
          syncHost={syncHost}
          publishableKey={publishableKey}
          afterSignOutUrl={afterSignOutUrl}
          signInFallbackRedirectUrl={signInFallbackRedirectUrl}
          signUpFallbackRedirectUrl={signUpFallbackRedirectUrl}
        >
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
