'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate/react';

import { Editor, EditorContainer } from './ui/editor';
import { useCreateRHFEditor } from './use-create-rhf-editor';

export function PlateEditorRHF() {
  const editor = useCreateRHFEditor();

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <EditorContainer variant="select">
          <Editor className="bg-muted" variant="select" />
        </EditorContainer>
      </Plate>
    </DndProvider>
  );
}
