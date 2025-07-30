import type { Metadata } from 'next';

import { SignIn } from '@repo/auth/nextjs';
import { Loader } from '@repo/design-system/components/loader';
import { createMetadata } from '@repo/seo/metadata';

const title = 'Sign In';
const description = 'Sign in to your Kaidoku Cars account to manage your garage.';
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
