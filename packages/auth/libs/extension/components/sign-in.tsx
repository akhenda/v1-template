import { SignIn as ClerkSignIn } from '@clerk/chrome-extension';

export const SignIn = (props: React.ComponentProps<typeof ClerkSignIn>) => (
  <ClerkSignIn {...props} appearance={{ elements: { header: 'hidden' } }} />
);
