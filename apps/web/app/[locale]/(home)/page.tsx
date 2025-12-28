import type { Metadata } from 'next';

import { showBetaFeature } from '@repo/feature-flags';
import type { SupportedLocale } from '@repo/i18n';
import { initTranslations } from '@repo/i18n';
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
      "In today's fast-paced world, your business deserves better than outdated trading systems. Our innovative platform streamlines operations, reduces complexity, and helps small businesses thrive in the modern economy."
    ),
  });
};

const Home = async () => {
  const betaFeature = await showBetaFeature();

  return (
    <>
      {betaFeature && (
        <div className="w-full bg-black py-2 text-center text-white">
          Beta feature now available
        </div>
      )}
      <Hero />
      <Cases />
      <Features />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
};

export default Home;
