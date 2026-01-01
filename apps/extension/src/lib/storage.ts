/** biome-ignore-all lint/complexity/noVoid: FIXME: later */
import { useEffect, useState } from 'react';

import type { WxtStorageItem } from '#imports';
import { storage as browserStorage } from '#imports';
import type { User } from '~/types';
import { Theme } from '~/types';

export const StorageKey = { THEME: 'local:theme', USER: 'local:user' } as const;

export type StorageKey = (typeof StorageKey)[keyof typeof StorageKey];

const storage = {
  [StorageKey.THEME]: browserStorage.defineItem<Theme>(StorageKey.THEME, {
    fallback: Theme.SYSTEM,
  }),
  [StorageKey.USER]: browserStorage.defineItem<User | null>(StorageKey.USER, { fallback: null }),
} as const;

type Value<T extends StorageKey> =
  (typeof storage)[T] extends WxtStorageItem<infer V, infer _> ? V : never;

export const getStorage = <K extends StorageKey>(key: K) => storage[key];

export const useStorage = <K extends StorageKey>(key: K) => {
  const item = storage[key] as WxtStorageItem<Value<K>, Record<string, unknown>>;
  const [value, setValue] = useState<Value<K> | null>(null);

  useEffect(() => {
    const unwatch = item.watch((val) => setValue(val));

    return () => unwatch();
  }, [item]);

  useEffect(() => {
    (async () => {
      const val = await item.getValue();

      setValue(val);
    })();
  }, [item.getValue]);

  const remove = () => {
    void item.removeValue();
  };

  const set = (val: Value<K>) => {
    void item.setValue(val);
  };

  return { data: value ?? item.fallback, remove, set };
};
