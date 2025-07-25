'use client';

import * as React from 'react';

import type { PlateElementProps } from '@udecode/plate/react';

import { useToggleButton, useToggleButtonState } from '@udecode/plate-toggle/react';
import { PlateElement } from '@udecode/plate/react';
import { ChevronRight } from 'lucide-react';

import { Button } from '@repo/design-system/components/ui/button';

export function ToggleElement(props: PlateElementProps) {
  const element = props.element;
  const state = useToggleButtonState(element.id as string);
  const { buttonProps, open } = useToggleButton(state);

  return (
    <PlateElement {...props} className="pl-6">
      <Button
        size="icon"
        variant="ghost"
        className="-left-0.5 absolute top-0 size-6 cursor-pointer select-none items-center justify-center rounded-md p-px text-muted-foreground transition-colors hover:bg-accent [&_svg]:size-4"
        contentEditable={false}
        {...buttonProps}
      >
        <ChevronRight
          className={
            open
              ? 'rotate-90 transition-transform duration-75'
              : 'rotate-0 transition-transform duration-75'
          }
        />
      </Button>
      {props.children}
    </PlateElement>
  );
}
