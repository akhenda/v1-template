export * from './components';

/**
 * Returns a function that calls all of its arguments.
 *
 * @param fns A rest parameter of functions to be called.
 * @returns A function that calls all of its arguments.
 */
export function callAll<Args extends unknown[]>(
  ...fns: (((...args: Args) => unknown) | undefined)[]
) {
  return (...args: Args) => fns.forEach((fn) => fn?.(...args));
}
