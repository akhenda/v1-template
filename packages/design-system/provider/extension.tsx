import type { ThemeProviderProps } from 'next-themes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { AuthProviderProps } from '@repo/auth/extension/provider';
import { AuthProvider } from '@repo/auth/extension/provider';

import { Toaster } from '../components/ui/sonner';
import { TooltipProvider } from '../components/ui/tooltip';

import { ThemeProvider } from './providers/theme';

import '@repo/analytics/extension';

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
}: DesignSystemProviderProps) => (
  <ThemeProvider {...props}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider
        afterSignOutUrl={afterSignOutUrl}
        helpUrl={helpUrl}
        privacyUrl={privacyUrl}
        publishableKey={publishableKey}
        signInFallbackRedirectUrl={signInFallbackRedirectUrl}
        signUpFallbackRedirectUrl={signUpFallbackRedirectUrl}
        syncHost={syncHost}
        termsUrl={termsUrl}
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
