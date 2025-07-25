'use client';

import * as React from 'react';

import type { TMentionElement } from '@udecode/plate-mention';
import type { PlateElementProps } from '@udecode/plate/react';

import { IS_APPLE } from '@udecode/plate';
import { PlateElement, useFocused, useReadOnly, useSelected } from '@udecode/plate/react';

import { useMounted } from '@repo/design-system/hooks/use-mounted';
import { cn } from '@repo/design-system/lib/utils';

export function MentionElement(props: PlateElementProps<TMentionElement> & { prefix?: string }) {
  const element = props.element;
  const selected = useSelected();
  const focused = useFocused();
  const mounted = useMounted();
  const readOnly = useReadOnly();

  return (
    <PlateElement
      {...props}
      className={cn(
        'inline-block rounded-md bg-muted px-1.5 py-0.5 align-baseline font-medium text-sm',
        !readOnly && 'cursor-pointer',
        selected && focused && 'ring-2 ring-ring',
        element.children[0].bold === true && 'font-bold',
        element.children[0].italic === true && 'italic',
        element.children[0].underline === true && 'underline',
      )}
      attributes={{
        ...props.attributes,
        contentEditable: false,
        'data-slate-value': element.value,
        draggable: true,
      }}
    >
      {mounted && IS_APPLE ? (
        // Mac OS IME https://github.com/ianstormtaylor/slate/issues/3490
        <>
          {props.children}
          {props.prefix}
          {element.value}
        </>
      ) : (
        // Others like Android https://github.com/ianstormtaylor/slate/pull/5360
        <>
          {props.prefix}
          {element.value}
          {props.children}
        </>
      )}
    </PlateElement>
  );
}
