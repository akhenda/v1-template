import { type NextMiddleware, type NextRequest, NextResponse } from 'next/server';

import { authMiddleware } from '@repo/auth/middleware';
import { i18nMiddleware } from '@repo/i18n/middleware';
import { parseError } from '@repo/observability/error';
import { secure } from '@repo/security';
import {
  noseconeMiddleware,
  noseconeOptions,
  noseconeOptionsWithToolbar,
} from '@repo/security/middleware';

import { env } from '@/env';

/**
 * ISSUE
 *
 * @see https://github.com/haydenbleasel/next-forge/issues/486
 */
export const config = {
  // matcher tells Next.js which routes to run the middleware on. This runs the
  // middleware on all routes except for static assets and Posthog ingest
  // matcher: ['/((?!_next/static|_next/image|ingest|favicon.ico).*)'],
  matcher: [
    '/((?!_next/static|_next/image|ingest|favicon.ico|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};

const securityHeaders = env.FLAGS_SECRET
  ? noseconeMiddleware(noseconeOptionsWithToolbar)
  : noseconeMiddleware(noseconeOptions);

const middleware = authMiddleware(async (_auth, request) => {
  const i18nResponse = i18nMiddleware(request as unknown as NextRequest);

  if (i18nResponse) return i18nResponse;
  if (!env.ARCJET_KEY) return securityHeaders();

  try {
    await secure(
      [
        // See https://docs.arcjet.com/bot-protection/identifying-bots
        'CATEGORY:SEARCH_ENGINE', // Allow search engines
        'CATEGORY:PREVIEW', // Allow preview links to show OG images
        'CATEGORY:MONITOR', // Allow uptime monitoring services
      ],
      request,
    );

    return securityHeaders();
  } catch (error) {
    const message = parseError(error);

    return NextResponse.json({ error: message }, { status: 403 });
  }
}) as unknown as NextMiddleware;

export default middleware;
