'use client';

import * as React from 'react';

import { AIChatPlugin } from '@udecode/plate-ai/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { HEADING_KEYS } from '@udecode/plate-heading';
import { IndentListPlugin } from '@udecode/plate-indent-list/react';
import {
  BLOCK_CONTEXT_MENU_ID,
  BlockMenuPlugin,
  BlockSelectionPlugin,
} from '@udecode/plate-selection/react';
import { ParagraphPlugin, useEditorPlugin, usePlateState } from '@udecode/plate/react';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@repo/design-system/components/ui/context-menu';
import { useIsTouchDevice } from '@repo/design-system/hooks/use-is-touch-device';

type Value = 'askAI' | null;

export function BlockContextMenu({ children }: { children: React.ReactNode }) {
  const { api, editor } = useEditorPlugin(BlockMenuPlugin);
  const [value, setValue] = React.useState<Value>(null);
  const isTouch = useIsTouchDevice();
  const [readOnly] = usePlateState('readOnly');

  const handleTurnInto = React.useCallback(
    (type: string) => {
      editor
        .getApi(BlockSelectionPlugin)
        .blockSelection.getNodes()
        .forEach(([node, path]) => {
          if (node[IndentListPlugin.key]) {
            editor.tf.unsetNodes([IndentListPlugin.key, 'indent'], {
              at: path,
            });
          }

          editor.tf.toggleBlock(type, { at: path });
        });
    },
    [editor],
  );

  const handleAlign = React.useCallback(
    (align: 'center' | 'left' | 'right') => {
      editor.getTransforms(BlockSelectionPlugin).blockSelection.setNodes({ align });
    },
    [editor],
  );

  if (isTouch) {
    return children;
  }

  return (
    <ContextMenu
      onOpenChange={(open) => {
        if (!open) {
          // prevent unselect the block selection
          setTimeout(() => {
            api.blockMenu.hide();
          }, 0);
        }
      }}
      modal={false}
    >
      <ContextMenuTrigger
        asChild
        onContextMenu={(event) => {
          const dataset = (event.target as HTMLElement).dataset;

          const disabled = dataset?.slateEditor === 'true' || readOnly;

          if (disabled) return event.preventDefault();

          api.blockMenu.show(BLOCK_CONTEXT_MENU_ID, {
            x: event.clientX,
            y: event.clientY,
          });
        }}
      >
        <div className="w-full">{children}</div>
      </ContextMenuTrigger>
      <ContextMenuContent
        className="w-64"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          editor.getApi(BlockSelectionPlugin).blockSelection.focus();

          if (value === 'askAI') {
            editor.getApi(AIChatPlugin).aiChat.show();
          }

          setValue(null);
        }}
      >
        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() => {
              setValue('askAI');
            }}
          >
            Ask AI
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor.getTransforms(BlockSelectionPlugin).blockSelection.removeNodes();
              editor.tf.focus();
            }}
          >
            Delete
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              editor.getTransforms(BlockSelectionPlugin).blockSelection.duplicate();
            }}
          >
            Duplicate
            {/* <ContextMenuShortcut>⌘ + D</ContextMenuShortcut> */}
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Turn into</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem onClick={() => handleTurnInto(ParagraphPlugin.key)}>
                Paragraph
              </ContextMenuItem>

              <ContextMenuItem onClick={() => handleTurnInto(HEADING_KEYS.h1)}>
                Heading 1
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleTurnInto(HEADING_KEYS.h2)}>
                Heading 2
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleTurnInto(HEADING_KEYS.h3)}>
                Heading 3
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleTurnInto(BlockquotePlugin.key)}>
                Blockquote
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>

        <ContextMenuGroup>
          <ContextMenuItem
            onClick={() => editor.getTransforms(BlockSelectionPlugin).blockSelection.setIndent(1)}
          >
            Indent
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor.getTransforms(BlockSelectionPlugin).blockSelection.setIndent(-1)}
          >
            Outdent
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Align</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem onClick={() => handleAlign('left')}>Left</ContextMenuItem>
              <ContextMenuItem onClick={() => handleAlign('center')}>Center</ContextMenuItem>
              <ContextMenuItem onClick={() => handleAlign('right')}>Right</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
