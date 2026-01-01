import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react';

export * from './sign-in';
export * from './sign-up';

const SignedIn = Authenticated;
const SignedOut = Unauthenticated;
const ClerkLoading = AuthLoading;

export { Authenticated, AuthLoading, Unauthenticated, ClerkLoading, SignedIn, SignedOut };
