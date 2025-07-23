import './styles.css';

import type { ReactNode } from 'react';

import type { Metadata } from 'next';

import NextTopLoader from 'nextjs-toploader';

import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { cn } from '@repo/design-system/lib/utils';
import { showBetaFeature } from '@repo/feature-flags';
import { Toolbar } from '@repo/feature-flags/components/toolbar';
import { I18nProvider, i18nConfig, initTranslations, type SupportedLocale } from '@repo/i18n';
import { createMetadata } from '@repo/seo/metadata';

import { Footer } from './components/footer';
import { Header } from './components/header';

type Props = {
  readonly children: ReactNode;
  readonly params: Promise<{ locale: SupportedLocale }>;
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params;
  const { t } = await initTranslations(locale);

  return createMetadata({
    title: t('Ignite Your Job Search'),
    description: t(
      'ResumeMoto is an AI-powered resume and CV builder designed to help job seekers create tailored, ATS-friendly resumes, streamline job applications, and track progress. Transform your job search today!',
    ),
    keywords: t(
      'resume builder, CV generator, ATS resume, AI resume tool, job search, career, resume optimization, ResumeMoto',
    ),
    authors: [{ name: t('ResumeMoto Team') }],
  });
};

export default async function RootLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  const { resources } = await initTranslations(locale);
  const _betaFeature = await showBetaFeature();

  return (
    <html lang={locale} className={cn(fonts, 'scroll-smooth')} suppressHydrationWarning>
      <body>
        <I18nProvider locale={locale} resources={resources}>
          <DesignSystemProvider>
            <NextTopLoader color="#00bd7d" showSpinner={false} />
            <Header />
            {children}
            <Footer />
          </DesignSystemProvider>
          <Toolbar />
        </I18nProvider>
      </body>
    </html>
  );
}
