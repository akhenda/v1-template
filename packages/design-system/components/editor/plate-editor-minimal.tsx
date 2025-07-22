'use client';

import { cn, withProps } from '@udecode/cn';
import type { Value } from '@udecode/plate';
import {
  BasicMarksPlugin,
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin, CodeLinePlugin, CodeSyntaxPlugin } from '@udecode/plate-code-block/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { ParagraphPlugin, Plate, PlateLeaf, usePlateEditor } from '@udecode/plate/react';
import { createPlatePlugin } from '@udecode/plate/react';
import {
  BoldIcon,
  Code2Icon,
  HighlighterIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';
import React, { useMemo, useCallback } from 'react';

import { debounce } from '../../lib/debounce';
import { AIAction } from '../ai-action';

import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { basicNodesPlugins } from './plugins/basic-nodes-plugins';
import { indentListPlugins } from './plugins/indent-list-plugins';
import { linkPlugin } from './plugins/link-plugin';
import { BlockquoteElement } from './ui/blockquote-element';
import { CodeBlockElement } from './ui/code-block-element';
import { CodeLeaf } from './ui/code-leaf';
import { CodeLineElement } from './ui/code-line-element';
import { CodeSyntaxLeaf } from './ui/code-syntax-leaf';
import { Editor, EditorContainer } from './ui/editor';
import { FixedToolbar } from './ui/fixed-toolbar';
import { FloatingToolbar } from './ui/floating-toolbar';
import { HeadingElement } from './ui/heading-element';
import { HighlightLeaf } from './ui/highlight-leaf';
import { RedoToolbarButton, UndoToolbarButton } from './ui/history-toolbar-button';
import {
  BulletedIndentListToolbarButton,
  NumberedIndentListToolbarButton,
} from './ui/indent-list-toolbar-button';
import { KbdLeaf } from './ui/kbd-leaf';
import { LinkElement } from './ui/link-element';
import { LinkToolbarButton } from './ui/link-toolbar-button';
import { MarkToolbarButton } from './ui/mark-toolbar-button';
import { MoreDropdownMenu } from './ui/more-dropdown-menu';
import { ParagraphElement } from './ui/paragraph-element';
import { withPlaceholders } from './ui/placeholder';
import { ToolbarGroup } from './ui/toolbar';

type PlateEditorMinimalProps = {
  id?: string;
  value: Value;
  onChange?: (value: Value) => void;
  onBlur?: (value: Value) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  aiAction?: boolean;
  aiActionCredits?: number;
  aiActionCost?: number;
  aiActionTitle?: string;
  aiActionText?: string;
  aiActionButtonText?: string;
  aiActionTooltipText?: string;
  aiActionClassName?: string;
  onAIAction?: () => void;
};

export function getEditorValueFromString(value: string): Value {
  return [{ children: [{ text: value }], type: 'p' }];
}

const initialValue = getEditorValueFromString('');

export const editorComponents = {
  [BlockquotePlugin.key]: BlockquoteElement,
  [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
  [CodeBlockPlugin.key]: CodeBlockElement,
  [CodeLinePlugin.key]: CodeLineElement,
  [CodePlugin.key]: CodeLeaf,
  [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
  [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
  [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
  [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
  [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
  [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
  [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
  [HighlightPlugin.key]: HighlightLeaf,
  [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
  [KbdPlugin.key]: KbdLeaf,
  [LinkPlugin.key]: LinkElement,
  [ParagraphPlugin.key]: ParagraphElement,
  [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
  [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
  [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
  [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
};

const FixedToolbarPlugin = createPlatePlugin({
  key: 'fixed-toolbar',
  options: {
    aiAction: false,
    aiActionCredits: 0,
    aiActionCost: 1,
    aiActionTitle: 'Enhance this section using AI ✨',
    aiActionText: 'Enhance with AI',
    aiActionButtonText: 'Enhance with AI',
    aiActionTooltipText: 'Rewrite with AI',
    aiActionClassName: '',
    onAIAction: () => console.info('Enhancing with AI...'),
  },
}).extend(({ getOption }) => ({
  render: {
    beforeEditable: () => (
      <div className="relative">
        <FixedToolbar className="justify-start rounded-t-sm">
          <div className="flex w-full min-w-fit">
            <ToolbarGroup>
              <UndoToolbarButton />
              <RedoToolbarButton />
            </ToolbarGroup>

            <ToolbarGroup>
              <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
                <BoldIcon />
              </MarkToolbarButton>

              <MarkToolbarButton nodeType={ItalicPlugin.key} tooltip="Italic (⌘+I)">
                <ItalicIcon />
              </MarkToolbarButton>

              <MarkToolbarButton nodeType={UnderlinePlugin.key} tooltip="Underline (⌘+U)">
                <UnderlineIcon />
              </MarkToolbarButton>
            </ToolbarGroup>

            <ToolbarGroup>
              <NumberedIndentListToolbarButton />
              <BulletedIndentListToolbarButton />
            </ToolbarGroup>
          </div>
        </FixedToolbar>

        {getOption('aiAction') && (
          <Tooltip>
            <TooltipTrigger asChild>
              <AIAction
                size="icon"
                credits={getOption('aiActionCredits')}
                cost={getOption('aiActionCost')}
                title={getOption('aiActionTitle')}
                actionText={getOption('aiActionText')}
                buttonText={getOption('aiActionButtonText')}
                onAction={getOption('onAIAction')}
                className={cn(
                  '-translate-y-1/2 absolute top-1/2 right-2 z-50 h-8 w-8',
                  getOption('aiActionClassName'),
                )}
              />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p>{getOption('aiActionTooltipText')}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    ),
  },
}));

const FloatingToolbarPlugin = createPlatePlugin({
  key: 'floating-toolbar',
  render: {
    afterEditable: () => (
      <FloatingToolbar>
        <ToolbarGroup>
          <MarkToolbarButton nodeType={BoldPlugin.key} tooltip="Bold (⌘+B)">
            <BoldIcon />
          </MarkToolbarButton>

          <MarkToolbarButton nodeType={ItalicPlugin.key} tooltip="Italic (⌘+I)">
            <ItalicIcon />
          </MarkToolbarButton>

          <MarkToolbarButton nodeType={UnderlinePlugin.key} tooltip="Underline (⌘+U)">
            <UnderlineIcon />
          </MarkToolbarButton>

          <MarkToolbarButton nodeType={StrikethroughPlugin.key} tooltip="Strikethrough (⌘+⇧+M)">
            <StrikethroughIcon />
          </MarkToolbarButton>

          <MarkToolbarButton nodeType={CodePlugin.key} tooltip="Code (⌘+E)">
            <Code2Icon />
          </MarkToolbarButton>

          <LinkToolbarButton />

          <MarkToolbarButton nodeType={HighlightPlugin.key} tooltip="Highlight">
            <HighlighterIcon />
          </MarkToolbarButton>
        </ToolbarGroup>

        <ToolbarGroup>
          <MoreDropdownMenu />
        </ToolbarGroup>
      </FloatingToolbar>
    ),
  },
});

export function PlateEditorMinimal({
  id = 'editor',
  value = initialValue,
  onBlur,
  onChange,
  placeholder,
  className,
  disabled,
  readOnly = false,
  aiAction = false,
  aiActionCredits = 0,
  aiActionCost = 1,
  aiActionTitle = 'Enhance this section using AI ✨',
  aiActionText = 'Enhance with AI',
  aiActionButtonText = 'Enhance with AI',
  aiActionTooltipText = 'Rewrite with AI',
  aiActionClassName = '',
  onAIAction = () => console.info('Enhancing with AI...'),
}: PlateEditorMinimalProps) {
  const plugins = useMemo(
    () => [
      ...basicNodesPlugins,
      ...indentListPlugins,
      linkPlugin,
      KbdPlugin,
      BasicMarksPlugin,
      HighlightPlugin,
      FixedToolbarPlugin.configure({
        options: {
          aiAction,
          aiActionCredits,
          aiActionCost,
          aiActionTitle,
          aiActionText,
          aiActionButtonText,
          aiActionTooltipText,
          aiActionClassName,
          onAIAction,
        },
      }),
      FloatingToolbarPlugin,
    ],
    [
      aiAction,
      aiActionCredits,
      aiActionCost,
      aiActionTitle,
      aiActionText,
      aiActionButtonText,
      aiActionTooltipText,
      aiActionClassName,
      onAIAction,
    ],
  );

  const debouncedOnChange = useMemo(
    // Debounce by 300ms
    () => (onChange ? debounce(onChange, 300) : null),
    [onChange],
  );

  // Memoize the onChange handler to prevent unnecessary re-renders
  const handleChange = useCallback(
    ({ value: newValue }: { value: Value }) => debouncedOnChange?.(newValue),
    [debouncedOnChange],
  );

  const editor = usePlateEditor({
    id,
    components: withPlaceholders(editorComponents),
    plugins,
    value,
  });

  const handleBlur = useCallback(() => onBlur?.(editor?.children), [debouncedOnChange]);

  return (
    <Plate editor={editor} onChange={handleChange} readOnly={readOnly}>
      <EditorContainer variant="select">
        <Editor
          variant="select"
          disabled={disabled}
          placeholder={placeholder}
          onBlur={handleBlur}
          className={cn('rounded-md rounded-t-none bg-muted', className)}
        />
      </EditorContainer>
    </Plate>
  );
}
