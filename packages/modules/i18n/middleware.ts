import type { NextRequest } from 'next/server';

import i18nConfig from './src/config';
import { i18nRouter } from './src/router';

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|static|trpc|_next|_vercel|.*\\..*).*)',
};

export function i18nMiddleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}
