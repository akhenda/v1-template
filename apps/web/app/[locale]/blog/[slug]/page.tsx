import Balancer from 'react-wrap-balancer';

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLeftIcon } from '@radix-ui/react-icons';

import { blog } from '@repo/cms';
import { Body } from '@repo/cms/components/body';
import { Image } from '@repo/cms/components/image';
import { TableOfContents } from '@repo/cms/components/toc';
import { initTranslations, type SupportedLocale } from '@repo/i18n';
import { JsonLd } from '@repo/seo/json-ld';
import { createMetadata } from '@repo/seo/metadata';

import { Sidebar } from '@/components/sidebar';
import { env } from '@/env';

const protocol = env.VERCEL_PROJECT_PRODUCTION_URL?.startsWith('https') ? 'https' : 'http';
const url = new URL(`${protocol}://${env.VERCEL_PROJECT_PRODUCTION_URL}`);

type Props = { readonly params: Promise<{ locale: SupportedLocale; slug: string }> };

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params;
  const post = await blog.getPost(slug);

  if (!post) return {};

  return createMetadata({
    title: post._title,
    description: post.description ?? '',
    image: post.image?.url,
  });
};

export const generateStaticParams = async (): Promise<{ slug: string }[]> => {
  const posts = await blog.getPosts();

  return posts.map(({ _slug }) => ({ slug: _slug }));
};

export default async function BlogPost({ params }: Props) {
  const { locale, slug } = await params;
  const { t } = await initTranslations(locale);

  const page = await blog.getPost(slug);

  if (!page) notFound();

  return (
    <>
      <JsonLd
        code={{
          '@type': 'BlogPosting',
          '@context': 'https://schema.org',
          datePublished: page.date,
          description: page.description,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': new URL(`/blog/${page._slug}`, url).toString(),
          },
          headline: page._title,
          image: page.image?.url,
          dateModified: page.date,
          author: page.authors.at(0)?.name,
          isAccessibleForFree: true,
        }}
      />
      <div className="container mx-auto px-10 py-16">
        <Link
          className="mt-10 inline-flex items-center gap-1 text-muted-foreground text-sm focus:underline focus:outline-none"
          href="/blog"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          {t('Back to all articles')}
        </Link>
        <div className="mt-8 flex flex-col items-start gap-8 sm:flex-row">
          <div className="sm:flex-1">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h1 className="scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl">
                <Balancer>{page._title}</Balancer>
              </h1>
              {page.description && (
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  <Balancer>{page.description}</Balancer>
                </p>
              )}
              {page.image ? (
                <Image
                  src={page.image.url}
                  width={page.image.width}
                  height={page.image.height}
                  alt={page.image.alt ?? ''}
                  className="my-16 h-full w-full rounded-xl"
                  priority
                />
              ) : undefined}
              <div className="prose mx-auto max-w-none">
                <Body content={page.body} />
              </div>
            </div>
          </div>
          <div className="sticky top-24 hidden shrink-0 md:block">
            <Sidebar
              toc={<TableOfContents data={page.content} />}
              readingTime={page.readingTime}
              date={new Date(page.date)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
