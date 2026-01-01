'use client';

import type { PropsWithChildren } from 'react';

import { useTheme } from 'next-themes';

import { KnockFeedProvider, KnockProvider } from '@knocklabs/react';

import { keys } from '../keys';

const knockApiKey = keys().NEXT_PUBLIC_KNOCK_API_KEY;
const knockFeedChannelId = keys().NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID;

type NotificationsProviderProps = PropsWithChildren<{ userId: string }>;

export const NotificationsProvider = ({ children, userId }: NotificationsProviderProps) => {
  const { theme } = useTheme();
  const colorMode = theme === 'dark' ? 'dark' : 'light';

  if (!(knockApiKey && knockFeedChannelId)) return children;

  return (
    <KnockProvider apiKey={knockApiKey} userId={userId}>
      <KnockFeedProvider colorMode={colorMode} feedId={knockFeedChannelId}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
};
