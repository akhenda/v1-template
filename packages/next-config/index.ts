import path from 'node:path';

import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

import MillionLint from '@million/lint';

const otelRegex = /@opentelemetry\/instrumentation/;

/**
 * Fix Next.js file tracing for `turbo run dev` in monorepos.
 *
 * When running `turbo run dev`, the `outputFileTracingRoot` option must be
 * set to the root of the monorepo. Otherwise, Next.js will not be able to
 * resolve the source of server-side rendered files.
 *
 * This is a temporary workaround until Next.js supports Turbo Pack out of
 * the box.
 *
 * @see https://github.com/vercel/next.js/discussions/55987#discussioncomment-12316599
 *
 * @param config Next.js configuration
 * @returns Next.js configuration with `outputFileTracingRoot` set
 */
export const withTurboPackFix = (config: NextConfig): NextConfig => {
  if (process.env.NODE_ENV === 'development') {
    config.outputFileTracingRoot = path.join(__dirname, '../../');

    return config;
  }

  return config;
};

export const config: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'img.clerk.com' }],
  },

  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      { source: '/ingest/:path*', destination: 'https://eu.i.posthog.com/:path*' },
      { source: '/ingest/decide', destination: 'https://eu.i.posthog.com/decide' },
    ];
  },

  webpack(config) {
    config.ignoreWarnings = [{ module: otelRegex }];

    return config;
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,

  // https://nextjs.org/docs/app/api-reference/config/next-config-js/devIndicators
  // devIndicators: false,

  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs', '.json'],
  },
};

export const withAnalyzer = (sourceConfig: NextConfig): NextConfig =>
  withBundleAnalyzer()(sourceConfig);

export const withMillionLint = (sourceConfig: NextConfig): NextConfig =>
  MillionLint.next({
    rsc: true,
    enabled: true,
    dev: 'debug',
    turbo: false,
    react: '19',
    telemetry: false,
  })(sourceConfig);
