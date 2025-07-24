/**
 * A list of all locales that are supported
 *
 * NOTE: Keep this in sync with `languine.json`
 */
export const supportedLocales = ['en', 'es', 'de', 'zh', 'fr', 'pt', 'sw'] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

/**
 * Used when no locale matches
 */
export const defaultLocale: SupportedLocale = 'en';

/**
 * Configuration for the `next-intl` routing function
 */
const config = { locales: supportedLocales, defaultLocale };

export default config;
