'use client';

import type { Value } from '@udecode/plate';
import { BasicElementsPlugin } from '@udecode/plate-basic-elements/react';
import { BasicMarksPlugin } from '@udecode/plate-basic-marks/react';
import type { PlateElementProps, PlateLeafProps } from '@udecode/plate/react';
import { Plate, PlateLeaf, usePlateEditor } from '@udecode/plate/react';

import { BlockquoteElement } from './ui/blockquote-element';
import { Editor, EditorContainer } from './ui/editor';
import { FixedToolbar } from './ui/fixed-toolbar';
import { HeadingElement } from './ui/heading-element';
import { MarkToolbarButton } from './ui/mark-toolbar-button';
import { ParagraphElement } from './ui/paragraph-element';
import { ToolbarButton } from './ui/toolbar';

const initialValue: Value = [
  { children: [{ text: 'Title' }], type: 'h3' },
  { children: [{ text: 'This is a quote.' }], type: 'blockquote' },
  {
    children: [
      { text: 'With some ' },
      { bold: true, text: 'bold' },
      { text: ' text for emphasis!' },
    ],
    type: 'p',
  },
];

export function PlateEditorSimple() {
  const editor = usePlateEditor({
    components: {
      blockquote: BlockquoteElement,
      p: ParagraphElement,
      bold(props: PlateLeafProps) {
        return <PlateLeaf {...props} as="strong" />;
      },
      h1(props: PlateElementProps) {
        return <HeadingElement {...props} variant="h1" />;
      },
      h2(props: PlateElementProps) {
        return <HeadingElement {...props} variant="h2" />;
      },
      h3(props: PlateElementProps) {
        return <HeadingElement {...props} variant="h3" />;
      },
      italic(props: PlateLeafProps) {
        return <PlateLeaf {...props} as="em" />;
      },
      underline(props: PlateLeafProps) {
        return <PlateLeaf {...props} as="u" />;
      },
    },
    plugins: [BasicElementsPlugin, BasicMarksPlugin],
    value: () => {
      const savedValue = localStorage.getItem(
        `nextjs-plate-value-demo-${new Date().toISOString().split('T')[0]}`
      );

      if (savedValue) return JSON.parse(savedValue);

      return initialValue;
    },
  });

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <Plate
      editor={editor}
      onChange={({ value }) => {
        localStorage.setItem(
          `nextjs-plate-value-demo-${new Date().toISOString().split('T')[0]}`,
          JSON.stringify(value)
        );
      }}
    >
      <FixedToolbar className="flex justify-start gap-1 rounded-t-lg">
        <ToolbarButton onClick={() => editor.tf.toggleBlock('h1')}>H1</ToolbarButton>
        <ToolbarButton onClick={() => editor.tf.toggleBlock('h2')}>H2</ToolbarButton>
        <ToolbarButton onClick={() => editor.tf.toggleBlock('h3')}>H3</ToolbarButton>

        <ToolbarButton onClick={() => editor.tf.toggleBlock('blockquote')}>Quote</ToolbarButton>

        <MarkToolbarButton nodeType="bold" tooltip="Bold (⌘+B)">
          B
        </MarkToolbarButton>
        <MarkToolbarButton nodeType="italic" tooltip="Italic (⌘+I)">
          I
        </MarkToolbarButton>
        <MarkToolbarButton nodeType="underline" tooltip="Underline (⌘+U)">
          U
        </MarkToolbarButton>

        <div className="flex-1" />

        <ToolbarButton
          className="px-2"
          onClick={() => {
            editor.tf.setValue(initialValue);
          }}
        >
          Reset
        </ToolbarButton>
      </FixedToolbar>

      <EditorContainer>
        <Editor placeholder="Type your amazing content here..." variant="select" />
      </EditorContainer>
    </Plate>
  );
}
