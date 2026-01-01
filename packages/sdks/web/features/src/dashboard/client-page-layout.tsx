'use client';

import type { PropsWithChildren } from 'react';

import { RedirectToSignIn } from '@repo/auth/nextjs';
import { ClerkLoading, SignedIn, SignedOut } from '@repo/auth/nextjs/components';
import { FullScreenLoader } from '@repo/web-design-system/components/shared/full-screen-loader';

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
