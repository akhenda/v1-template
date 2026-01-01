import { SignIn as ClerkSignIn } from '@clerk/clerk-react';

export const SignIn = (props: React.ComponentProps<typeof ClerkSignIn>) => (
  <ClerkSignIn {...props} appearance={{ elements: { header: 'hidden' } }} />
);
