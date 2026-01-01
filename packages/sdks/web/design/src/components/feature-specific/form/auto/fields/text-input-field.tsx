'use client';

import React from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../../../../ui/form';
import { Input } from '../../../../ui/input';
import { FormLabel } from '../field-label';

export type InputProps = Omit<React.ComponentProps<typeof Input>, 'onChangeValue'>;
export type TextInputFieldProps<Schema extends FieldValues> = InputProps & {
  name: FieldPath<Schema>;
  control: Control<Schema>;
  label?: string;
  className?: string;
  description?: React.ReactNode;
  markAsRequired?: boolean;
  tooltip?: string;
};

export function TextInputFieldComponent<Schema extends FieldValues>({
  name,
  control,
  label,
  tooltip,
  className,
  placeholder,
  description,
  markAsRequired,
  ...rest
}: TextInputFieldProps<Schema>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className} key={`text-input-field-${name}`}>
          <FormLabel markAsRequired={markAsRequired} tooltip={tooltip}>
            {label}
          </FormLabel>
          <FormControl>
            <Input {...rest} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage className="font-normal text-xs" />
          {description && <FormDescription className="text-xs">{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}

export const TextInputField = React.memo(TextInputFieldComponent);
