import { type StoreApi, useStore } from 'zustand';

export type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

/**
 * Auto Generating Selectors
 *
 * https://zustand.docs.pmnd.rs/guides/auto-generating-selectors
 *
 * This function creates a store with selectors that can be used to get the
 * state values by their key.
 *
 * @example
 * const store = createSelectors(createStore((set) => ({
 *   count: 0,
 *   increment: () => set((s) => ({ count: s.count + 1 })),
 * })))
 *
 * const Counter = () => {
 *   const count = store.use.count();
 *   return <div>Count: {count}</div>
 * }
 *
 * @param _store the store to wrap
 * @returns a store with selectors
 */
export const createSelectors = <S extends StoreApi<object>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>;

  store.use = {};

  for (const k of Object.keys(store.getState())) {
    // biome-ignore lint/suspicious/noExplicitAny: this is intentional
    (store.use as any)[k] = () => useStore(_store, (s) => s[k as keyof typeof s]);
  }

  return store;
};
