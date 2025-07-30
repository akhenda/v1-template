import { defineExtensionMessaging } from '@webext-core/messaging';

import type { User } from '~/types';

export const Message = { USER: 'user', CLOSE_SIDE_PANEL: 'close-sidepanel' } as const;

export type Message = (typeof Message)[keyof typeof Message];

interface Messages {
  [Message.USER]: () => User | null;
  [Message.CLOSE_SIDE_PANEL]: () => void;
}

export const { sendMessage, onMessage } = defineExtensionMessaging<Messages>();
