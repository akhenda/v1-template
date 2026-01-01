import type { ReactElement } from 'react';
import { Outlet, useNavigate } from 'react-router';

import { browser } from 'wxt/browser';

import '~/assets/styles/globals.css';

import { DesignSystemProvider } from '@repo/web-design-system/provider/extension';

import { ErrorBoundary } from '~/components/common/error-boundary';
import { Suspense } from '~/components/common/suspense';
import { Footer } from '~/components/layout/footer';
import { Header } from '~/components/layout/header';
import { cn } from '~/lib/utils';

import config from '@@/app.config';

type Props = Readonly<{
  loadingFallback?: ReactElement;
  errorFallback?: ReactElement;
  className?: string;
}>;

const SYNC_HOST = config.env.WXT_CLERK_SYNC_HOST;
const PUBLISHABLE_KEY = config.env.WXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const EXTENSION_URL = browser.runtime.getURL('/');

if (!PUBLISHABLE_KEY || !SYNC_HOST) {
  throw new Error(
    'Please add the WXT_PUBLIC_CLERK_PUBLISHABLE_KEY & WXT_CLERK_SYNC_HOST to the .env file',
  );
}

export const RootLayout = ({ loadingFallback, errorFallback, className }: Props) => {
  const navigate = useNavigate();

  // 👇 This state changes whenever background pushes an auth update
  // const { token /*, userId*/ /* requestLatestToken */ } = useClerkAuthSubscription();

  // If you want to re-check right before a network call:
  // useEffect(() => { requestLatestToken(); }, []);

  return (
    <ErrorBoundary fallback={errorFallback}>
      <DesignSystemProvider
        afterSignOutUrl={`${EXTENSION_URL}popup.html`}
        publishableKey={PUBLISHABLE_KEY}
        routerPush={(to) => navigate(to)}
        routerReplace={(to) => navigate(to, { replace: true })}
        signInFallbackRedirectUrl={`${EXTENSION_URL}popup.html`}
        signUpFallbackRedirectUrl={`${EXTENSION_URL}popup.html`}
        syncHost={SYNC_HOST}
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
              <Header />
              <Outlet />
              <Footer />
            </div>
          </div>
        </Suspense>
      </DesignSystemProvider>
    </ErrorBoundary>
  );
};
