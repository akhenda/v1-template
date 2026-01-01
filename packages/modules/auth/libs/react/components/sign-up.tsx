import { SignUp as ClerkSignUp } from '@clerk/clerk-react';

export const SignUp = (props: React.ComponentProps<typeof ClerkSignUp>) => (
  <ClerkSignUp {...props} appearance={{ elements: { header: 'hidden' } }} />
);
