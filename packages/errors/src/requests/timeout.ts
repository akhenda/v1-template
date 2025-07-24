import { createErrorUtilities } from '../utils';

import { RequestError } from './base';

export class RequestTimeoutError extends RequestError {
  readonly name = 'RequestTimeoutError';
  readonly code = 408;
}

export const { is: isRequestTimeoutError, isInstance: isRequestTimeoutErrorInstance } =
  createErrorUtilities(RequestTimeoutError);
