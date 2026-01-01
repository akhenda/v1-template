import { env } from '@/env';

import './styles.css';

import type { PropsWithChildren } from 'react';

import { AnalyticsProvider } from '@repo/analytics/provider';
import { Toolbar } from '@repo/feature-flags/components/toolbar';
import { DesignSystemProvider } from '@repo/web-design-system';
import { fonts } from '@repo/web-design-system/lib/fonts';

const RootLayout = ({ children }: PropsWithChildren) => (
  <html className={fonts} lang="en" suppressHydrationWarning>
    <body>
      <AnalyticsProvider>
        <DesignSystemProvider
          helpUrl={env.NEXT_PUBLIC_DOCS_URL}
          privacyUrl={new URL('/legal/privacy', env.NEXT_PUBLIC_WEB_URL).toString()}
          termsUrl={new URL('/legal/terms', env.NEXT_PUBLIC_WEB_URL).toString()}
        >
          {children}
        </DesignSystemProvider>
      </AnalyticsProvider>
      <Toolbar />
    </body>
  </html>
);

export default RootLayout;
