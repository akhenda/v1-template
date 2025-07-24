'use client';

import { usePathname } from 'next/navigation';

import type { Config } from '../types';

const TRAILING_SLASH_REGEX = /\/$/;

const getCookie = (name: string, documentCookie: string) => {
  const cookies = documentCookie;
  const cookieArray = cookies.split('; ');

  for (const cookie of cookieArray) {
    // Trim whitespace and handle cookies without '='
    const [key, value = ''] = cookie.trim().split('=');
    const trimmedKey = key.trim(); // Trim key specifically

    if (trimmedKey === name) return value.trim(); // Trim value before returning
  }

  return null;
};

const useCurrentLocale = (i18nConfig: Config, documentCookie?: string): string | undefined => {
  let currentCookie = documentCookie;
  const { basePath = '', locales } = i18nConfig;

  const currentPathname = usePathname();

  if (!currentCookie && typeof window !== 'undefined') currentCookie = document.cookie;

  if (currentCookie) {
    const cookieLocale = getCookie(i18nConfig.localeCookie || 'NEXT_LOCALE', currentCookie);

    if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;
  }

  if (i18nConfig.noPrefix) return i18nConfig.defaultLocale;

  const locale = locales.find((locale) => {
    // remove trailing slash if present
    let base = basePath.replace(TRAILING_SLASH_REGEX, '');

    // server does not include basePath in usePathname
    // https://github.com/vercel/next.js/issues/46562
    if (typeof window === 'undefined') base = '';

    return (
      currentPathname === `${base}/${locale}` || currentPathname.startsWith(`${base}/${locale}/`)
    );
  });

  if (locale) return locale;
  if (i18nConfig.prefixDefault) return undefined;

  return i18nConfig.defaultLocale;
};

export default useCurrentLocale;
