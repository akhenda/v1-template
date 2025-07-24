#!/usr/bin/env node

/** biome-ignore-all lint/suspicious/noConsole: it's allowed in this file */

import { readdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import readline from 'node:readline';

// --- UTILITIES ---

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

function toPascalCase(str) {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
    .join('');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function getProjectDetails() {
  const name = await askQuestion('What is your project name? (e.g. My Awesome SaaS) ');
  const slug = await askQuestion(`What is your project slug? (default: ${slugify(name)}) `);

  rl.close();

  return { name: name || 'My Awesome SaaS', slug: slug || slugify(name) };
}

// --- MAIN LOGIC ---

const OLD_NAME = 'v1-template';
const OLD_NAME_PASCAL = 'V1Template';
const OLD_NAME_READABLE = 'v1-template';

async function renameProject() {
  const { name, slug } = await getProjectDetails();

  const newNamePascal = toPascalCase(slug);

  console.log(`\nRenaming project from '${OLD_NAME}' to '${slug}'...`);

  const rootDir = process.cwd();

  // Exclude node_modules, .git, and other non-project files
  const EXCLUDED_DIRS = [
    'node_modules',
    '.git',
    '.next',
    '.vercel',
    'dist',
    'build',
    'cache',
    '.turbo',
  ];
  const EXCLUDED_FILES = ['bun.lockb', 'pnpm-lock.yaml'];

  async function walkAndReplace(dir) {
    const entries = await readdir(dir);
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) {
        if (!EXCLUDED_DIRS.includes(entry)) {
          await walkAndReplace(fullPath);
        }
      } else if (stats.isFile() && !EXCLUDED_FILES.includes(entry)) {
        try {
          const content = await readFile(fullPath, 'utf-8');

          // Skip binary files
          if (content.includes('\uFFFD')) {
            console.log(`Skipping binary file: ${fullPath}`);
            continue;
          }

          let newContent = content.replace(new RegExp(OLD_NAME, 'g'), slug);
          newContent = newContent.replace(new RegExp(OLD_NAME_PASCAL, 'g'), newNamePascal);
          newContent = newContent.replace(new RegExp(OLD_NAME_READABLE, 'g'), name);

          if (newContent !== content) {
            await writeFile(fullPath, newContent, 'utf-8');
            console.log(`Updated: ${fullPath}`);
          }
        } catch (error) {
          console.error(`Could not process file ${fullPath}: ${error.message}`);
        }
      }

      // Rename files/dirs containing the old name
      if (entry.includes(OLD_NAME)) {
        const newEntry = entry.replace(new RegExp(OLD_NAME, 'g'), slug);
        const newPath = join(dir, newEntry);
        await rename(fullPath, newPath);
        console.log(`Renamed: ${fullPath} -> ${newPath}`);
      }
    }
  }

  await walkAndReplace(rootDir);

  console.log('\n✅ Project renamed successfully!');
  console.log("Don't forget to update your repository URL on GitHub.");
}

renameProject().catch((err) => {
  console.error('\n❌ An error occurred:', err);
  process.exit(1);
});
