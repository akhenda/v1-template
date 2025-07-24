import { STORAGE_KEYS } from '../../../constants';

type SupportedLocale = 'en' | 'sw';

import { getStorageHelpers } from '../helpers';

/** App locale storage key */
export const APP_LOCALE_KEY = STORAGE_KEYS.app.locale;

const { getItem, setItem, removeItem } = getStorageHelpers();

/**
 * Retrieves the user's saved locale from the app's storage. The locale is
 * saved in the key `APP_LOCALE_KEY`
 * (which is imported from `@/core/storage/items/app`).
 *
 * @returns The saved locale, or undefined if it is not set.
 */
export const getAppLocale = () => getItem<SupportedLocale>(APP_LOCALE_KEY);

/**
 * Saves the given locale to the user's device storage. This function should be
 * used when the user explicitly selects a different locale than the one that
 * the app is currently using. The locale is saved in the app's storage in the
 * key `APP_LOCALE_KEY` (which is imported from `@/core/storage/items/app`).
 *
 * @param locale - The locale to save, in the format of a language code (for
 * example, `en`, `fr`, `es`, etc).
 * @returns Whether the locale was successfully saved.
 */
export const setAppLocale = (locale: SupportedLocale) => setItem(APP_LOCALE_KEY, locale);

/**
 * Deletes the saved locale from the user's device storage.
 * This function should be used when the locale needs to be removed, such as
 * when a user logs out or resets the app settings. The locale is deleted
 * from the app's storage key `APP_LOCALE_KEY`.
 *
 * @returns A promise that resolves when the locale is successfully deleted.
 */
export const deleteAppLocale = () => removeItem(APP_LOCALE_KEY);

/**
 * A collection of functions for working with the app's locale storage.
 */
export const appLocaleStorage = {
  /** Retrieves the user's saved locale from the app's storage. */
  getItem: getAppLocale,

  /** Saves the given locale to the user's device storage. */
  setItem: setAppLocale,

  /** Deletes the saved locale from the user's device storage. */
  removeItem: deleteAppLocale,
};
