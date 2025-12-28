import * as React from 'react';

import { cn } from '../../../../../lib/utils';
import { getShortcutKey } from '../utils';

export interface ShortcutKeyProps extends React.HTMLAttributes<HTMLSpanElement> {
  keys: string[];
  ref?: React.Ref<HTMLSpanElement>;
}

export const ShortcutKey = ({ ref, className, keys, ...props }: ShortcutKeyProps) => {
  const modifiedKeys = keys.map((key) => getShortcutKey(key));
  // const ariaLabel = modifiedKeys.map((shortcut) => shortcut.readable).join(' + ');

  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} {...props} ref={ref}>
      {modifiedKeys.map((shortcut) => (
        <kbd
          className={cn(
            'inline-block min-w-2.5 text-center align-baseline font-medium font-sans text-[rgb(156,157,160)] text-xs capitalize',

            className
          )}
          key={shortcut.symbol}
          {...props}
          ref={ref}
        >
          {shortcut.symbol}
        </kbd>
      ))}
    </span>
  );
};

ShortcutKey.displayName = 'ShortcutKey';
