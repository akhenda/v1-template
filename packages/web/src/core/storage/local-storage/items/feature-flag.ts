import { STORAGE_KEYS } from '../../../constants';
import { getStorageHelpers } from '../helpers';

/** Feature flag storage key */
export const FEATURE_FLAG_KEY = STORAGE_KEYS.featureFlag.id;

const { getItem, setItem, removeItem } = getStorageHelpers();

/**
 * Retrieves the feature flag value from the device storage.
 *
 * @returns The value of the feature flag, or null if it does not exist.
 */
export const getFeatureFlag = () => getItem<boolean>(FEATURE_FLAG_KEY);

/**
 * Stores a feature flag value in the device storage.
 *
 * @param featureFlag The value of the feature flag to store.
 * @returns A promise that resolves when the value is stored.
 */
export const setFeatureFlag = (featureFlag: string) => setItem(FEATURE_FLAG_KEY, featureFlag);

/**
 * Deletes the feature flag value from the device storage.
 *
 * @returns A promise that resolves when the feature flag is deleted.
 */
export const deleteFeatureFlag = () => removeItem(FEATURE_FLAG_KEY);

/**
 * An object containing functions for interacting with the feature flag storage.
 */
export const featureFlagStorage = {
  /** Retrieves the feature flag value from the device storage. */
  getItem: getFeatureFlag,

  /** Stores a feature flag value in the device storage. */
  setItem: setFeatureFlag,

  /** Deletes the feature flag value from the device storage. */
  removeItem: deleteFeatureFlag,
};
