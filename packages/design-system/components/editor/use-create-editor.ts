'use client';

import { withProps } from '@udecode/cn';
import type { Value } from '@udecode/plate';
import {
  type CreatePlateEditorOptions,
  ParagraphPlugin,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate/react';
import { AIPlugin } from '@udecode/plate-ai/react';
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CalloutPlugin } from '@udecode/plate-callout/react';
import { CodeBlockPlugin, CodeLinePlugin, CodeSyntaxPlugin } from '@udecode/plate-code-block/react';
import { CommentsPlugin } from '@udecode/plate-comments/react';
import { DatePlugin } from '@udecode/plate-date/react';
import { EmojiInputPlugin } from '@udecode/plate-emoji/react';
import { ExcalidrawPlugin } from '@udecode/plate-excalidraw/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { TocPlugin } from '@udecode/plate-heading/react';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { ColumnItemPlugin, ColumnPlugin } from '@udecode/plate-layout/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { EquationPlugin, InlineEquationPlugin } from '@udecode/plate-math/react';
import {
  AudioPlugin,
  FilePlugin,
  ImagePlugin,
  MediaEmbedPlugin,
  PlaceholderPlugin,
  VideoPlugin,
} from '@udecode/plate-media/react';
import { MentionInputPlugin, MentionPlugin } from '@udecode/plate-mention/react';
import { SlashInputPlugin } from '@udecode/plate-slash-command/react';
import { SuggestionPlugin } from '@udecode/plate-suggestion/react';
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from '@udecode/plate-table/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';

import { copilotPlugins } from '@repo/design-system/components/editor/plugins/copilot-plugins';
import { editorPlugins } from '@repo/design-system/components/editor/plugins/editor-plugins';
import { FixedToolbarPlugin } from '@repo/design-system/components/editor/plugins/fixed-toolbar-plugin';
import { FloatingToolbarPlugin } from '@repo/design-system/components/editor/plugins/floating-toolbar-plugin';

import { AILeaf } from './ui/ai-leaf';
import { BlockquoteElement } from './ui/blockquote-element';
import { CalloutElement } from './ui/callout-element';
import { CodeBlockElement } from './ui/code-block-element';
import { CodeLeaf } from './ui/code-leaf';
import { CodeLineElement } from './ui/code-line-element';
import { CodeSyntaxLeaf } from './ui/code-syntax-leaf';
import { ColumnElement } from './ui/column-element';
import { ColumnGroupElement } from './ui/column-group-element';
import { CommentLeaf } from './ui/comment-leaf';
import { DateElement } from './ui/date-element';
import { EmojiInputElement } from './ui/emoji-input-element';
import { EquationElement } from './ui/equation-element';
import { ExcalidrawElement } from './ui/excalidraw-element';
import { HeadingElement } from './ui/heading-element';
import { HighlightLeaf } from './ui/highlight-leaf';
import { HrElement } from './ui/hr-element';
import { ImageElement } from './ui/image-element';
import { InlineEquationElement } from './ui/inline-equation-element';
import { KbdLeaf } from './ui/kbd-leaf';
import { LinkElement } from './ui/link-element';
import { MediaAudioElement } from './ui/media-audio-element';
import { MediaEmbedElement } from './ui/media-embed-element';
import { MediaFileElement } from './ui/media-file-element';
import { MediaPlaceholderElement } from './ui/media-placeholder-element';
import { MediaVideoElement } from './ui/media-video-element';
import { MentionElement } from './ui/mention-element';
import { MentionInputElement } from './ui/mention-input-element';
import { ParagraphElement } from './ui/paragraph-element';
import { withPlaceholders } from './ui/placeholder';
import { SlashInputElement } from './ui/slash-input-element';
import { SuggestionLeaf } from './ui/suggestion-leaf';
import { TableCellElement, TableCellHeaderElement } from './ui/table-cell-element';
import { TableElement } from './ui/table-element';
import { TableRowElement } from './ui/table-row-element';
import { TocElement } from './ui/toc-element';
import { ToggleElement } from './ui/toggle-element';

export const viewComponents = {
  [AudioPlugin.key]: MediaAudioElement,
  [BlockquotePlugin.key]: BlockquoteElement,
  [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
  [CalloutPlugin.key]: CalloutElement,
  [CodeBlockPlugin.key]: CodeBlockElement,
  [CodeLinePlugin.key]: CodeLineElement,
  [CodePlugin.key]: CodeLeaf,
  [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
  [ColumnItemPlugin.key]: ColumnElement,
  [ColumnPlugin.key]: ColumnGroupElement,
  [CommentsPlugin.key]: CommentLeaf,
  [DatePlugin.key]: DateElement,
  [EquationPlugin.key]: EquationElement,
  [ExcalidrawPlugin.key]: ExcalidrawElement,
  [FilePlugin.key]: MediaFileElement,
  [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
  [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
  [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
  [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
  [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
  [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
  [HighlightPlugin.key]: HighlightLeaf,
  [HorizontalRulePlugin.key]: HrElement,
  [ImagePlugin.key]: ImageElement,
  [InlineEquationPlugin.key]: InlineEquationElement,
  [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
  [KbdPlugin.key]: KbdLeaf,
  [LinkPlugin.key]: LinkElement,
  [MediaEmbedPlugin.key]: MediaEmbedElement,
  [MentionPlugin.key]: MentionElement,
  [ParagraphPlugin.key]: ParagraphElement,
  [PlaceholderPlugin.key]: MediaPlaceholderElement,
  [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
  [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
  [SuggestionPlugin.key]: SuggestionLeaf,
  [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
  [TableCellHeaderPlugin.key]: TableCellHeaderElement,
  [TableCellPlugin.key]: TableCellElement,
  [TablePlugin.key]: TableElement,
  [TableRowPlugin.key]: TableRowElement,
  [TocPlugin.key]: TocElement,
  [TogglePlugin.key]: ToggleElement,
  [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
  [VideoPlugin.key]: MediaVideoElement,
};

export const editorComponents = {
  ...viewComponents,
  [AIPlugin.key]: AILeaf,
  [EmojiInputPlugin.key]: EmojiInputElement,
  [MentionInputPlugin.key]: MentionInputElement,
  [SlashInputPlugin.key]: SlashInputElement,
};

export const useCreateEditor = (
  {
    components,
    override,
    placeholders,
    readOnly,
    ...options
  }: {
    // biome-ignore lint/suspicious/noExplicitAny: TODO: we'll fix later
    components?: Record<string, any>;
    placeholders?: boolean;
    // biome-ignore lint/suspicious/noExplicitAny: TODO: we'll fix later
    plugins?: any[];
    readOnly?: boolean;
  } & Omit<CreatePlateEditorOptions, 'plugins'> = {},
  // biome-ignore lint/suspicious/noExplicitAny: TODO: we'll fix later
  deps: any[] = [],
) => {
  return usePlateEditor<Value, (typeof editorPlugins)[number]>(
    {
      override: {
        components: {
          ...(readOnly
            ? viewComponents
            : placeholders
              ? withPlaceholders(editorComponents)
              : editorComponents),
          ...components,
        },
        ...override,
      },
      plugins: [...copilotPlugins, ...editorPlugins, FixedToolbarPlugin, FloatingToolbarPlugin],
      value: [
        { children: [{ text: 'Playground' }], type: 'h1' },
        {
          children: [
            { text: 'A rich-text editor with AI capabilities. Try the ' },
            { bold: true, text: 'AI commands' },
            { text: ' or use ' },
            { kbd: true, text: 'Cmd+J' },
            { text: ' to open the AI menu.' },
          ],
          type: ParagraphPlugin.key,
        },
      ],
      ...options,
    },
    deps,
  );
};
