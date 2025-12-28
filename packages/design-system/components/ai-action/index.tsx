'use client';

import React, { useCallback, useState } from 'react';

import type { AIActionDialogProps } from './dialog';
import { AIActionDialog } from './dialog';

export function AIActionComponent({
  size,
  className,
  credits = 0,
  cost = 1,
  title = 'Enhance this section using AI ✨',
  actionText = 'Enhance with AI',
  buttonText = 'Enhance with AI',
  onAction = () => console.info('Enhancing with AI...'),
  ...rest
}: AIActionDialogProps) {
  const [loading, _setLoading] = useState(false);

  const handleAction = useCallback(onAction, []);

  return (
    <AIActionDialog
      actionText={actionText}
      buttonText={buttonText}
      className={className}
      cost={cost}
      credits={credits}
      loading={loading}
      onAction={handleAction}
      size={size}
      title={title}
      {...rest}
    />
  );
}

AIActionComponent.displayName = 'AIAction';
export const AIAction = React.memo(AIActionComponent);
