import type { PropsWithChildren } from 'react';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  return <ClerkProvider appearance={{ baseTheme: dark }}>{children}</ClerkProvider>;
};
