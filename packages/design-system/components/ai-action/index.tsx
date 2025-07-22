'use client';

import React, { useCallback, useState } from 'react';
import { AIActionDialog, type AIActionDialogProps } from './dialog';

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
      size={size}
      className={className}
      loading={loading}
      credits={credits}
      cost={cost}
      title={title}
      actionText={actionText}
      buttonText={buttonText}
      onAction={handleAction}
      {...rest}
    />
  );
}

AIActionComponent.displayName = 'AIAction';
export const AIAction = React.memo(AIActionComponent);
