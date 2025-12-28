'use client';

import React from 'react';

import type { LucideIcon } from 'lucide-react';
import { WandSparklesIcon } from 'lucide-react';

import { cn } from '../../lib/utils';
import type { EnhancedButtonProps } from '../enhanced-button';
import { EnhancedButton } from '../enhanced-button';
import { Spinner } from '../spinner';

export type AIActionButtonProps = EnhancedButtonProps & {
  actionText: string;
  loading?: boolean;
  className?: string;
  Icon?: LucideIcon;
};

export function AIActionButtonComponent({
  size = 'sm',
  loading,
  actionText = 'Enhance with AI',
  Icon = WandSparklesIcon,
  effect = 'gradientSlideShow',
  className,
  ...rest
}: AIActionButtonProps) {
  return (
    <EnhancedButton className={className} effect={effect} size={size} {...rest}>
      {loading && <Spinner size="xs" />}
      {!loading && (
        <>
          <Icon className={cn('mr-1 h-4 w-4', { 'mr-0': size === 'icon' })} />
          {size !== 'icon' && actionText}
        </>
      )}
    </EnhancedButton>
  );
}

AIActionButtonComponent.displayName = 'AIActionButton';
export const AIActionButton = React.memo(AIActionButtonComponent);
