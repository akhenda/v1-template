import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join, relative, resolve } from 'node:path';

import { logger } from '@repo/observability/logger';

// The script starts its search from the directory it is located in.
const startDir = resolve(__dirname, '../');

/**
 * Converts a filename (e.g. 'ats-system.md') to a safe export name (e.g. atsSystemPrompt)
 */
function fileNameToExportName(filename: string): string {
  const name = basename(filename, '.md');
  // CamelCase + 'Prompt' suffix, e.g. 'atsSystemPrompt'
  return `${name
    .replace(/[-_](.)/g, (_, g1) => g1.toUpperCase())
    .replace(/^(.)/, (_, g1) => g1.toLowerCase())}Prompt`;
}

/**
 * Processes a single Markdown file by reading its content and generating
 * a corresponding TypeScript file that exports the content as a string literal.
 * @param mdPath - The full path to the Markdown file.
 */
function processMdFile(mdPath: string): void {
  const fileBasename = basename(mdPath);
  const mdContent = readFileSync(mdPath, 'utf8');
  const exportName = fileNameToExportName(fileBasename);

  // The new .ts file will be created in the same directory as the source .md file.
  const tsFileName = join(dirname(mdPath), `${basename(fileBasename, '.md')}.ts`);

  // Escape backticks inside the markdown (rare, but possible)
  const safeContent = mdContent.replace(/`/g, '\\`');

  const tsContent =
    `// Auto-generated from ${fileBasename}. DO NOT EDIT!\n\n` +
    `export const ${exportName} = \`\n${safeContent}\`;\n`;

  writeFileSync(tsFileName, tsContent, 'utf8');

  // Calculate the path relative to the script's execution directory
  const relativeTsPath = relative(startDir, tsFileName);

  logger.info(`Generated ${relativeTsPath}`);
}

/**
 * Recursively walks through a directory, finds all '.md' files,
 * and processes them.
 * @param dir - The directory to start from.
 */
function findAndProcessMdFiles(dir: string): void {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      // It's a directory, so we recurse into it.
      findAndProcessMdFiles(fullPath);
    } else if (extname(entry.name) === '.md') {
      // It's a Markdown file, so we process it.
      processMdFile(fullPath);
    }
  }
}

// --- Main Execution ---
findAndProcessMdFiles(startDir);

logger.info('✅ All markdown files have been processed recursively.');
