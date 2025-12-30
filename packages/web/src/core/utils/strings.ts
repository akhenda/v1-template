/**
 * Converts a given string to kebab case.
 *
 * @example
 * convertStringToKebabCase('CamelCase') // 'camel-case'
 * convertStringToKebabCase('snake_case') // 'snake-case'
 * @param {string} inputString - input string to convert
 * @returns {string} the converted string
 */
export const convertStringToKebabCase = (inputString: string) =>
  inputString.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase();
