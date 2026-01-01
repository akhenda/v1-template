import { logger } from '@repo/observability/logger';

/**
 * A Promise-based version of setTimeout. This function returns a Promise that
 * resolves after a specified amount of time.
 *
 * @param ms The amount of time to wait in milliseconds
 * @returns A Promise that resolves after the specified amount of time
 */
export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * A Promise-based version of setTimeout that logs a message when called.
 * This function returns a Promise that resolves after a specified amount of time.
 *
 * @param time The amount of time to wait in milliseconds
 * @returns A Promise that resolves after the specified amount of time
 */
export function delay(time: number) {
  logger.trace(`Delay for ${time / 1000} seconds`, { time });

  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
