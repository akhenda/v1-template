import { STORAGE_KEYS } from '../../../constants';
import { getStorageHelpers } from '../helpers';

/** Session token storage key */
export const SESSION_TOKEN_KEY = STORAGE_KEYS.session.token;

const { getItem, setItem, removeItem } = getStorageHelpers();

/**
 * Retrieves the session token from the storage.
 *
 * @returns The session token as a string, or null if not found.
 */
export const getSessionToken = () => getItem<string>(SESSION_TOKEN_KEY);

/**
 * Stores the provided session token in the storage.
 *
 * @param {string} token - The session token to be stored.
 * @returns A promise that resolves when the token is successfully stored.
 */
export const setSessionToken = (token: string) => setItem(SESSION_TOKEN_KEY, token);

/**
 * Deletes the session token from the storage.
 *
 * @returns A promise that resolves when the session token is deleted.
 */
export const deleteSessionToken = () => removeItem(SESSION_TOKEN_KEY);

export const sessionTokenStorage = {
  /** Retrieves the session token from the storage. */
  getItem: getSessionToken,

  /** Stores the provided session token in the storage. */
  setItem: setSessionToken,

  /** Deletes the session token from the storage. */
  removeItem: deleteSessionToken,
};
