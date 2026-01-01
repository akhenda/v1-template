'use client';

import type { ReactNode } from 'react';

import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ConvexQueryCacheProvider } from 'convex-helpers/react/cache/provider';

import { useAuth } from '@clerk/chrome-extension';

console.log('process.env.WXT_PUBLIC_CONVEX_URL: ', process.env.WXT_PUBLIC_CONVEX_URL);

if (!process.env.WXT_PUBLIC_CONVEX_URL) throw new Error('WXT_PUBLIC_CONVEX_URL is not defined');

const convex = new ConvexReactClient(process.env.WXT_PUBLIC_CONVEX_URL);

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <ConvexQueryCacheProvider>{children}</ConvexQueryCacheProvider>
    </ConvexProviderWithClerk>
  );
}
