import { STORAGE_KEYS } from '../../../constants';
import { getStorageHelpers } from '../helpers';

export type DragonBall = { id: string; stars: number; collected: boolean; location: string };
export type Planet = { id: number; name: string; image: string };
export type Character = { id: number; name: string; image: string };

/** DBZ storage keys */
export const DBZ_COLLECTED_KEY = STORAGE_KEYS.dbz.collected;
export const DBZ_LIKED_PLANETS_KEY = STORAGE_KEYS.dbz.likedPlanets;
export const DBZ_LIKED_CHARACTERS_KEY = STORAGE_KEYS.dbz.likedCharacters;

const { getItemArray, setItem, removeItemFromArray, removeItem } = getStorageHelpers();

/**
 * Retrieves the user's saved dragon balls from device storage.
 *
 * @returns An array of the user's saved dragon balls, or an empty array if
 *          there are no saved dragon balls.
 */
export const getCollected = () => getItemArray<DragonBall>(DBZ_COLLECTED_KEY);

/**
 * Saves the given dragon balls to the user's device storage.
 *
 * @param dragonBalls An array of dragon balls to save.
 */
export const setCollected = (dragonBalls: DragonBall[]) => setItem(DBZ_COLLECTED_KEY, dragonBalls);

/**
 * Deletes a dragon ball from the user's device storage.
 *
 * @param id The ID of the dragon ball to delete.
 */
export const deleteCollectedBall = (id: string) => {
  return removeItemFromArray<DragonBall, string>(DBZ_COLLECTED_KEY, 'id', id);
};

/**
 * Retrieves the user's liked planets from the device storage.
 *
 * @returns An array of liked planets, or an empty array if no liked planets are stored.
 */
export const getLikedPlanets = () => getItemArray<Planet>(DBZ_LIKED_PLANETS_KEY);

/**
 * Saves the given planets as the user's liked planets in the device storage.
 *
 * @param planets An array of planets to save as liked.
 */
export const setLikedPlanets = (planets: Planet[]) => setItem(DBZ_LIKED_PLANETS_KEY, planets);

/**
 * Deletes a planet from the user's liked planets in the device storage.
 *
 * @param id The ID of the planet to delete.
 * @returns A promise that resolves when the planet is deleted.
 */
export const deleteLikedPlanet = (id: number) => {
  return removeItemFromArray<Planet, number>(DBZ_LIKED_PLANETS_KEY, 'id', id);
};

/**
 * Clears all liked planets from the device storage.
 *
 * @returns A promise that resolves when the liked planets are cleared.
 */
export const clearLikedPlanets = () => removeItem(DBZ_LIKED_PLANETS_KEY);

/**
 * Retrieves the user's liked characters from the device storage.
 *
 * @returns An array of liked characters, or an empty array if no liked characters are stored.
 */
export const getLikedCharacters = () => getItemArray<Character>(DBZ_LIKED_CHARACTERS_KEY);

/**
 * Saves the given characters as the user's liked characters in the device storage.
 *
 * @param characters An array of characters to save as liked.
 */
export const setLikedCharacters = (characters: Character[]) =>
  setItem(DBZ_LIKED_CHARACTERS_KEY, characters);

/**
 * Deletes a character from the user's liked characters in the device storage.
 *
 * @param id The ID of the character to delete.
 * @returns A promise that resolves when the character is deleted.
 */
export const deleteLikedCharacter = (id: number) => {
  return removeItemFromArray<Character, number>(DBZ_LIKED_CHARACTERS_KEY, 'id', id);
};

/**
 * Clears all liked characters from the device storage.
 *
 * @returns A promise that resolves when the liked characters are cleared.
 */
export const clearLikedCharacters = () => removeItem(DBZ_LIKED_CHARACTERS_KEY);

/**
 * A collection of functions for working with the DBZ's storage.
 */
export const dbzStorage = {
  /** Retrieves the user's saved dragon balls from the device storage. */
  getCollected,

  /** Saves the given dragon balls to the user's device storage. */
  setCollected,

  /** Removes a dragon ball from the user's device storage. */
  deleteCollectedBall,

  /** Retrieves the user's liked planets from the device storage. */
  getLikedPlanets,

  /** Saves the given planets as the user's liked planets in the device storage. */
  setLikedPlanets,

  /** Deletes a planet from the user's liked planets in the device storage. */
  deleteLikedPlanet,

  /** Clears all liked planets from the device storage. */
  clearLikedPlanets,

  /** Retrieves the user's liked characters from the device storage. */
  getLikedCharacters,

  /** Saves the given characters as the user's liked characters in the device storage. */
  setLikedCharacters,

  /** Deletes a character from the user's liked characters in the device storage. */
  deleteLikedCharacter,

  /** Clears all liked characters from the device storage. */
  clearLikedCharacters,
};
