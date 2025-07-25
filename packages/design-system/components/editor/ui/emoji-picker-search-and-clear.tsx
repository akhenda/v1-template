'use client';

import type { UseEmojiPickerType } from '@udecode/plate-emoji/react';

import { Button } from '@repo/design-system/components/ui/button';
import { cn } from '@repo/design-system/lib/utils';

import { emojiSearchIcons } from './emoji-icons';

export type EmojiPickerSearchAndClearProps = Pick<
  UseEmojiPickerType,
  'clearSearch' | 'i18n' | 'searchValue'
>;

export function EmojiPickerSearchAndClear({
  clearSearch,
  i18n,
  searchValue,
}: EmojiPickerSearchAndClearProps) {
  return (
    <div className="flex items-center text-foreground">
      <div
        className={cn(
          '-translate-y-1/2 absolute top-1/2 left-2.5 z-10 flex size-5 items-center justify-center text-foreground',
        )}
      >
        {emojiSearchIcons.loupe}
      </div>
      {searchValue && (
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            '-translate-y-1/2 absolute top-1/2 right-0.5 flex size-8 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-popover-foreground hover:bg-transparent',
          )}
          onClick={clearSearch}
          title={i18n.clear}
          aria-label="Clear"
          type="button"
        >
          {emojiSearchIcons.delete}
        </Button>
      )}
    </div>
  );
}
