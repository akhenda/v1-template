import { SignUp as ClerkSignUp } from '@clerk/chrome-extension';

export const SignUp = (props: React.ComponentProps<typeof ClerkSignUp>) => (
  <ClerkSignUp {...props} appearance={{ elements: { header: 'hidden' } }} />
);
