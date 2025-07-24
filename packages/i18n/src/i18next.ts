import { createInstance, type i18n, type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';

import i18nConfig, { type SupportedLocale } from './config';
import { resources as defaultResources } from './resources';

export default async function initTranslations(
  locale: SupportedLocale,
  namespaces: string[] = ['app'],
  i18next: i18n = createInstance(),
  resources: Resource = defaultResources,
) {
  i18next.use(initReactI18next);

  await i18next.init({
    debug: false,
    lng: locale,
    resources,
    ns: namespaces,
    defaultNS: namespaces[0],
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    fallbackNS: namespaces[0],
    preload: resources ? [] : i18nConfig.locales,

    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    compatibilityJSON: 'v4',
  });

  return { resources, t: i18next.t, i18n: i18next };
}
