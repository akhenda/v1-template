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
import {
  ParagraphPlugin,
  Plate,
  PlateLeaf,
  usePlateEditor,
  usePluginOption,
} from '@udecode/plate/react';
import { createPlatePlugin } from '@udecode/plate/react';
import {
  BoldIcon,
  Code2Icon,
  HighlighterIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react';
import React, { useMemo, useCallback, useEffect } from 'react';

import { useUpdateEffect } from '@repo/design-system/hooks/use-update-effect';

import { debounce } from '../../lib/debounce';
import { AIAction } from '../ai-action';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

import { basicNodesPlugins } from './plugins/basic-nodes-plugins';
import { indentListPlugins } from './plugins/indent-list-plugins';
import { linkPlugin } from './plugins/link-plugin';
import { markdownPlugin } from './plugins/markdown-plugin';
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
import { ToolbarGroup } from './ui/toolbar';
import { TurnIntoDropdownMenuSimple } from './ui/turn-into-dropdown-menu-simple';
import { TypographyToolbarButton } from './ui/typography-toolbar-button';

type PlateEditorMinimalMDProps = {
  id?: string;
  value: string;
  onChange?: (value: string) => void;
  onBlur?: (value: Value) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  extended?: boolean;
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

const initialValue = '';

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
  key: 'fixed-toolbar-md',
  options: {
    extended: false,
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
  render: {
    beforeEditable: () => {
      const extended = usePluginOption(FixedToolbarPlugin, 'extended');
      const aiAction = usePluginOption(FixedToolbarPlugin, 'aiAction');
      const aiActionCredits = usePluginOption(FixedToolbarPlugin, 'aiActionCredits');
      const aiActionCost = usePluginOption(FixedToolbarPlugin, 'aiActionCost');
      const aiActionTitle = usePluginOption(FixedToolbarPlugin, 'aiActionTitle');
      const aiActionText = usePluginOption(FixedToolbarPlugin, 'aiActionText');
      const aiActionButtonText = usePluginOption(FixedToolbarPlugin, 'aiActionButtonText');
      const aiActionTooltipText = usePluginOption(FixedToolbarPlugin, 'aiActionTooltipText');
      const aiActionClassName = usePluginOption(FixedToolbarPlugin, 'aiActionClassName');
      const onAIAction = usePluginOption(FixedToolbarPlugin, 'onAIAction');

      return (
        <div className="relative">
          <FixedToolbar className="justify-start rounded-t-sm">
            <div className="flex w-full min-w-fit">
              <ToolbarGroup>
                <UndoToolbarButton />
                <RedoToolbarButton />
              </ToolbarGroup>

              {extended && (
                <ToolbarGroup>
                  <TypographyToolbarButton element="h1" />
                  <TypographyToolbarButton element="h2" />
                  <TypographyToolbarButton element="h3" />
                  <TypographyToolbarButton element="p" />
                </ToolbarGroup>
              )}

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

          {aiAction && (
            <Tooltip>
              <TooltipTrigger asChild>
                <AIAction
                  size="icon"
                  credits={aiActionCredits}
                  cost={aiActionCost}
                  title={aiActionTitle}
                  actionText={aiActionText}
                  buttonText={aiActionButtonText}
                  onAction={onAIAction}
                  className={cn(
                    '-translate-y-1/2 absolute top-1/2 right-2 z-50 h-8 w-8',
                    aiActionClassName,
                  )}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>{aiActionTooltipText}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
});

const FloatingToolbarPlugin = createPlatePlugin({
  key: 'floating-toolbar-md',
  render: {
    afterEditable: () => {
      const extended = usePluginOption(FixedToolbarPlugin, 'extended');

      return (
        <FloatingToolbar>
          {extended && (
            <ToolbarGroup>
              <TurnIntoDropdownMenuSimple />
            </ToolbarGroup>
          )}

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
      );
    },
  },
});

function PlateEditorMinimalMDComponent({
  id = 'editor',
  value = initialValue,
  onBlur,
  onChange,
  placeholder,
  className,
  disabled,
  readOnly = false,
  extended = false,
  aiAction = false,
  aiActionCredits = 0,
  aiActionCost = 1,
  aiActionTitle = 'Enhance this section using AI ✨',
  aiActionText = 'Enhance with AI',
  aiActionButtonText = 'Enhance with AI',
  aiActionTooltipText = 'Rewrite with AI',
  aiActionClassName = '',
  onAIAction = () => console.info('Enhancing with AI...'),
  ...rest
}: PlateEditorMinimalMDProps) {
  const fixedToolbarPluginConfig = useMemo(
    () => ({
      options: {
        extended,
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
    [
      extended,
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

  const plugins = useMemo(
    () => [
      ...basicNodesPlugins,
      ...indentListPlugins,
      linkPlugin,
      KbdPlugin,
      BasicMarksPlugin,
      HighlightPlugin,
      markdownPlugin,
      FixedToolbarPlugin.configure(fixedToolbarPluginConfig),
      FloatingToolbarPlugin,
    ],
    [fixedToolbarPluginConfig],
  );

  const editor = usePlateEditor(
    {
      id,
      components: editorComponents,
      plugins,
      skipInitialization: true,
      value: (editor) => {
        return value
          ? editor.getApi(markdownPlugin).markdown.deserialize(value)
          : [{ children: [{ text: 'Is this it?' }], type: 'p' }];
      },
    },
    [id],
  );

  const debouncedOnChange = useMemo(
    () => (onChange ? debounce(onChange, 50) : null), // Debounce by 50ms
    [onChange],
  );

  // Memoize the onChange handler to prevent unnecessary re-renders
  const handleChange = useCallback(
    () => debouncedOnChange?.(editor.api.markdown.serialize({ value: editor.children })),
    [debouncedOnChange, editor],
  );

  useEffect(() => {
    const deserializedValue = value
      ? editor.api.markdown.deserialize(value)
      : [{ children: [{ text: '' }], type: 'p' }];
    editor.tf.init({ value: deserializedValue, autoSelect: 'end' });
  }, []);

  // useUpdateEffect(() => {
  //   const deserializedValue = value
  //     ? editor.api.markdown.deserialize(value)
  //     : [{ children: [{ text: '' }], type: 'p' }];
  //   editor.tf.setValue(deserializedValue);
  //   editor.tf.focus({ edge: 'endEditor' });
  // }, [value]);

  useUpdateEffect(() => {
    if (editor && value) {
      // Get the current markdown content from the editor's internal state
      const currentEditorMarkdown = editor
        .getApi(markdownPlugin)
        .markdown.serialize({ value: editor.children });

      // Only update the editor if the incoming 'value' prop is different from its current content.
      // This prevents unnecessary re-renders and potential focus loss when the editor is already in sync.
      if (currentEditorMarkdown !== value) {
        const deserializedValue = value
          ? editor.getApi(markdownPlugin).markdown.deserialize(value)
          : [{ children: [{ text: '' }], type: 'p' }];

        // Set the editor's value
        editor.tf.setValue(deserializedValue);

        // Only try to focus if the editor is not currently focused.
        // This is crucial to avoid disrupting user's active typing.
        if (!editor.isFocused) {
          editor.tf.focus({ edge: 'end' }); // Use plain focus, which tries to restore the last selection or focus at the end
        }
      }
    }
  }, [value]);

  return (
    <Plate primary={false} editor={editor} onValueChange={handleChange} readOnly={readOnly}>
      <EditorContainer
        variant="select"
        className="aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
        {...rest}
      >
        <Editor
          variant="select"
          spellCheck={false}
          disabled={disabled}
          placeholder={placeholder}
          className={cn('rounded-md rounded-t-none bg-muted', className)}
        />
      </EditorContainer>
    </Plate>
  );
}
PlateEditorMinimalMDComponent.displayName = 'PlateEditorMinimalMD';

const areEqual = (prevProps: PlateEditorMinimalMDProps, nextProps: PlateEditorMinimalMDProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.value === nextProps.value &&
    prevProps.onChange === nextProps.onChange &&
    prevProps.onBlur === nextProps.onBlur &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.className === nextProps.className &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.readOnly === nextProps.readOnly &&
    prevProps.extended === nextProps.extended &&
    prevProps.aiAction === nextProps.aiAction &&
    prevProps.aiActionCredits === nextProps.aiActionCredits &&
    prevProps.aiActionCost === nextProps.aiActionCost &&
    prevProps.aiActionTitle === nextProps.aiActionTitle &&
    prevProps.aiActionText === nextProps.aiActionText &&
    prevProps.aiActionButtonText === nextProps.aiActionButtonText &&
    prevProps.aiActionTooltipText === nextProps.aiActionTooltipText &&
    prevProps.aiActionClassName === nextProps.aiActionClassName &&
    prevProps.onAIAction === nextProps.onAIAction
  );
};

// export const PlateEditorMinimalMD = PlateEditorMinimalMDComponent;
export const PlateEditorMinimalMD = React.memo(PlateEditorMinimalMDComponent, areEqual);
