'use client';

import type { PropsWithChildren } from 'react';

import { RedirectToSignIn } from '@repo/auth/client';
import { ClerkLoading, SignedIn, SignedOut } from '@repo/auth/components';
import { FullScreenLoader } from '@repo/design-system/components/full-screen-loader';

export function ClientPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ClerkLoading>
        <FullScreenLoader
          animationStyle="pulse"
          className="h-full"
          elementCount={6}
          fullScreen={false}
          isLoading
          message="Loading"
          speed={0.8}
          subMessage="Please wait..."
        />
      </ClerkLoading>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
