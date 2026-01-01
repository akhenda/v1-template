import type { Metadata } from 'next';

import { SignUp } from '@repo/auth/nextjs';
import { Loader } from '@repo/design-system/components/loader';
import { createMetadata } from '@repo/seo/metadata';

const title = 'Create an account';
const description = 'Enter your details to get started.';
export const metadata: Metadata = createMetadata({ title, description });

export default function SignUpPage() {
  return (
    <SignUp
      fallback={
        <div className="flex h-80 w-80 items-center justify-center self-center">
          <Loader className="h-8 w-8" />
        </div>
      }
      forceRedirectUrl="/onboarding"
    />
  );
}
