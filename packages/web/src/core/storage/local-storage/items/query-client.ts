import { STORAGE_KEYS } from '../../../constants';
import { getStorageHelpers } from '../helpers';

/** Query client storage key */
export const QUERY_CLIENT_KEY = STORAGE_KEYS.query.client;

const { getItem, setItem, removeItem } = getStorageHelpers();

/**
 * Retrieves the React Query client from the MMKV storage.
 *
 * @returns The React Query client from the storage, or undefined if it is not set.
 */
export const getQueryClient = () => getItem<string>(QUERY_CLIENT_KEY);

/**
 * Stores the React Query client in the MMKV storage.
 *
 * @param client - The React Query client to store in the MMKV storage.
 * @returns A promise that resolves when the React Query client is successfully stored.
 */
export const setQueryClient = (client: string) => setItem(QUERY_CLIENT_KEY, client);

/**
 * Deletes the React Query client from the MMKV storage.
 *
 * This function should be used when the React Query client needs to be removed, such as
 * when a user logs out or resets the app settings. The React Query client is deleted
 * from the MMKV storage key `QUERY_CLIENT_KEY`.
 *
 * @returns A promise that resolves when the React Query client is successfully deleted.
 */
export const deleteQueryClient = () => removeItem(QUERY_CLIENT_KEY);

/**
 * A collection of functions for working with the React Query client in MMKV storage.
 */
export const queryClientStorage = {
  /** Retrieves the React Query client from the MMKV storage. */
  getItem: getQueryClient,

  /** Stores the React Query client in the MMKV storage. */
  setItem: setQueryClient,

  /** Deletes the React Query client from the MMKV storage. */
  removeItem: deleteQueryClient,
};
