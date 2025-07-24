import { execSync } from 'node:child_process';
import path from 'node:path';

import type { PlopTypes } from '@turbo/gen';
import consola from 'consola';

/**
 * Runs the `bun install` command in the specified path.
 *
 * @param answers - An object containing the following properties:
 *   - path: The path where the `bun install` command should be run. Defaults to the current working directory.
 *
 * @throws An error if the `bun install` command fails.
 *
 * @returns A message indicating that the `bun install` command was successful.
 */
export const bunInstall: PlopTypes.CustomActionFunction = (answers: Partial<{ path: string }>) => {
  try {
    const installPath = answers?.path || '.';

    consola.log(`Running 'bun install' in ${installPath}...`);

    execSync('bun install', { stdio: 'inherit', cwd: installPath });

    return `Successfully ran 'bun install' in ${installPath}`;
  } catch (error) {
    throw new Error(`Failed to run 'bun install': ${(error as Error).message}`);
  }
};

/**
 * Creates a new Expo app in the specified path.
 *
 * @param answers - An object containing the following properties:
 *   - path: The path where the new app should be created. Defaults to the current working directory.
 *   - appName: The name of the new app. Defaults to "my-app".
 *
 * @returns A success message indicating the app name and path.
 *
 * @throws An error if the Expo app creation fails.
 */
export const bunCreateExpo: PlopTypes.CustomActionFunction = (
  answers: Partial<{ path: string; appName: string }>,
) => {
  try {
    // Default to "my-app" if not provided
    const appName = answers?.appName || 'my-app';

    // Resolve the target path
    const targetPath = path.resolve(answers?.path || '.');

    consola.log(`\nCreating a new Expo app "${appName}" at "${targetPath}"...`);

    // Run the bun create expo command
    execSync(`bun --bun create expo ${appName}`, {
      stdio: 'inherit',
      cwd: targetPath, // Set the working directory to the specified path
      env: {
        ...process.env, // Inherit the parent environment
        BUN: '1', // Explicitly set BUN as the package manager
      },
    });

    return `Successfully created Expo app: ${appName} at ${targetPath}`;
  } catch (error) {
    throw new Error(`Failed to create Expo app: ${(error as Error).message}`);
  }
};

/**
 * Creates a new Next.js app in the specified path.
 *
 * @param answers - An object containing the following properties:
 *   - path: The path where the new app should be created. Defaults to the current working directory.
 *
 * @returns The path where the Next.js app was created.
 *
 * @throws An error if the bun create next-app command fails.
 */
export const bunCreateNextApp: PlopTypes.CustomActionFunction = (
  answers: Partial<{ path: string }>,
) => {
  try {
    // Resolve the target path
    const targetPath = path.resolve(answers?.path || '.');

    consola.log(`\nCreating a new Next.js app at "${targetPath}"...`);

    // Run the bun create next-app command
    execSync('bun create next-app', {
      stdio: 'inherit',

      // Set the working directory to the specified path
      cwd: targetPath,
    });

    return `Successfully created Next.js app at ${targetPath}`;
  } catch (error) {
    throw new Error(`Failed to create Next.js app: ${(error as Error).message}`);
  }
};
