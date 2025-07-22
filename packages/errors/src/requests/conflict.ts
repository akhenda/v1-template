import { createErrorUtilities } from '../utils';

import { RequestError } from './base';

export class ConflictError extends RequestError {
  readonly name = 'ConflictError';
  readonly code = 409;
}

export const { is: isConflictError, isInstance: isConflictErrorInstance } =
  createErrorUtilities(ConflictError);
