import type { Metadata } from 'next';

import { showBetaFeature } from '@repo/feature-flags';
import { initTranslations, type SupportedLocale } from '@repo/i18n';
import { getDictionary } from '@repo/internationalization';
import { createMetadata } from '@repo/seo/metadata';

import { Cases } from './components/cases';
import { CTA } from './components/cta';
import { FAQ } from './components/faq';
import { Features } from './components/features';
import { Hero } from './components/hero';
import { Stats } from './components/stats';
import { Testimonials } from './components/testimonials';

type HomeProps = { params: Promise<{ locale: SupportedLocale }> };

export const generateMetadata = async ({ params }: HomeProps): Promise<Metadata> => {
  const { locale } = await params;
  const { t } = await initTranslations(locale);

  return createMetadata({
    title: t('Transform Your Business Operations Today'),
    description: t(
      "In today's fast-paced world, your business deserves better than outdated trading systems. Our innovative platform streamlines operations, reduces complexity, and helps small businesses thrive in the modern economy.",
    ),
  });
};

const Home = async ({ params }: HomeProps) => {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const betaFeature = await showBetaFeature();

  return (
    <>
      {betaFeature && (
        <div className="w-full bg-black py-2 text-center text-white">
          Beta feature now available
        </div>
      )}
      <Hero dictionary={dictionary} />
      <Cases dictionary={dictionary} />
      <Features dictionary={dictionary} />
      <Stats dictionary={dictionary} />
      <Testimonials dictionary={dictionary} />
      <FAQ dictionary={dictionary} />
      <CTA dictionary={dictionary} />
    </>
  );
};

export default Home;
