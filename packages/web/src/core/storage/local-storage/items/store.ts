import { STORAGE_KEYS } from '../../../constants';
import { getStorageHelpers } from '../helpers';

/** Store storage key */
export const STORE_KEY = STORAGE_KEYS.query.client;

const { getItem, setItem, removeItem } = getStorageHelpers();

/**
 * Retrieves the stored value associated with the store key.
 *
 * @returns The value of type string stored under the store key, or null if the
 * key does not exist or the value is not a valid JSON.
 */
export const getStore = () => getItem<string>(STORE_KEY);

/**
 * Stores the given value under the store key in the storage.
 *
 * @param store The value to store, which must be a valid JSON string.
 * @returns The value that was stored.
 */
export const setStore = (store: string) => setItem(STORE_KEY, store);

/**
 * Deletes the stored value associated with the store key from the storage.
 *
 * @returns A promise that resolves when the value is successfully deleted.
 */
export const deleteStore = () => removeItem(STORE_KEY);

/** Store storage methods */
export const storeStorage = {
  /** Retrieves the stored value associated with the store key. */
  getItem: getStore,

  /** Stores the given value under the store key in the storage. */
  setItem: setStore,

  /** Deletes the stored value associated with the store key from the storage. */
  removeItem: deleteStore,
};
