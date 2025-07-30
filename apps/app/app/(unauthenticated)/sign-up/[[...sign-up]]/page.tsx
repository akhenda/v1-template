import type { Metadata } from 'next';

import { SignUp } from '@repo/auth/nextjs';
import { Loader } from '@repo/design-system/components/loader';
import { createMetadata } from '@repo/seo/metadata';

const title = 'Sign Up';
const description = 'Create a Kaidoku Cars account to start decoding your cars.';
export const metadata: Metadata = createMetadata({ title, description });

export default function SignUpPage() {
  return (
    <SignUp
      forceRedirectUrl="/onboarding"
      fallback={
        <div className="flex h-80 w-80 items-center justify-center self-center">
          <Loader className="h-8 w-8" />
        </div>
      }
    />
  );
}
