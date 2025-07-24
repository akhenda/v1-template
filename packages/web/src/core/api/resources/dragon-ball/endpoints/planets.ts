/**
 * Uses https://web.dragonball-api.com
 *
 * Base URL: http://dragonball-api.com/api
 */

import { client } from '../../../config';

import type { Planet, PlanetFilters } from './planets.types';
import type { Page } from './types';

const BASE_URL = 'https://dragonball-api.com/api';
const ENDPOINT = '/planets';

client.setBaseURL(BASE_URL);

/**
 * Fetches a page of dragon ball planets.
 *
 * @param page The page number, 1-indexed.
 * @param filters Optional filters to apply to the request.
 * @param options Optional options for the request.
 * @returns The response data from the API.
 */
export async function getDragonBallPlanets(
  page: number,
  filters: PlanetFilters = {},
  options?: { signal?: AbortSignal },
) {
  const { data } = await client.get<Page<Planet>>(ENDPOINT, { page, ...filters }, options);

  return data;
}

/**
 * Fetches a single dragon ball planet by ID.
 *
 * @param id The ID of the planet to fetch.
 * @param options Optional options for the request.
 * @returns The response data from the API.
 */
export async function getDragonBallPlanet(id: number, options?: { signal?: AbortSignal }) {
  const { data } = await client.get<Planet>(`${ENDPOINT}/${id}`, {}, options);

  return data;
}
