'use client';

import * as React from 'react';

import { useMarkToolbarButton, useMarkToolbarButtonState } from '@udecode/plate/react';

import { ToolbarButton } from './toolbar';

export function MarkToolbarButtonComponent({
  clear,
  nodeType,
  ...props
}: React.ComponentProps<typeof ToolbarButton> & {
  nodeType: string;
  clear?: string[] | string;
}) {
  const state = useMarkToolbarButtonState({ clear, nodeType });
  const { props: buttonProps } = useMarkToolbarButton(state);

  return <ToolbarButton {...props} {...buttonProps} />;
}

MarkToolbarButtonComponent.displayName = 'MarkToolbarButton';
export const MarkToolbarButton = React.memo(MarkToolbarButtonComponent);
