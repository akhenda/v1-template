import { ErrorBase } from '../base';

export type RequestErrorName =
  | 'RequestError'
  | 'NotFoundError'
  | 'BadRequestError'
  | 'UnauthorizedError'
  | 'ForbiddenError'
  | 'ConflictError'
  | 'TooManyRequestsError'
  | 'InternalServerError'
  | 'RequestTimeoutError';

export abstract class RequestError extends ErrorBase<RequestErrorName> {
  abstract readonly code: number;
}
