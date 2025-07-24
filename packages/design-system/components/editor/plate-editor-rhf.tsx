'use client';

import { Plate } from '@udecode/plate/react';
import * as React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useCreateRHFEditor } from '@repo/design-system/components/editor/use-create-rhf-editor';

import { Editor, EditorContainer } from './ui/editor';

export function PlateEditorRHF() {
  const editor = useCreateRHFEditor();

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor}>
        <EditorContainer variant="select">
          <Editor variant="select" className="bg-muted" />
        </EditorContainer>
      </Plate>
    </DndProvider>
  );
}
