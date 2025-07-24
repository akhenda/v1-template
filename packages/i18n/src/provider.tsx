'use client';

import type { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';

import { createInstance, type Resource } from 'i18next';

import type { SupportedLocale } from './config';
import initTranslations from './i18next';

type Props = PropsWithChildren<{
  locale: SupportedLocale;
  namespaces?: string[];
  resources: Resource;
}>;

export function I18nProvider({ children, locale, namespaces, resources }: Props) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
