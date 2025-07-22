/**
 * Returns a string with the first letter of each word capitalized.
 * @param str the string to be converted
 * @returns a string with the first letter of each word capitalized
 */
export function toTitleCase(str: string): string {
  // Handle empty or null strings
  if (!str) return '';

  return str
    .toLowerCase()
    .split(' ')
    .map((word: string) => {
      // Handle empty words resulting from multiple spaces
      if (word.length === 0) return '';

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Removes the trailing '/-' from a JSON pointer string, if it exists.
 *
 * @param {string} jsonPointer The input JSON pointer string.
 * @returns {string} The JSON pointer without the trailing '/-'.
 */
export function cleanJsonPointer(jsonPointer: string) {
  if (typeof jsonPointer === 'string' && jsonPointer.endsWith('/-')) {
    // Slice the string from the beginning to two characters from the end.
    return jsonPointer.slice(0, -2);
  }

  return jsonPointer;
}
