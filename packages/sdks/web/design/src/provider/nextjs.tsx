import type { ThemeProviderProps } from 'next-themes';

import { AnalyticsProvider } from '@repo/analytics/provider';
import type { AuthProviderProps } from '@repo/auth/nextjs/provider';
import { AuthProvider } from '@repo/auth/nextjs/provider';

import { Toaster } from '../components/ui/sonner';
import { TooltipProvider } from '../components/ui/tooltip';

import { ThemeProvider } from './providers/theme';

export type DesignSystemProviderProps = ThemeProviderProps & AuthProviderProps;

export const DesignSystemProvider = ({
  children,
  privacyUrl,
  termsUrl,
  helpUrl,
  ...props
}: DesignSystemProviderProps) => (
  <ThemeProvider {...props}>
    <AuthProvider helpUrl={helpUrl} privacyUrl={privacyUrl} termsUrl={termsUrl}>
      <AnalyticsProvider>
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </AnalyticsProvider>
    </AuthProvider>
  </ThemeProvider>
);
