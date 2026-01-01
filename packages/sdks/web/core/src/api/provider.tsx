'use client';

import type { PropsWithChildren } from 'react';

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { persistOptions, queryClient } from './react-query/index.js';

export function APIProvider({ children }: PropsWithChildren) {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
      {children}
    </PersistQueryClientProvider>
  );
}
