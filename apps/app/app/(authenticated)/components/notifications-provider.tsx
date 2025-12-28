'use client';

import type { ReactNode } from 'react';

import { useTheme } from 'next-themes';

import { NotificationsProvider as RawNotificationsProvider } from '@repo/notifications/components/provider';

type NotificationsProviderProperties = {
  children: ReactNode;
  userId: string;
};

export const NotificationsProvider = ({ children, userId }: NotificationsProviderProperties) => {
  const { resolvedTheme } = useTheme();

  return (
    <RawNotificationsProvider theme={resolvedTheme as 'light' | 'dark'} userId={userId}>
      {children}
    </RawNotificationsProvider>
  );
};
