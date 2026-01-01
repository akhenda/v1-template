import React from 'react';
import type { FieldValues } from 'react-hook-form';

import type { PlateEditorFieldProps } from './plate-editor-field';
import { PlateEditorFieldComponent } from './plate-editor-field';
import type { PlateEditorFieldMDProps } from './plate-editor-field-md';
import { PlateEditorFieldMDComponent } from './plate-editor-field-md';
import type { TextAreaFieldProps } from './text-area-field';
import { TextAreaFieldComponent } from './text-area-field';

export type TextEditorFieldProps<Schema extends FieldValues> =
  | (TextAreaFieldProps<Schema> & { type: 'simple' })
  | (PlateEditorFieldProps<Schema> & { type: 'plate' })
  | (PlateEditorFieldMDProps<Schema> & { type: 'plate-md' });

export function TextEditorFieldComponent<Schema extends FieldValues>(
  props: TextEditorFieldProps<Schema>,
) {
  switch (props.type) {
    case 'plate': {
      const { type: _type, ...rest } = props;

      return <PlateEditorFieldComponent {...rest} />;
    }

    case 'plate-md': {
      const { type: _type, ...rest } = props;

      return <PlateEditorFieldMDComponent {...rest} />;
    }

    default: {
      const { type: _type, ...rest } = props;

      return <TextAreaFieldComponent {...rest} />;
    }
  }
}

export const TextEditorField = React.memo(TextEditorFieldComponent);
