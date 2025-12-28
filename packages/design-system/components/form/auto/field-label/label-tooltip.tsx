import React from 'react';

import { HelpCircle } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';

type Props = { tooltip?: string };

export function LabelTooltipComponent({ tooltip }: Props) {
  if (!tooltip) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="ml-1.5 h-3.5 w-3.5 cursor-help text-gray-400" />
      </TooltipTrigger>
      <TooltipContent className="max-w-xs" side="top">
        <p className="text-center">{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

const areEqual = (prevProps: Props, nextProps: Props) => prevProps.tooltip === nextProps.tooltip;

export const LabelTooltip = React.memo(LabelTooltipComponent, areEqual);
