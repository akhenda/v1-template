'use client';

import { withProps } from '@udecode/cn';
import type { Value } from '@udecode/plate';
import {
  type CreatePlateEditorOptions,
  ParagraphPlugin,
  PlateLeaf,
  usePlateEditor,
} from '@udecode/plate/react';
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
import { DatePlugin } from '@udecode/plate-date/react';
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontSizePlugin,
} from '@udecode/plate-font/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { HighlightPlugin } from '@udecode/plate-highlight/react';
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react';
import { KbdPlugin } from '@udecode/plate-kbd/react';
import { ColumnItemPlugin, ColumnPlugin } from '@udecode/plate-layout/react';
import { LinkPlugin } from '@udecode/plate-link/react';
import { PlaceholderPlugin } from '@udecode/plate-media/react';
import { TogglePlugin } from '@udecode/plate-toggle/react';

import { alignPlugin } from './plugins/align-plugin';
import { basicNodesPlugins } from './plugins/basic-nodes-plugins';
import type { editorPlugins } from './plugins/editor-plugins';
import { FixedToolbarPluginRHF } from './plugins/fixed-toolbar-plugin-rhf';
import { FloatingToolbarPluginRHF } from './plugins/floating-toolbar-plugin-rhf';
import { indentListPlugins } from './plugins/indent-list-plugins';
import { lineHeightPlugin } from './plugins/line-height-plugin';
import { linkPlugin } from './plugins/link-plugin';
import { skipMarkPlugin } from './plugins/skip-mark-plugin';
import { BlockquoteElement } from './ui/blockquote-element';
import { CodeBlockElement } from './ui/code-block-element';
import { CodeLeaf } from './ui/code-leaf';
import { CodeLineElement } from './ui/code-line-element';
import { CodeSyntaxLeaf } from './ui/code-syntax-leaf';
import { ColumnElement } from './ui/column-element';
import { ColumnGroupElement } from './ui/column-group-element';
import { DateElement } from './ui/date-element';
import { HeadingElement } from './ui/heading-element';
import { HighlightLeaf } from './ui/highlight-leaf';
import { HrElement } from './ui/hr-element';
import { KbdLeaf } from './ui/kbd-leaf';
import { LinkElement } from './ui/link-element';
import { MediaPlaceholderElement } from './ui/media-placeholder-element';
import { ParagraphElement } from './ui/paragraph-element';
import { withPlaceholders } from './ui/placeholder';
import { ToggleElement } from './ui/toggle-element';

export const viewComponents = {
  [BlockquotePlugin.key]: BlockquoteElement,
  [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
  [CodeBlockPlugin.key]: CodeBlockElement,
  [CodeLinePlugin.key]: CodeLineElement,
  [CodePlugin.key]: CodeLeaf,
  [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
  [ColumnItemPlugin.key]: ColumnElement,
  [ColumnPlugin.key]: ColumnGroupElement,
  [DatePlugin.key]: DateElement,
  [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
  [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
  [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
  [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
  [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: 'h5' }),
  [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: 'h6' }),
  [HighlightPlugin.key]: HighlightLeaf,
  [HorizontalRulePlugin.key]: HrElement,
  [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
  [KbdPlugin.key]: KbdLeaf,
  [LinkPlugin.key]: LinkElement,
  [ParagraphPlugin.key]: ParagraphElement,
  [PlaceholderPlugin.key]: MediaPlaceholderElement,
  [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
  [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
  [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
  [TogglePlugin.key]: ToggleElement,
  [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' }),
};

export const editorComponents = { ...viewComponents };

export const useCreateRHFEditor = (
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
      plugins: [
        ...basicNodesPlugins,
        HorizontalRulePlugin,
        linkPlugin,
        DatePlugin,
        TogglePlugin,
        CalloutPlugin,
        ColumnPlugin,

        // Marks
        FontColorPlugin,
        FontBackgroundColorPlugin,
        FontSizePlugin,
        HighlightPlugin,
        KbdPlugin,
        skipMarkPlugin,

        // Block Style
        alignPlugin,
        ...indentListPlugins,
        lineHeightPlugin,

        FixedToolbarPluginRHF,
        FloatingToolbarPluginRHF,
      ],
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
