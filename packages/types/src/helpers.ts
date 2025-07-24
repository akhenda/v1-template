/**
 * Converts an object into an array of its values
 */
export type ObjectValues<T> = T[keyof T];

/**
 * Extracts the contravariant type
 *
 * biome-ignore lint/suspicious/noExplicitAny: this is intentional
 */
type Contra<T> = T extends any ? (arg: T) => void : never;

/**
 * Infer the contravariant type
 */
type InferContra<T> = [T] extends [(arg: infer I) => void] ? I : never;

/**
 * Pick one of the contravariant types
 *
 * https://www.hacklewayne.com/typescript-convert-union-to-tuple-array-yes-but-how
 */
type PickOne<T> = InferContra<InferContra<Contra<Contra<T>>>>;

/**
 * Extracts the element type of an array
 */
export type Union2Tuple<T> = PickOne<T> extends infer U // assign PickOne<T> to U
  ? Exclude<T, U> extends never // T and U are the same
    ? [T]
    : [...Union2Tuple<Exclude<T, U>>, U] // recursion
  : never;

/**
 * Prettifies a type
 *
 * https://www.youtube.com/watch?v=2lCCKiWGlC0
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/**
 * Converts an array of strings into a union
 */
export type UnionFromArray<T extends readonly string[]> = {
  [K in T[number]]: K;
}[T[number]];

/**
 * Converts an object into a partial object, except for the specified keys
 */
export type NullableExcept<T extends Record<string, unknown>, K extends keyof T> = {
  [key in K]: NonNullable<T[K]>;
} & Partial<T>;

/**
 * Converts an object into a nullable object
 */
export type Nullish<T> = T | null | undefined;

/**
 * Converts a union into an intersection
 */
export type UnionToIntersection<U> = // biome-ignore lint/suspicious/noExplicitAny: this is a type utility
  (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

/**
 * Creates a tuple with a fixed length
 */
export type FixedTuple<T, N extends number, R extends unknown[] = []> = R['length'] extends N
  ? R
  : FixedTuple<T, N, [T, ...R]>;

/**
 * Creates a tuple
 */
export type Tuple<
  T,
  N extends number | undefined = undefined,
  R extends T[] = [],
> = N extends undefined ? [T, ...T[]] : R['length'] extends N ? R : Tuple<T, N, [T, ...R]>;

/**
 * The result of a function
 */
export type Result<T = string, E = Error> =
  | { data: T; success: true }
  | { success: false; error: E };

/**
 * Creates a type with required fields
 */
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Creates a type with optional fields
 */
export type PartialFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Creates a placeholder object
 */
// biome-ignore lint/suspicious/noExplicitAny: TODO: we'll fix later
type ObjectPlaceholder = Record<string, any>;

/**
 * Overrides one object with another
 */
export type Override<T1 extends ObjectPlaceholder, T2 extends ObjectPlaceholder> = Omit<
  T1,
  keyof T2
> &
  T2;

// biome-ignore lint/suspicious/noExplicitAny: TODO: we'll fix later
export type LooseToStrict<T> = T extends any ? (string extends T ? never : T) : never;
