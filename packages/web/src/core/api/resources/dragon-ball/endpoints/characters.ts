/**
 * Uses https://web.dragonball-api.com
 *
 * Base URL: http://dragonball-api.com/api
 */

import { client } from '../../../config';

import type { Character, CharacterFilters, CharacterListItem } from './characters.types';
import type { Page } from './types';

const BASE_URL = 'https://dragonball-api.com/api';
const ENDPOINT = '/characters';

client.setBaseURL(BASE_URL);

/**
 * Get a page of characters.
 *
 * @param page The page number.
 * @param filters Character filters.
 * @param options Abort signal.
 * @returns A page of characters.
 */
export async function getDragonBallCharacters(
  page: number,
  filters: CharacterFilters = {},
  options?: { signal?: AbortSignal },
) {
  const { data } = await client.get<Page<CharacterListItem>>(
    ENDPOINT,
    { page, ...filters },
    options,
  );

  return data;
}

/**
 * Get a single character.
 *
 * @param id The character ID.
 * @param options Abort signal.
 * @returns The character.
 */
export async function getDragonBallCharacter(id: number, options?: { signal?: AbortSignal }) {
  const { data } = await client.get<Character>(`${ENDPOINT}/${id}`, {}, options);

  return data;
}

/**
 * Updates the description of a Dragon Ball character.
 *
 * @param id - The ID of the character to update.
 * @param description - The new description to set for the character.
 * @returns The updated character with the new description.
 */
export async function updateDragonBallCharacterDescription(id: number, description: string) {
  const { data } = await client.patch<Character>(`${ENDPOINT}/${id}`, { description });

  return data;
}
