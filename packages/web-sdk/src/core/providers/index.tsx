import type { PropsWithChildren } from 'react';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { DesignSystemProvider } from '@repo/design-system';

import { persistOptions, queryClient } from '../api/index.js';

type Props = PropsWithChildren<{ locale?: string }>;

export function WebLibProvider({ children }: Props) {
  return (
    <DesignSystemProvider>
      <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
        {children}
      </PersistQueryClientProvider>
    </DesignSystemProvider>
  );
}
