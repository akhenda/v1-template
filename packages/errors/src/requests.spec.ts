import { describe, expect, it } from 'vitest';

import { ERROR_REGISTRY } from './registry';
import { RequestError } from './requests';
import { RequestError as BaseRequestError } from './requests/base';

type ErrorClass = new (message: string) => BaseRequestError;
type IsErrorFn = (err: unknown) => boolean;

const requestErrorNames = Object.keys(ERROR_REGISTRY).filter(
  (key) => key.endsWith('Error') && !key.startsWith('ATS') && key !== 'RequestError',
);

describe('Request Errors', () => {
  for (const errorName of requestErrorNames) {
    const ErrorClass = RequestError[errorName as keyof typeof RequestError] as ErrorClass;
    const errorInfo = ERROR_REGISTRY[errorName as keyof typeof ERROR_REGISTRY];
    const isErrorFn = RequestError[`is${errorName}` as keyof typeof RequestError] as IsErrorFn;

    if (ErrorClass) {
      describe(errorName, () => {
        it('should instantiate correctly', () => {
          const err = new ErrorClass('Test message');
          expect(err).toBeInstanceOf(Error);
          expect(err).toBeInstanceOf(BaseRequestError);
          expect(err.name).toBe(errorName);
          expect(err.code).toBe(errorInfo.code);
        });

        if (typeof isErrorFn === 'function') {
          it('should be correctly identified by its type guard', () => {
            const err = new ErrorClass('Test message');
            expect(isErrorFn(err)).toBe(true);
            expect(isErrorFn(new Error('Generic error'))).toBe(false);
          });
        } else {
          it.skip(`Type guard is${errorName} not found or not a function`, () => {});
        }
      });
    } else {
      describe(errorName, () => {
        it.skip('tests skipped (class not found)', () => {});
      });
    }
  }
});
