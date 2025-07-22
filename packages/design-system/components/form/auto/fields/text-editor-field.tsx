import React from 'react';
import type { FieldValues } from 'react-hook-form';

import { PlateEditorFieldComponent, type PlateEditorFieldProps } from './plate-editor-field';
import { PlateEditorFieldMDComponent, type PlateEditorFieldMDProps } from './plate-editor-field-md';
import { TextAreaFieldComponent, type TextAreaFieldProps } from './text-area-field';

export type TextEditorFieldProps<Schema extends FieldValues> =
  | (TextAreaFieldProps<Schema> & { type: 'simple' })
  | (PlateEditorFieldProps<Schema> & { type: 'plate' })
  | (PlateEditorFieldMDProps<Schema> & { type: 'plate-md' });

export function TextEditorFieldComponent<Schema extends FieldValues>(
  props: TextEditorFieldProps<Schema>,
) {
  switch (props.type) {
    case 'plate': {
      const { type, ...rest } = props;

      return <PlateEditorFieldComponent {...rest} />;
    }

    case 'plate-md': {
      const { type, ...rest } = props;

      return <PlateEditorFieldMDComponent {...rest} />;
    }

    default: {
      const { type, ...rest } = props;

      return <TextAreaFieldComponent {...rest} />;
    }
  }
}

export const TextEditorField = React.memo(TextEditorFieldComponent);
