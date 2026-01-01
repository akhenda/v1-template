import { useState } from 'react';

import { ImageIcon } from '@radix-ui/react-icons';
import type { Editor } from '@tiptap/react';
import type { VariantProps } from 'class-variance-authority';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../../../ui/dialog';
import type { toggleVariants } from '../../../../../../ui/toggle';
import { ToolbarButton } from '../toolbar-button';

import { ImageEditBlock } from './image-edit-block';

interface ImageEditDialogProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

const ImageEditDialog = ({ editor, size, variant }: ImageEditDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <ToolbarButton
          aria-label="Image"
          isActive={editor.isActive('image')}
          size={size}
          tooltip="Image"
          variant={variant}
        >
          <ImageIcon className="size-5" />
        </ToolbarButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Select image</DialogTitle>
          <DialogDescription className="sr-only">
            Upload an image from your computer
          </DialogDescription>
        </DialogHeader>
        <ImageEditBlock close={() => setOpen(false)} editor={editor} />
      </DialogContent>
    </Dialog>
  );
};

export { ImageEditDialog };
