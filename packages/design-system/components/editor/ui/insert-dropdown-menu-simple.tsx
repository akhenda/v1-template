'use client';

import * as React from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { INDENT_LIST_KEYS, ListStyleType } from '@udecode/plate-indent-list';
import { LinkPlugin } from '@udecode/plate-link/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';
import { ParagraphPlugin, type PlateEditor, useEditorRef } from '@udecode/plate/react';
import {
  ChevronRightIcon,
  FileCodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  PlusIcon,
  QuoteIcon,
  SquareIcon,
} from 'lucide-react';

import { insertBlock, insertInlineElement } from '@repo/design-system/components/editor/transforms';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/design-system/components/ui/dropdown-menu';

import { ToolbarButton, ToolbarMenuGroup } from './toolbar';

type Group = { group: string; items: Item[] };

interface Item {
  icon: React.ReactNode;
  value: string;
  onSelect: (editor: PlateEditor, value: string) => void;
  focusEditor?: boolean;
  label?: string;
}

const groups: Group[] = [
  {
    group: 'Basic blocks',
    items: [
      { icon: <PilcrowIcon />, label: 'Paragraph', value: ParagraphPlugin.key },
      { icon: <Heading1Icon />, label: 'Heading 1', value: HEADING_KEYS.h1 },
      { icon: <Heading2Icon />, label: 'Heading 2', value: HEADING_KEYS.h2 },
      { icon: <Heading3Icon />, label: 'Heading 3', value: HEADING_KEYS.h3 },
      { icon: <FileCodeIcon />, label: 'Code', value: CodeBlockPlugin.key },
      { icon: <QuoteIcon />, label: 'Quote', value: BlockquotePlugin.key },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: 'Lists',
    items: [
      { icon: <ListIcon />, label: 'Bulleted list', value: ListStyleType.Disc },
      { icon: <ListOrderedIcon />, label: 'Numbered list', value: ListStyleType.Decimal },
      { icon: <SquareIcon />, label: 'To-do list', value: INDENT_LIST_KEYS.todo },
      { icon: <ChevronRightIcon />, label: 'Toggle list', value: TogglePlugin.key },
    ].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertBlock(editor, value);
      },
    })),
  },
  {
    group: 'Inline',
    items: [{ icon: <Link2Icon />, label: 'Link', value: LinkPlugin.key }].map((item) => ({
      ...item,
      onSelect: (editor, value) => {
        insertInlineElement(editor, value);
      },
    })),
  },
];

export function InsertDropdownMenuSimple(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={open} tooltip="Insert" isDropdown>
          <PlusIcon />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="flex max-h-[500px] min-w-0 flex-col overflow-y-auto"
        align="start"
      >
        {groups.map(({ group, items: nestedItems }) => (
          <ToolbarMenuGroup key={group} label={group}>
            {nestedItems.map(({ icon, label, value, onSelect }) => (
              <DropdownMenuItem
                key={value}
                className="min-w-[180px]"
                onSelect={() => {
                  onSelect(editor, value);
                  editor.tf.focus();
                }}
              >
                {icon}
                {label}
              </DropdownMenuItem>
            ))}
          </ToolbarMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
