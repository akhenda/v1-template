import type { Metadata } from 'next';

import { initTranslations, type SupportedLocale } from '@repo/i18n';
import { createMetadata } from '@repo/seo/metadata';

import { ContactForm } from './components/contact-form';

type ContactProps = { params: Promise<{ locale: SupportedLocale }> };

export const generateMetadata = async ({ params }: ContactProps): Promise<Metadata> => {
  const { locale } = await params;
  const { t } = await initTranslations(locale);

  return createMetadata({
    title: t("Let's Talk About Your Business"),
    description: t(
      'Schedule a consultation with our team to discuss how we can help streamline your operations and drive growth for your business.',
    ),
  });
};

export default ContactForm;
