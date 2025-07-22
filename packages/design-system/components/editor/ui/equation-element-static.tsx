import * as React from 'react';

import { SlateElement, type SlateElementProps } from '@udecode/plate';
import { type TEquationElement, getEquationHtml } from '@udecode/plate-math';
import { RadicalIcon } from 'lucide-react';

import { cn } from '@repo/design-system/lib/utils';

export function EquationElementStatic(props: SlateElementProps<TEquationElement>) {
  const { element } = props;

  const html = getEquationHtml({
    element,
    options: {
      displayMode: true,
      errorColor: '#cc0000',
      fleqn: false,
      leqno: false,
      macros: { '\\f': '#1f(#2)' },
      output: 'htmlAndMathml',
      strict: 'warn',
      throwOnError: false,
      trust: false,
    },
  });

  return (
    <SlateElement className="my-1" {...props}>
      <div
        className={cn(
          'group flex select-none items-center justify-center rounded-sm hover:bg-primary/10 data-[selected=true]:bg-primary/10',
          element.texExpression.length === 0 ? 'bg-muted p-3 pr-9' : 'px-2 py-1',
        )}
      >
        {element.texExpression.length > 0 ? (
          <span
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <div className="flex h-7 w-full items-center gap-2 whitespace-nowrap text-muted-foreground text-sm">
            <RadicalIcon className="size-6 text-muted-foreground/80" />
            <div>Add a Tex equation</div>
          </div>
        )}
      </div>
      {props.children}
    </SlateElement>
  );
}
