'use client';

import { Loader2 } from 'lucide-react';
import React from 'react';

import { cn } from '../lib/utils';

export function Loader({
  className,
  type = 'default',
}: React.HTMLAttributes<HTMLDivElement> & { type?: 'default' | 'ellipsis' }) {
  if (type === 'ellipsis') {
    return (
      <div className={cn('flex text-6xl', className)}>
        <span className="animate-ellipsis text-primary">.</span>
        <span className="animate-ellipsis text-primary delay-500">.</span>
        <span className="animate-ellipsis text-primary delay-1000">.</span>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
}
