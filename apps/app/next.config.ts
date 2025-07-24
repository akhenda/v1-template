import type { NextConfig } from 'next';

import { withToolbar } from '@repo/feature-flags/lib/toolbar';
import { config, withAnalyzer, withMillionLint } from '@repo/next-config';
import { withLogging, withSentry } from '@repo/observability/next-config';

import { env } from '@/env';

let nextConfig: NextConfig = withToolbar(withLogging(config));

if (env.VERCEL) nextConfig = withSentry(nextConfig);
if (env.ANALYZE === 'true') nextConfig = withAnalyzer(nextConfig);
if (env.MILLION_LINT) nextConfig = withMillionLint(nextConfig);

export default nextConfig;
