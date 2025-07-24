import { logger } from '@repo/observability/logger';

const storage =
  typeof window !== 'undefined'
    ? window.localStorage
    : { getItem: () => null, setItem: () => null, removeItem: () => null };

/**
 * Retrieves a value from the local storage.
 *
 * @param key The key of the value to retrieve.
 *
 * @returns The value of type T that was stored, or null if the key does not exist
 * or the value is not a valid JSON.
 */
export function getItem<T>(key: string): T | null {
  const value = storage.getItem(key);

  try {
    return value ? JSON.parse(value) || null : null;
  } catch (error) {
    logger.error('Error parsing JSON:', error);

    return null;
  }
}

/**
 * Retrieves an array of values from the local storage.
 *
 * @param key The key of the array to retrieve.
 *
 * @returns The array of values of type T that was stored, or an empty array if
 * the key does not exist or the value is not a valid JSON.
 */
export function getItemArray<T>(key: string) {
  const value = getItem<T[]>(key);

  return value || [];
}

/**
 * Stores a value in the local storage.
 * @param key The key under which the value will be stored.
 * @param value The value to store. It will be converted to JSON.
 */
export function setItem<T>(key: string, value: T) {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    logger.error('Error storing JSON:', error);
  }
}

/**
 * Deletes a key-value pair from the local storage.
 *
 * @param key The key of the value to delete.
 */
export function removeItem(key: string) {
  storage.removeItem(key);
}

/**
 * Removes the first item from an array stored in local storage that matches the
 * given target property and target value.
 *
 * @param key The key of the array to remove the item from.
 * @param target The property key to match on within the array items.
 * @param targetValue The value of the property to match on for removal.
 */
export function removeItemFromArray<T, U>(key: string, target: keyof T, targetValue: U) {
  const items = getItemArray<T>(key);
  const updatedItems = items.filter((item) => item[target] !== targetValue);

  setItem(key, updatedItems);
}

/**
 * Returns an object with helper functions for interacting with the local storage.
 *
 * The returned helpers are:
 *
 * - `getItem<T>(key: string)`: Retrieves a value from the local storage.
 * - `getItemArray<T>(key: string)`: Retrieves an array of values from the local
 *   storage.
 * - `setItem<T>(key: string, value: T)`: Stores a value in the local storage.
 * - `removeItem(key: string)`: Deletes a key-value pair from the local storage.
 * - `removeItemFromArray<T, U>(key: string, target: keyof T, targetValue: U)`: Removes the first item from an array stored in local storage that matches the
 *   given target property and target value.
 *
 * @returns An object with the bound helper functions.
 */
export function getStorageHelpers() {
  return {
    /** Gets a value from the local storage. */
    getItem: <T>(key: string) => getItem<T>(key),

    /** Gets an array of values from the local storage. */
    getItemArray: <T>(key: string) => getItemArray<T>(key),

    /** Sets a value in the local storage. */
    setItem: <T>(key: string, value: T) => setItem<T>(key, value),

    /** Deletes a key-value pair from the local storage. */
    removeItem: (key: string) => removeItem(key),

    /** Removes the first item from an array stored in local storage that
     * matches the given target property and target value.
     */
    removeItemFromArray: <T, U>(key: string, target: keyof T, targetValue: U) =>
      removeItemFromArray<T, U>(key, target, targetValue),
  };
}
