// Utility functions for creating error-specific helpers

import type { AnyValue } from '@repo/types';

export interface ErrorConstructor<T> {
  new (message: AnyValue): T;
}

/**
 * Creates an assertion function for a specific error type
 */
export function createAssertionFn<T extends Error & { cause?: unknown }>(
  ErrorClass: ErrorConstructor<T>,
) {
  return (condition: unknown, message: string, cause?: unknown): asserts condition => {
    if (!condition) {
      const err = new ErrorClass(message);

      if (cause) err.cause = cause;

      throw err;
    }
  };
}

/**
 * Creates a type guard function for a specific error type
 */
export function createTypeGuard<T extends Error>(ErrorClass: ErrorConstructor<T>) {
  return (err: unknown): err is T => err instanceof ErrorClass;
}

/**
 * Creates a simpler assertion function for basic error throwing
 */
export function createSimpleAssertionFn<T extends Error>(ErrorClass: ErrorConstructor<T>) {
  return (condition: unknown, message?: string): asserts condition => {
    if (!condition) throw new ErrorClass(message || 'Assertion failed');
  };
}

/**
 * Utility to check if an error is of a specific type
 */
export function isErrorInstance<T extends Error>(
  err: unknown,
  ErrorClass: ErrorConstructor<T>,
): err is T {
  return err instanceof ErrorClass;
}

/**
 * Creates consistent error utilities for any error type
 */
export function createErrorUtilities<T extends Error>(ErrorClass: ErrorConstructor<T>) {
  return {
    is: createTypeGuard(ErrorClass),
    assert: createAssertionFn(ErrorClass),
    assertSimple: createSimpleAssertionFn(ErrorClass),
    isInstance: (err: unknown) => isErrorInstance(err, ErrorClass),
  };
}
