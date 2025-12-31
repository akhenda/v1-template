'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate/react';

import { useCreateRHFEditor } from '../../components/editor/use-create-rhf-editor';

import { Editor, EditorContainer } from './ui/editor';

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
