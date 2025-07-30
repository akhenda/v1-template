import type { ReactElement } from 'react';
import { Suspense as ReactSuspense } from 'react';

import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex w-full min-w-64 items-center justify-center py-16">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export const Suspense = ({
  children,
  fallback = <Loading />,
}: {
  children: ReactElement;
  fallback?: ReactElement;
}) => {
  return <ReactSuspense fallback={fallback}>{children}</ReactSuspense>;
};
