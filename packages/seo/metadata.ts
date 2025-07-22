import type { Metadata } from 'next';

import merge from 'lodash.merge';

type MetadataGenerator = Omit<Metadata, 'description' | 'title'> & {
  title: string;
  description: string;
  image?: string;
};

const applicationName = 'KaidokuCars';
const url = 'https://kaidokucars.com';
const canonical = 'https://www.kaidokucars.com';
const author: Metadata['authors'] = { name: 'KaidokuCars Team', url };
const publisher = 'KaidokuCars Team';
const twitterHandle = '@kaidoku.cars';
const shortDescription =
  'TODO: Write a short description for KaidokuCars that highlights its features and benefits.';
const twitterDescription =
  'TODO: Write a Twitter description for KaidokuCars that is concise and engaging.';
const keywords =
  'TODO: Write keywords for KaidokuCars that are relevant to its content and purpose.';

export const createMetadata = ({
  title,
  description,
  image,
  ...properties
}: MetadataGenerator): Metadata => {
  const parsedTitle = `${title} | ${applicationName}`;
  const defaultMetadata: Metadata = {
    metadataBase: new URL(url),
    title: parsedTitle,
    description,
    keywords,
    applicationName,
    authors: [author],
    creator: author.name,
    formatDetection: { telephone: false },
    appleWebApp: { capable: true, statusBarStyle: 'default', title: parsedTitle },
    openGraph: {
      type: 'website',
      url,
      title: parsedTitle,
      description: shortDescription,
      siteName: applicationName,
      locale: 'en_US',
    },
    publisher,
    twitter: {
      card: 'summary_large_image',
      creator: twitterHandle,
      site: twitterHandle,
      title: parsedTitle,
      description: twitterDescription,
    },
    alternates: { canonical },
    category: 'Business',
  };

  const metadata: Metadata = merge(defaultMetadata, properties);

  if (image && metadata.openGraph) {
    metadata.openGraph.images = [{ url: image, width: 1200, height: 630, alt: title }];
  }

  return metadata;
};
