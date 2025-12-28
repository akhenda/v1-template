import type { ReactNode } from 'react';

import { AnalyticsProvider } from '@repo/analytics/provider';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en">
    <body>
      <AnalyticsProvider>{children}</AnalyticsProvider>
    </body>
  </html>
);

export default RootLayout;
