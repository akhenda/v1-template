import { useEffect, useRef } from 'react';

/**
 * Like `useEffect`, but the effect is only run on mount and unmount (not on
 * re-renders).
 *
 * Useful for setting up event listeners or other side effects that should only
 * be run once, then cleaned up on unmount.
 *
 * @param effect The effect to run on mount
 * @param deps The dependencies of the effect. When these change, the effect is
 * re-run.
 * @param cleanup An optional cleanup function to run on unmount. If not
 * provided, the `effect` function is used.
 */
export function useDidMountEffect(effect: () => void, deps: unknown[], cleanup?: () => void) {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) return effect();

    didMount.current = true;

    return cleanup;
  }, deps);
}
