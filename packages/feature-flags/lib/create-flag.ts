import { flag } from 'flags/next';

import { analytics } from '@repo/analytics/server';
import { auth } from '@repo/auth/server';

export const createFlag = (key: string) =>
  flag({
    key,
    defaultValue: false,
    async decide() {
      const { userId } = await auth();

      if (!userId) return this.defaultValue as boolean;

      const isEnabled = await analytics.isFeatureEnabled(key, userId);

      return isEnabled ?? (this.defaultValue as boolean);
    },
  });
