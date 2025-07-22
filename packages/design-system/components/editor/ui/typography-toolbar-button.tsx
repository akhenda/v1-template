'use client';

import { HEADING_KEYS } from '@udecode/plate-heading';
import {
  ParagraphPlugin,
  useEditorRef,
  useMarkToolbarButton,
  useMarkToolbarButtonState,
} from '@udecode/plate/react';
import { Heading1Icon, Heading2Icon, Heading3Icon, type LucideIcon, TypeIcon } from 'lucide-react';
import * as React from 'react';

import { setBlockType } from '@repo/design-system/components/editor/transforms';

import { ToolbarButton } from './toolbar';

type TypographyType = {
  [key in 'h1' | 'h2' | 'h3' | 'p']: {
    icon: LucideIcon;
    keywords: string[];
    label: string;
    value: string;
  };
};

type Props = React.ComponentProps<typeof ToolbarButton> & {
  element: 'h1' | 'h2' | 'h3' | 'p';
  clear?: string[] | string;
};

const typography: TypographyType = {
  p: { icon: TypeIcon, keywords: ['paragraph'], label: 'Text', value: ParagraphPlugin.key },
  h1: { icon: Heading1Icon, keywords: ['title', 'h1'], label: 'Heading 1', value: HEADING_KEYS.h1 },
  h2: {
    icon: Heading2Icon,
    keywords: ['subtitle', 'h2'],
    label: 'Heading 2',
    value: HEADING_KEYS.h2,
  },
  h3: {
    icon: Heading3Icon,
    keywords: ['subtitle', 'h3'],
    label: 'Heading 3',
    value: HEADING_KEYS.h3,
  },
};

export function TypographyToolbarButton({ element, clear, ...rest }: Props) {
  const editor = useEditorRef();
  const state = useMarkToolbarButtonState({ clear, nodeType: element });
  const { props: buttonProps } = useMarkToolbarButton(state);

  const Icon = typography[element].icon;
  const tooltip = typography[element].label;

  return (
    <ToolbarButton
      {...rest}
      {...buttonProps}
      onClick={() => setBlockType(editor, element)}
      onMouseDown={(e) => e.preventDefault()}
      tooltip={tooltip}
    >
      <Icon />
    </ToolbarButton>
  );
}
