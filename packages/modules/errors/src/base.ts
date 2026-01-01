import type { AnyValue } from '@repo/types';

export abstract class ErrorBase<T extends string> extends Error {
  abstract name: T;

  cause?: unknown;

  constructor(message: string, asserter?: (...rest: AnyValue[]) => AnyValue) {
    super(message);

    Error.captureStackTrace?.(this, asserter || this.constructor);
  }
}
