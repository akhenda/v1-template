import * as React from 'react';

import './styles/index.css';

import type { Content, Editor } from '@tiptap/react';
import { EditorContent } from '@tiptap/react';

import { cn } from '../../../../lib/utils';
import { Separator } from '../../../ui/separator';

import { LinkBubbleMenu } from './components/bubble-menu/link-bubble-menu';
import { MeasuredContainer } from './components/measured-container';
import { SectionFive } from './components/section/five';
import { SectionFour } from './components/section/four';
import { SectionOne } from './components/section/one';
import { SectionThree } from './components/section/three';
import { SectionTwo } from './components/section/two';
import type { UseMinimalTiptapEditorProps } from './hooks/use-minimal-tiptap';
import { useMinimalTiptapEditor } from './hooks/use-minimal-tiptap';

export interface MinimalTiptapProps extends Omit<UseMinimalTiptapEditorProps, 'onUpdate'> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
}

const Toolbar = ({ editor }: { editor: Editor }) => (
  <div className="shrink-0 overflow-x-auto border-border border-b p-2">
    <div className="flex w-max items-center gap-px">
      <SectionTwo
        editor={editor}
        activeActions={['bold', 'italic', 'underline', 'strikethrough', 'clearFormatting']}
        mainActionCount={3}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionOne editor={editor} activeLevels={[1, 2, 3, 4, 5, 6]} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionThree editor={editor} />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFour
        editor={editor}
        activeActions={['orderedList', 'bulletList']}
        mainActionCount={0}
      />

      <Separator orientation="vertical" className="mx-2 h-7" />

      <SectionFive
        editor={editor}
        activeActions={['blockquote', 'horizontalRule']}
        mainActionCount={0}
      />
    </div>
  </div>
);

export const MinimalTiptapEditor = React.forwardRef<HTMLDivElement, MinimalTiptapProps>(
  ({ value, onChange, className, editorContentClassName, ...props }, ref) => {
    const editor = useMinimalTiptapEditor({ value, onUpdate: onChange, ...props });

    if (!editor) return null;

    return (
      <MeasuredContainer
        as="div"
        name="editor"
        ref={ref}
        className={cn(
          'flex h-auto min-h-72 w-full flex-col rounded-md border border-input shadow-sm focus-within:border-primary',
          className,
        )}
      >
        <Toolbar editor={editor} />
        <EditorContent
          editor={editor}
          className={cn('minimal-tiptap-editor', editorContentClassName)}
        />
        <LinkBubbleMenu editor={editor} />
      </MeasuredContainer>
    );
  },
);

MinimalTiptapEditor.displayName = 'MinimalTiptapEditor';

export default MinimalTiptapEditor;
