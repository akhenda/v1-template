import * as R from 'remeda';

// https://github.com/remeda/remeda/blob/main/packages/remeda/src/funnel.lodash-debounce.test.ts

export function debounce<F extends (...args: any) => void>(
  func: F,
  wait = 0,
  { leading = false, trailing = true, maxWait }: {
    readonly leading?: boolean;
    readonly trailing?: boolean;
    readonly maxWait?: number;
  } = {},
) {
  const {
    call,
    // Lodash v4 doesn't provide access to the `isIdle` (called `pending` in
    // Lodash v5) information.
    isIdle: _isIdle,
    ...rest
  } = R.funnel(
    (args: Parameters<F>) => {
      if (!trailing && !leading) {
        // In Lodash you can disable both the trailing and leading edges of the
        // debounce window, effectively causing the function to never be
        // invoked. Remeda uses the invokedAt enum exactly to prevent such a
        // situation; so to simulate Lodash we need to only pass the callback
        // when at least one of them is enabled.
        return;
      }

      // Funnel provides more control over the args, but lodash simply passes
      // them through, to replicate this behavior we need to spread the args
      // array maintained via the reducer below.
      func(...args);
    },
    {
      // Debounce stores the latest args it was called with for the next
      // invocation of the callback.
      reducer: (_, ...args: Parameters<F>) => args,
      minQuietPeriodMs: wait,
      ...(maxWait !== undefined && { maxBurstDurationMs: maxWait }),
      ...(trailing
        ? leading
          ? { triggerAt: "both" }
          : { triggerAt: "end" }
        : { triggerAt: "start" }),
    },
  );

  // Lodash uses a legacy JS-ism to attach helper functions to the main
  // callback of `debounce`. In Remeda we return a proper object where the
  // callback is one of the available properties. Here we destructure and then
  // reconstruct the object to fit the Lodash API.
  return Object.assign(call, rest);
}
