'use client';

import type { ReactNode } from 'react';

import { NotificationsProvider as RawNotificationsProvider } from '@repo/notifications/components/provider';

type NotificationsProviderProperties = {
  children: ReactNode;
  userId: string;
};

export const NotificationsProvider = ({ children, userId }: NotificationsProviderProperties) => (
  <RawNotificationsProvider userId={userId}>{children}</RawNotificationsProvider>
);
