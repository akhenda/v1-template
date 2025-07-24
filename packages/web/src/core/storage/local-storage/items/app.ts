import { STORAGE_KEYS } from '../../../constants';
import { getStorageHelpers } from '../helpers';

/** The data stored in the app's storage */
type AppData = { theme: 'light' | 'dark' };

/** App storage key */
export const APP_KEY = STORAGE_KEYS.app.id;

const { getItem, setItem, removeItem } = getStorageHelpers();

/**
 * Retrieves the app's data from the storage using the app's storage key.
 *
 * @returns The app's data stored as a record, or undefined if no data is found.
 */
export const getApp = () => getItem<AppData>(APP_KEY);

/**
 * Stores the given app data in the device storage using the app's storage key.
 *
 * @param data The app data to store.
 * @returns A promise that resolves if the data is successfully stored, or
 * rejects if there is an error.
 */
export const setApp = (data: AppData) => setItem(APP_KEY, data);

/**
 * Deletes the app's data from the device storage using the app's storage key.
 *
 * @returns A promise that resolves if the data is successfully deleted, or
 * rejects if there is an error.
 */
export const deleteApp = () => removeItem(APP_KEY);

/**
 * A collection of functions for working with the app's storage.
 */
export const appStorage = {
  /** Retrieves the app's data from the device storage. */
  getItem: getApp,

  /** Stores the given app data in the device storage. */
  setItem: setApp,

  /** Deletes the app's data from the device storage. */
  removeItem: deleteApp,
};
