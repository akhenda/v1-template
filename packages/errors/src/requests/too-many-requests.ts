import { createErrorUtilities } from '../utils';

import { RequestError } from './base';

export class TooManyRequestsError extends RequestError {
  readonly name = 'TooManyRequestsError';
  readonly code = 429;
}

export const { is: isTooManyRequestsError, isInstance: isTooManyRequestsErrorInstance } =
  createErrorUtilities(TooManyRequestsError);
