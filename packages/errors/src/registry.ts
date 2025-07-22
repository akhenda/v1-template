export const ERROR_REGISTRY = {
  // HTTP Request Errors
  RequestError: { code: 500 },
  NotFoundError: { code: 404 },
  BadRequestError: { code: 400 },
  UnauthorizedError: { code: 401 },
  ForbiddenError: { code: 403 },
  ConflictError: { code: 409 },
  TooManyRequestsError: { code: 429 },
  InternalServerError: { code: 500 },
  RequestTimeoutError: { code: 408 },

  // ATS/Domain-Specific Errors
  ATSError: { code: 500 },
  InvalidATSJSONPointerError: { code: 400 },
  InvalidATSSuggestionValueError: { code: 400 },
} as const;

export type ErrorName = keyof typeof ERROR_REGISTRY;
export type ErrorCode = (typeof ERROR_REGISTRY)[ErrorName]['code'];

export function getErrorCode(errorName: ErrorName): ErrorCode {
  return ERROR_REGISTRY[errorName].code;
}
