'use client';

import * as React from 'react';

import type { SlateRenderElementProps } from '@udecode/plate';

import {
  useIndentTodoListElement,
  useIndentTodoListElementState,
} from '@udecode/plate-indent-list/react';
import { useReadOnly } from '@udecode/plate/react';

import { Checkbox } from '@repo/design-system/components/ui/checkbox';
import { cn } from '@repo/design-system/lib/utils';

export function TodoMarker(props: Omit<SlateRenderElementProps, 'children'>) {
  const state = useIndentTodoListElementState({ element: props.element });
  const { checkboxProps } = useIndentTodoListElement(state);
  const readOnly = useReadOnly();

  return (
    <div contentEditable={false}>
      <Checkbox
        className={cn('-left-6 absolute top-1', readOnly && 'pointer-events-none')}
        {...checkboxProps}
      />
    </div>
  );
}

export function TodoLi(props: SlateRenderElementProps) {
  return (
    <li
      className={cn(
        'list-none',
        (props.element.checked as boolean) && 'text-muted-foreground line-through',
      )}
    >
      {props.children}
    </li>
  );
}
