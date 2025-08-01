import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import {
  type RehypeCodeOptions,
  rehypeCode,
  remarkGfm,
  remarkHeading,
  remarkImage,
} from 'fumadocs-core/mdx-plugins';
import readingTime from 'reading-time';

const rehypeCodeOptions: RehypeCodeOptions = {
  themes: { light: 'catppuccin-mocha', dark: 'catppuccin-mocha' },
};

const posts = defineCollection({
  name: 'posts',
  directory: 'content/blog',
  include: '**/*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    image: z
      .object({ alt: z.string(), url: z.string(), width: z.number(), height: z.number() })
      .optional(),
    authors: z.array(
      z.object({
        name: z.string(),
        image: z.string(),
        url: z.string().optional(),
        email: z.string().optional(),
      }),
    ),
    tags: z.array(z.string()),
    isPublished: z.boolean(),
  }),
  transform: async ({ title, ...page }, context) => {
    const body = await context.cache(page.content, async () =>
      compileMDX(context, page, {
        remarkPlugins: [remarkGfm, remarkHeading, [remarkImage, { useImport: false }]],
        rehypePlugins: [[rehypeCode, rehypeCodeOptions]],
      }),
    );

    /**
     * NOTE: Also check out Expressive Code for the Code Block
     *
     * @see https://expressive-code.com/installation/#nextjs
     */

    return {
      ...page,
      _title: title,
      _slug: page._meta.path,
      body,
      readingTime: readingTime(page.content).text,
    };
  },
});

export default defineConfig({ collections: [posts] });
