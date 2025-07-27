'use client';

import type { PropsWithChildren } from 'react';

import { ClerkLoading, SignedIn, SignedOut } from '@repo/auth/components';
import { RedirectToSignIn } from '@repo/auth/nextjs';
import { FullScreenLoader } from '@repo/design-system/components/full-screen-loader';

export function ClientPageLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ClerkLoading>
        <FullScreenLoader
          isLoading
          speed={0.8}
          fullScreen={false}
          elementCount={6}
          animationStyle="pulse"
          message="Loading"
          subMessage="Please wait..."
          className="h-full"
        />
      </ClerkLoading>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
