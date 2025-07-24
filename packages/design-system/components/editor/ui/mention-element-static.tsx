import * as React from 'react';

import type { SlateElementProps } from '@udecode/plate';
import type { TMentionElement } from '@udecode/plate-mention';

import { IS_APPLE, SlateElement } from '@udecode/plate';

import { cn } from '@repo/design-system/lib/utils';

export function MentionElementStatic(
  props: SlateElementProps<TMentionElement> & { prefix?: string },
) {
  const { prefix } = props;
  const element = props.element;

  return (
    <SlateElement
      className={cn(
        'inline-block rounded-md bg-muted px-1.5 py-0.5 align-baseline font-medium text-sm',
        element.children[0].bold === true && 'font-bold',
        element.children[0].italic === true && 'italic',
        element.children[0].underline === true && 'underline',
      )}
      data-slate-value={element.value}
      {...props}
    >
      {IS_APPLE ? (
        // Mac OS IME https://github.com/ianstormtaylor/slate/issues/3490
        <>
          {props.children}
          {prefix}
          {element.value}
        </>
      ) : (
        // Others like Android https://github.com/ianstormtaylor/slate/pull/5360
        <>
          {prefix}
          {element.value}
          {props.children}
        </>
      )}
    </SlateElement>
  );
}
