export { clerkMiddleware as authMiddleware } from '@clerk/nextjs/server';

import { type NextRequest, NextResponse } from 'next/server';

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isOnboardingRoute = createRouteMatcher(['/onboarding']);
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

/**
 * This middleware provides authentication for ResumeMoto. It will check if
 * the user is signed in, and if they are, it will check if the route is protected.
 * If the user is signed in and the route is protected, it will use the
 * `securityHeadersMiddleware` to add security headers to the request.
 *
 * If the user is not signed in and the route is private, it will redirect the
 * user to the sign-in page.
 *
 * If the user is signed in but hasn't completed onboarding, it will redirect
 * them to the onboarding route.
 *
 * @see https://clerk.com/docs/references/nextjs/add-onboarding-flow
 *
 * @param {() => void} securityHeadersMiddleware
 * @returns {NextMiddleware}
 */
export function authWithOnboardingMiddleware(securityHeadersMiddleware: () => void) {
  return clerkMiddleware(async (auth, req: NextRequest) => {
    const { userId, sessionClaims, redirectToSignIn } = await auth();

    // For users visiting /onboarding, don't try to redirect
    if (userId && isOnboardingRoute(req)) return securityHeadersMiddleware();

    // If the user isn't signed in and the route is private, redirect to sign-in
    if (!userId && !isPublicRoute(req)) return redirectToSignIn({ returnBackUrl: req.url });

    // Catch users who do not have `onboarded: true` in their publicMetadata
    // Redirect them to the /onboarding route to complete onboarding
    if (userId && !sessionClaims?.metadata?.onboarded) {
      const onboardingUrl = new URL('/onboarding', req.url);

      return NextResponse.redirect(onboardingUrl);
    }

    // If the user is logged in and the route is protected, let them view.
    if (userId && !isPublicRoute(req)) return securityHeadersMiddleware();
  });
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
