import type { Prettify, UnionToIntersection } from './helpers';

type SubClassList<T extends string, U extends string> = Partial<Record<T | 'DEFAULT', U>>;

export type ClassList<T extends string | SubClassList<string, string>> = Prettify<
  UnionToIntersection<
    T extends string
      ? Partial<Record<T, string>>
      : T extends SubClassList<infer K, infer V>
        ? Partial<Record<K, SubClassList<V, string>>>
        : never
  >
>;

export type EmptyObject = Record<never, never>;

type PartialExcept<T, K extends keyof T> = { [P in K]?: T[P] } & Omit<T, K>;

export type ObjectWithPossibleOptionalKeys<T extends object> = {
  [K in keyof T]: PartialExcept<T, K>;
}[keyof T];

export type UniqueIdentifier = string | number;
