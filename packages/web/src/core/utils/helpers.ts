import * as R from 'remeda';

/** Does nothing. */
export const noop = R.doNothing;

/**
 * Checks if the given value is a promise.
 *
 * @param value - The value to be checked.
 * @returns A boolean indicating if the value is a promise.
 */
export const isPromise = (value: unknown): value is Promise<unknown> => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'then' in value &&
    typeof (value as { then: unknown }).then === 'function'
  );
};
