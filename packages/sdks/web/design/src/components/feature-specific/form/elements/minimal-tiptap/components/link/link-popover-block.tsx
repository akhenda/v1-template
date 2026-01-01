import * as React from 'react';

import { CopyIcon, ExternalLinkIcon, LinkBreak2Icon } from '@radix-ui/react-icons';

import { Separator } from '../../../../../../ui/separator';
import { ToolbarButton } from '../toolbar-button';

type LinkPopoverBlockProps = {
  url: string;
  onClear: () => void;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const LinkPopoverBlock: React.FC<LinkPopoverBlockProps> = ({ url, onClear, onEdit }) => {
  const [copyTitle, setCopyTitle] = React.useState<string>('Copy');

  const handleCopy = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopyTitle('Copied!');
          setTimeout(() => setCopyTitle('Copy'), 1000);
        })
        .catch(console.error);
    },
    [url],
  );

  const handleOpenLink = React.useCallback(() => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [url]);

  return (
    <div className="flex h-10 overflow-hidden rounded bg-background p-2 shadow-lg">
      <div className="inline-flex items-center gap-1">
        <ToolbarButton className="w-auto px-2" onClick={onEdit} tooltip="Edit link">
          Edit link
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton onClick={handleOpenLink} tooltip="Open link in a new tab">
          <ExternalLinkIcon className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton onClick={onClear} tooltip="Clear link">
          <LinkBreak2Icon className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton
          onClick={handleCopy}
          tooltip={copyTitle}
          tooltipOptions={{
            onPointerDownOutside: (e) => {
              if (e.target === e.currentTarget) e.preventDefault();
            },
          }}
        >
          <CopyIcon className="size-4" />
        </ToolbarButton>
      </div>
    </div>
  );
};
