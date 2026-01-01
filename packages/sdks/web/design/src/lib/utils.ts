import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that merges `tailwind-merge` and `clsx`
 * for better compatibility with NativeWind.
 *
 * @param inputs - A list of class names, or functions that return class names.
 * @returns A merged class name.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const capitalize = (str: string) =>  str.charAt(0).toUpperCase() + str.slice(1);
export const getAvatarUrl = (seed: string) => `https://api.dicebear.com/9.x/glass/svg?seed=${seed}`;
