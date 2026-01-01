import { createErrorUtilities } from '../utils';

import { RequestError } from './base';

export class BadRequestError extends RequestError {
  readonly name = 'BadRequestError';
  readonly code = 400;
}

// Use centralized utilities for consistency
export const { is: isBadRequestError, isInstance: isBadRequestErrorInstance } =
  createErrorUtilities(BadRequestError);
