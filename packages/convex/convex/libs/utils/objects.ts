import * as R from 'remeda';

export function convertKeysToCamelCase<T extends object>(obj: T) {
  return R.mapKeys(obj, (key) => R.toCamelCase(key));
}
