import type { PropsWithChildren } from 'react';

import '../styles/globals.css';

export default function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
