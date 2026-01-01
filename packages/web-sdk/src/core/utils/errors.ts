/**
 * @see https://gist.github.com/t3dotgg/a486c4ae66d32bf17c09c73609dacc5b
 * @see https://github.com/maxmorozoff/try-catch-tuple
 */

import { tryCatch } from '@maxmorozoff/try-catch-tuple';

/**
 * Asserts that the given condition is true. If it is not, an `Error` is thrown with the given message.
 *
 * @param condition The condition to assert
 * @param message The message to include in the error if the condition is not satisfied
 * @throws {Error} If the condition is not satisfied
 */
function assertCondition(condition: boolean, message: string): asserts condition {
  const [error] = tryCatch(() => {
    if (!condition) throw new Error(message);
  });

  if (error) throw error;
}

/**
 * Catches errors from a promise and returns a new promise that resolves with the same value if the error is not caught.
 *
 * @see https://www.youtube.com/watch?v=AdmGHwvgaVs
 * @param promise - The promise to catch errors from.
 * @param errorsToCatch - The errors to catch.
 * @returns A promise that resolves with a tuple of `[undefined, data]` if no error is caught, or `[error]` if an error is caught.
 */
function catchError<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch: E[],
): Promise<[undefined, T] | [InstanceType<E>]> {
  return promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((error) => {
      if (errorsToCatch === undefined) return [error];
      if (errorsToCatch.some((e) => error instanceof e)) return [error];

      throw error;
    });
}

export { tryCatch, assertCondition, catchError };
