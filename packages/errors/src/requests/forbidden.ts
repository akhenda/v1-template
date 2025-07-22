import { createErrorUtilities } from '../utils';

import { RequestError } from './base';

export class ForbiddenError extends RequestError {
  readonly name = 'ForbiddenError';
  readonly code = 403;
}

export const { is: isForbiddenError, isInstance: isForbiddenErrorInstance } =
  createErrorUtilities(ForbiddenError);
