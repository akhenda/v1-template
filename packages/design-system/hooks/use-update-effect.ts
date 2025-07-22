import { useEffect, useRef } from 'react';

export function useUpdateEffect(callback: Function, dependencies: unknown[]) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    callback();
  }, dependencies);
}
