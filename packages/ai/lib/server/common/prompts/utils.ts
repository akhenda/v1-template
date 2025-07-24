import type { AnyValue } from '@repo/types';

/**
 * Splits the input prose into an array of trimmed chunks based on the `---CHUNK---` delimiter.
 *
 * @param prose - The string containing prose with `---CHUNK---` delimiters.
 * @returns An array of prose chunks, each trimmed of surrounding whitespace.
 */
export function getPromptChunksFromProse(prose: string) {
  return prose
    .split('---CHUNK---')
    .map((c) => c.trim())
    .filter(Boolean);
}

/**
 * Joins an array of prose chunks into a single string, separated by a blank line in between.
 *
 * @param chunks - An array of strings, each containing a chunk of prose.
 * @returns A single string containing the joined prose chunks.
 */
export function getPromptFromChunks(chunks: string[]) {
  return chunks.join('\n\n');
}

/**
 * Creates a prompt string from a tagged template literal, splitting it into chunks at
 * `---CHUNK---` delimiters. Each chunk is trimmed of surrounding whitespace, and any
 * empty chunks are removed.
 *
 * @param literals - A tagged template literal containing the prompt text.
 * @param placeholders - Zero or more values to be interpolated into the prompt text.
 * @returns A single string containing the joined and trimmed prompt chunks.
 */
export function chunkedPrompt(literals: TemplateStringsArray, ...placeholders: AnyValue[]) {
  const raw = String.raw(literals, ...placeholders);

  return raw
    .split('---CHUNK---')
    .map((c) => c.trim())
    .filter(Boolean)
    .join('\n\n')
    .trim();
}

/**
 * Transforms a markdown prompt file into a flat string with `---CHUNK---` before each H3 section.
 * Returns a clean string ready to pass to a prompt function.
 */
export function chunkMarkdownPrompt(raw: string, injectResumeSchema = false) {
  const transformed = raw
    .split('\n---\n')
    .map((c) => c.trim())
    .filter(Boolean)
    .join('\n\n\n')
    .trim();

  if (injectResumeSchema) return transformed.replace('___REPLACE_WITH_SCHEMA___', '');

  return transformed;
}

/**
 * Sanitizes interpolated input values like role titles for use in prompts.
 * Escapes backslashes, quotes, and line breaks.
 */
export function sanitizePromptInput(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\r/g, '');
}
