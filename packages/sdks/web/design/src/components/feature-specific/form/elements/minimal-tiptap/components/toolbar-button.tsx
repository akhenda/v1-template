import * as React from 'react';

import type { TooltipContentProps } from '@radix-ui/react-tooltip';

import { cn } from '../../../../../../lib/utils';
import { Toggle } from '../../../../../ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../../../ui/tooltip';

interface ToolbarButtonProps extends React.ComponentPropsWithoutRef<typeof Toggle> {
  ref?: React.Ref<HTMLButtonElement>;
  isActive?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipContentProps;
}

export const ToolbarButton = ({
  ref,
  isActive,
  children,
  tooltip,
  className,
  tooltipOptions,
  ...props
}: ToolbarButtonProps) => {
  const toggleButton = (
    <Toggle
      className={cn('size-8 p-0', { 'bg-accent': isActive }, className)}
      ref={ref}
      size="sm"
      {...props}
    >
      {children}
    </Toggle>
  );

  if (!tooltip) return toggleButton;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{toggleButton}</TooltipTrigger>
      <TooltipContent {...tooltipOptions}>
        <div className="flex flex-col items-center text-center">{tooltip}</div>
      </TooltipContent>
    </Tooltip>
  );
};

ToolbarButton.displayName = 'ToolbarButton';

export default ToolbarButton;
