import { useCallback, useRef } from 'react';

import type { AnyValue } from '@repo/types';

export function useThrottle<T extends (...args: AnyValue[]) => void>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const lastRan = useRef(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      const handler = () => {
        if (Date.now() - lastRan.current >= delay) {
          callback(...args);
          lastRan.current = Date.now();
        } else {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);

          timeoutRef.current = setTimeout(
            () => {
              callback(...args);
              lastRan.current = Date.now();
            },
            delay - (Date.now() - lastRan.current),
          );
        }
      };

      handler();
    },
    [callback, delay],
  );
}
