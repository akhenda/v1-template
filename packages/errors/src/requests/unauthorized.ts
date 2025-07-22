import { createErrorUtilities } from '../utils';

import { RequestError } from './base';

export class UnauthorizedError extends RequestError {
  readonly name = 'UnauthorizedError';
  readonly code = 401;
}

export const { is: isUnauthorizedError, isInstance: isUnauthorizedErrorInstance } =
  createErrorUtilities(UnauthorizedError);
