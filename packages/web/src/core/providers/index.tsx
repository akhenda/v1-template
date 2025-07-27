import type { PropsWithChildren } from 'react';

import { DesignSystemProvider } from '@repo/design-system';

import { APIProvider } from '../api';

type Props = PropsWithChildren<{ locale?: string }>;

export function WebLibProvider({ children }: Props) {
  return (
    <DesignSystemProvider>
      <APIProvider>{children}</APIProvider>
    </DesignSystemProvider>
  );
}
