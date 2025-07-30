import clsx, { type ClassValue } from 'clsx';
import consola from 'consola';
import { twMerge } from 'tailwind-merge';

import type { User } from '~/types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const logger = consola;

export const getName = (user: User) => {
  const name: unknown =
    user.fullName || user.username || user.firstName || user.lastName || user.unsafeMetadata?.name;

  const email = user.emailAddresses.at(0)?.emailAddress;
  const nameFromEmail = email?.split('@')[0];

  return typeof name === 'string' ? name : nameFromEmail ? nameFromEmail : undefined;
};

export const getAvatar = (user: User) => {
  const avatar: unknown = user.imageUrl;

  return typeof avatar === 'string' ? avatar : undefined;
};
