// https://medium.com/@barisberkemalkoc/axios-interceptor-intelligent-db46653b7303

import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Axios from 'axios';

import { logger } from '@repo/observability/logger';

import { CONFIG } from '../../constants';
import { sessionTokenStorage } from '../../storage/local-storage';

// assert(config.apiURL, 'env variable not set: apiURL');

/**
 * Returns a promise that resolves with a new session token after a 1 second delay.
 * NOTE: This is a placeholder, you should replace it with your actual token refresh logic.
 * @returns a promise that resolves with a new session token
 */
function refreshToken() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('new token');
    }, 1000);
  });
}

/**
 * Axios request interceptor that adds an Authorization header with a Bearer token
 * from the session token storage if it exists.
 *
 * @param {InternalAxiosRequestConfig} config - Axios request config
 * @returns {InternalAxiosRequestConfig} - Modified Axios request config
 */
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const authToken = sessionTokenStorage.getItem();

  if (authToken) config.headers.Authorization = `Bearer ${authToken}`;

  return config;
}

/**
 * Handles errors in the request interceptor.
 * @param {unknown} error - the error from the request interceptor
 * @returns {Promise<never>} - a rejected promise with the error
 */
function authRequestInterceptorError(error: unknown) {
  // Do something with request error
  return Promise.reject(error);
}

/**
 * Axios response interceptor that logs errors and their responses.
 * @param {Error & { response: Response }} error - the error from the response interceptor
 * @returns {Promise<never>} - a rejected promise with the error
 */
function errorResponseInterceptor(error: AxiosError & { response: Response }) {
  const status = error.response ? error.response.status : null;

  // should we also check TIMEOUT_ERR? 🤨
  if (
    error.code === 'ERR_CANCELED' ||
    error.code === 'ECONNABORTED' ||
    error.code === 'TIMEOUT_ERR'
  ) {
    // aborted in useEffect cleanup
    return Promise.resolve({ status: 499 });
  }

  if (status === 401) {
    // Handle unauthorized access
    logger.error('Unauthorized access', error).toast('Unauthorized access', {
      description: 'You are not authorized to access this resource.',
    });
  } else if (status === 404) {
    // Handle not found errors
    logger.error('Not found', error).toast('Resource not found', {
      description: 'The requested resource was not found.',
    });
  } else {
    // Handle other errors
    const msg = 'An API error occurred';
    logger.error('API error', error).toast('API Error', { description: msg });
  }

  return Promise.reject(error);
}

/**
 * Axios response interceptor that handles 401 Unauthorized responses by refreshing the user's auth token.
 * @param {Error & { response: Response; config: InternalAxiosRequestConfig }} error - the error from the response interceptor
 * @returns {Promise<AxiosResponse | never>} - a resolved promise with the response of the retried request, or a rejected promise with the error
 */
async function refreshAuthTokenInterceptor(
  error: Error & { response: Response; config: InternalAxiosRequestConfig },
) {
  if (error.response.status === 401) {
    // Refresh the token
    const newToken = await refreshToken();

    // Store the new token
    sessionTokenStorage.setItem(newToken);

    // Retry the original request
    return axios(error.config);
  }

  return Promise.reject(error);
}

export const axios = Axios.create({ baseURL: CONFIG.apiURL });

axios.interceptors.request.use(authRequestInterceptor, authRequestInterceptorError);
axios.interceptors.response.use((res) => res, errorResponseInterceptor);
axios.interceptors.response.use((res) => res, refreshAuthTokenInterceptor);
