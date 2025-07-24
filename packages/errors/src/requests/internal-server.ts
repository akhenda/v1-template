import { createErrorUtilities } from '../utils';

import { RequestError } from './base';

export class InternalServerError extends RequestError {
  readonly name = 'InternalServerError';
  readonly code = 500;
}

export const { is: isInternalServerError, isInstance: isInternalServerErrorInstance } =
  createErrorUtilities(InternalServerError);
