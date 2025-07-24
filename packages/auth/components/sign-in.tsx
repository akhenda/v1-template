import type { ComponentProps } from 'react';

import { SignIn as ClerkSignIn } from '@clerk/nextjs';

export const SignIn = (props: ComponentProps<typeof ClerkSignIn>) => (
  <ClerkSignIn {...props} appearance={{ elements: { header: 'hidden' } }} />
);
