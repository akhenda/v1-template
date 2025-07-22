'use client';

import React from 'react';

import { cn } from '@repo/design-system/lib/utils';

import { Toolbar } from './toolbar';

export function FixedToolbarRHF(props: React.ComponentProps<typeof Toolbar>) {
  return (
    <Toolbar
      {...props}
      className={cn(
        'scrollbar-hide sticky top-0 left-0 z-50 w-full justify-between overflow-x-auto rounded-t-md border-b border-b-border bg-background/95 p-1 backdrop-blur-sm supports-backdrop-blur:bg-background/60',
        props.className,
      )}
    />
  );
}
