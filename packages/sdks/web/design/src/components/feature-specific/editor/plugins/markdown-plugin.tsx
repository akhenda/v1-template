'use client';

import { MarkdownPlugin, remarkMdx, remarkMention } from '@udecode/plate-markdown';
import { SuggestionPlugin } from '@udecode/plate-suggestion/react';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export const markdownPlugin = MarkdownPlugin.configure({
  options: {
    disallowedNodes: [SuggestionPlugin.key],
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    remarkPlugins: [remarkMath, remarkGfm, remarkMdx, remarkMention, remarkEmoji as any],
  },
});
