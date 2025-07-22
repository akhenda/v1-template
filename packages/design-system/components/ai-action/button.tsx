'use client';

import { type LucideIcon, WandSparklesIcon } from 'lucide-react';
import React from 'react';

import { cn } from '../../lib/utils';
import { EnhancedButton, type EnhancedButtonProps } from '../enhanced-button';
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
    <EnhancedButton size={size} effect={effect} className={className} {...rest}>
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
