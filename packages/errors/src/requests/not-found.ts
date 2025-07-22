import { createErrorUtilities } from '../utils';

import { RequestError } from './base';

export class NotFoundError extends RequestError {
  readonly name = 'NotFoundError';
  readonly code = 404;
}

// Use centralized utilities for consistency
export const {
  is: isNotFoundError,
  assert: assertFoundClaim,
  assertSimple: assertFound,
  isInstance: isNotFoundErrorInstance,
} = createErrorUtilities(NotFoundError);
