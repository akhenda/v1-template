import type { ComponentProps } from 'react';

import { SignUp as ClerkSignUp } from '@clerk/nextjs';

export const SignUp = (props: ComponentProps<typeof ClerkSignUp>) => (
  <ClerkSignUp {...props} appearance={{ elements: { header: 'hidden' } }} />
);
