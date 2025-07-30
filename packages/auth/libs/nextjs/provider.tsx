'use client';

import { type ComponentProps, useMemo } from 'react';

import { useTheme } from 'next-themes';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Theme } from '@clerk/types';

import ConvexClientProvider from '../convex/provider';

export type AuthProviderProps = ComponentProps<typeof ClerkProvider> & {
  privacyUrl?: string;
  termsUrl?: string;
  helpUrl?: string;
};

export const AuthProvider = ({
  privacyUrl,
  termsUrl,
  helpUrl,
  children,
  ...props
}: AuthProviderProps) => {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  const appearance = useMemo(() => {
    const variables: Theme['variables'] = {
      fontFamily: 'var(--font-sans)',
      fontFamilyButtons: 'var(--font-sans)',
      fontWeight: {
        bold: 'var(--font-weight-bold)',
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
      },
    };

    const elements: Theme['elements'] = {
      dividerLine: 'bg-border',
      socialButtonsIconButton: 'bg-card',
      navbarButton: 'text-foreground',
      organizationSwitcherTrigger__open: 'bg-background',
      organizationPreviewMainIdentifier: 'text-foreground',
      organizationSwitcherTriggerIcon: 'text-muted-foreground',
      organizationPreview__organizationSwitcherTrigger: 'gap-2',
      organizationPreviewAvatarContainer: 'shrink-0',
    };

    const layout: Theme['layout'] = {
      privacyPageUrl: privacyUrl,
      termsPageUrl: termsUrl,
      helpPageUrl: helpUrl,
    };

    return { layout, baseTheme: isDark ? dark : undefined, elements, variables };
  }, [isDark, privacyUrl, termsUrl, helpUrl]);

  return (
    <ClerkProvider {...props} appearance={appearance}>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ClerkProvider>
  );
};
