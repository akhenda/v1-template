import { defineRouting } from 'next-intl/routing';

import config from './config';

export const routing = defineRouting({
  locales: config.locales,
  defaultLocale: config.defaultLocale,
  localePrefix: 'as-needed',
});
