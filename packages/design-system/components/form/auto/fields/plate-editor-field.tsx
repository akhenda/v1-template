import type { Value } from '@udecode/plate';
import React from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '../../../../lib/utils';
import { PlateEditorMinimal, getEditorValueFromString } from '../../../editor/plate-editor-minimal';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../../ui/form';
import { FormLabel } from '../field-label';

export type PlateEditorProps = Omit<
  React.ComponentProps<typeof PlateEditorMinimal>,
  'value' | 'onChange'
>;

export type PlateEditorFieldProps<Schema extends FieldValues> = PlateEditorProps & {
  name: FieldPath<Schema>;
  control: Control<Schema>;
  label?: string;
  editorClassName?: string;
  className?: string;
  description?: React.ReactNode;
  placeholder?: string;
  resizable?: boolean;
  markAsRequired?: boolean;
  tooltip?: string;
};

function getParsedValue(value: string) {
  try {
    return JSON.parse(value) as Value;
  } catch {
    return getEditorValueFromString(value);
  }
}

export function PlateEditorFieldComponent<Schema extends FieldValues>({
  name,
  label,
  control,
  tooltip,
  className,
  description,
  placeholder,
  markAsRequired,
  editorClassName,
  resizable = false,
  ...rest
}: PlateEditorFieldProps<Schema>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const onChangeValue = (value: Value) => {
          const stringifiedValue = JSON.stringify(value);

          field.onChange(stringifiedValue);
        };

        return (
          <FormItem className={className}>
            {label && (
              <FormLabel markAsRequired={markAsRequired} tooltip={tooltip}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <PlateEditorMinimal
                {...field}
                value={getParsedValue(field.value)}
                onChange={onChangeValue}
                placeholder={placeholder}
                aiActionTooltipText="Rewrite with AI"
                className={cn(
                  'mmax-h-80 min-h-[10rem] resize-none bg-muted text-sm',
                  { 'resize-y': resizable },
                  editorClassName,
                )}
                {...rest}
              />
            </FormControl>
            <FormMessage className="font-normal text-xs" />
            {description && <FormDescription className="text-xs">{description}</FormDescription>}
          </FormItem>
        );
      }}
    />
  );
}

export const PlateEditorField = React.memo(PlateEditorFieldComponent);
