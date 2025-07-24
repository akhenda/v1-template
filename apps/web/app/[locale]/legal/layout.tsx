import type { PropsWithChildren } from 'react';

import { Toolbar } from '@repo/cms/components/toolbar';

type LegalLayoutProps = PropsWithChildren;

const LegalLayout = ({ children }: LegalLayoutProps) => (
  <>
    {children}
    <Toolbar />
  </>
);

export default LegalLayout;
