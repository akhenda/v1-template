export function getStorageKey<T extends string>(key: T) {
  return `resume-moto-storage@${key}` as const;
}

/**
 * storage keys
 */
export const STORAGE_KEYS = {
  app: { id: getStorageKey('app'), locale: getStorageKey('app.locale') },
  dbz: {
    id: getStorageKey('dbz'),
    collected: getStorageKey('dbz.collected'),
    usable: getStorageKey('dbz.usable'),
    likedPlanets: getStorageKey('dbz.liked-planets'),
    likedCharacters: getStorageKey('dbz.liked-characters'),
  },
  featureFlag: { id: getStorageKey('feature-flag') },
  query: { id: getStorageKey('query'), client: getStorageKey('query.client') },
  session: { id: getStorageKey('session'), token: getStorageKey('session.token') },
  zustand: { id: getStorageKey('zustand'), app: getStorageKey('zustand.app') },
} as const;
