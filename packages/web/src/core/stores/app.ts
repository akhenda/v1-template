import { createStore } from 'zustand-x';

import { logger } from '@repo/observability/logger';

import { STORAGE_KEYS } from '../constants';

export type AppTheme = 'light' | 'dark' | 'system';
export type AppState = {
  theme: AppTheme;
  onboarded?: boolean;
  isDarkTheme?: boolean;
  isPreviewClosed?: boolean;
};

export const appStore = createStore<AppState>(
  { theme: 'system', onboarded: false, isPreviewClosed: false },
  {
    name: 'app',
    persist: {
      enabled: true,
      name: STORAGE_KEYS.zustand.app,
      partialize: (state) => ({ theme: state.theme, onboarded: state.onboarded }),
      onRehydrateStorage: () => {
        logger.debug('App store hydration starting...');

        return (_, error) => {
          if (error) logger.error('An error occured during app store hydration!', error);
          else logger.done('App store hydration complete');
        };
      },
    },
  },
)
  .extendSelectors(({ get }) => ({
    isDarkTheme: () => get('theme') === 'dark',
  }))
  .extendActions(({ get, set }) => ({
    changeTheme: (theme: AppTheme) => {
      logger.debug(`changing theme to ${theme}`);

      set('theme', theme);
    },
    onboard: () => set('onboarded', true),
    togglePreview: () => set('isPreviewClosed', !get('isPreviewClosed')),
  }));

export const {
  useStore: useAppStore,
  useState: useAppState,
  useValue: useAppValue,
  useTracked: useTrackedAppState,
  useTrackedStore: useTrackedAppStore,
  set: appActions,
} = appStore;
