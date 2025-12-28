import type { ThemeProviderProps } from 'next-themes';

import { AnalyticsProvider } from '@repo/analytics/provider';
import { AuthProvider } from '@repo/auth/provider';

import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './providers/theme';

type DesignSystemProviderProps = ThemeProviderProps & {
  privacyUrl?: string;
  termsUrl?: string;
  helpUrl?: string;
};

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
