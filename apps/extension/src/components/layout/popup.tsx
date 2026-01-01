import type { ReactElement } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { browser } from 'wxt/browser';

import '~/assets/styles/globals.css';

import { DesignSystemProvider } from '@repo/web-design-system/provider/extension';

import { ErrorBoundary } from '~/components/common/error-boundary';
import { Suspense } from '~/components/common/suspense';
import { Footer } from '~/components/layout/footer';
import { cn } from '~/lib/utils';

type Props = Readonly<{
  loadingFallback?: ReactElement;
  errorFallback?: ReactElement;
  className?: string;
}>;

const PUBLISHABLE_KEY = import.meta.env.WXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const EXTENSION_URL = browser.runtime.getURL('/');

if (!PUBLISHABLE_KEY) {
  throw new Error('Please add the WXT_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.local file');
}

export const PopupLayout = ({ loadingFallback, errorFallback, className }: Props) => {
  const navigate = useNavigate();

  return (
    <ErrorBoundary fallback={errorFallback}>
      <DesignSystemProvider
        afterSignOutUrl={`${EXTENSION_URL}popup.html`}
        publishableKey={PUBLISHABLE_KEY}
        routerPush={(to) => navigate(to)}
        routerReplace={(to) => navigate(to, { replace: true })}
        signInFallbackRedirectUrl={`${EXTENSION_URL}popup.html`}
        signUpFallbackRedirectUrl={`${EXTENSION_URL}popup.html`}
      >
        <Suspense fallback={loadingFallback}>
          <div
            className={cn(
              'flex min-h-screen w-full min-w-92 flex-col items-center justify-center bg-background font-sans text-base text-foreground',
            )}
          >
            <div
              className={cn(
                'flex w-full max-w-7xl grow flex-col items-center justify-between gap-12 p-5',
                className,
              )}
            >
              <div className="h-5" />
              <Outlet />
              <Footer />
            </div>
          </div>
        </Suspense>
      </DesignSystemProvider>
    </ErrorBoundary>
  );
};
