import type { PropsWithChildren } from 'react';

import { Toolbar } from '@repo/cms/components/toolbar';

const LegalLayout = ({ children }: PropsWithChildren) => (
  <>
    {children}
    <Toolbar />
  </>
);

export default LegalLayout;
