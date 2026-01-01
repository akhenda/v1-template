import { SignUp as ClerkSignUp } from '@clerk/nextjs';

export const SignUp = (props: React.ComponentProps<typeof ClerkSignUp>) => (
  <ClerkSignUp {...props} appearance={{ elements: { header: 'hidden' } }} />
);
