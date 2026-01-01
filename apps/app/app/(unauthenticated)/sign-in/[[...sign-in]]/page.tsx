import type { Metadata } from 'next';

import { SignIn } from '@repo/auth/nextjs';
import { Loader } from '@repo/design-system/components/loader';
import { createMetadata } from '@repo/seo/metadata';

const title = 'Welcome back';
const description = 'Enter your details to sign in.';
export const metadata: Metadata = createMetadata({ title, description });

export default function SignInPage() {
  return (
    <SignIn
      fallback={
        <div className="flex h-80 w-80 items-center justify-center self-center">
          <Loader className="h-8 w-8" />
        </div>
      }
    />
  );
}
