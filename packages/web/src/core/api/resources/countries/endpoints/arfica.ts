/**
 * Uses https://restcountries.com
 *
 * Base URL: https://restcountries.com/v3.1
 */
import { client } from '../../../config';
import type { RESTCountriesAPIErrorResponse } from '../utils';

import type { Country } from './types';

const BASE_URL = 'https://restcountries.com/v3.1';
const ENDPOINT = '/region';

client.setBaseURL(BASE_URL);

/**
 * Fetches a list of countries in the Africa region from the API.
 *
 * @param options Optional settings for the request, including an abort signal.
 * @returns A promise that resolves to an array of Country objects.
 */
export async function getCountries(options?: { signal?: AbortSignal }) {
  // Send a GET request to the API to fetch countries in the Africa region
  const response = await client.get<Country[], RESTCountriesAPIErrorResponse>(
    `${ENDPOINT}/africa`,
    {},
    options,
  );

  if (!response.ok) throw new Error(response.data?.message);

  // Return the fetched data
  return response.data;
}
