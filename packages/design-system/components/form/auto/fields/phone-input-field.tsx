'use client';

import React from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '../../../../lib/utils';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../../ui/form';
import { PhoneInput } from '../../elements/phone-input';
import { FormLabel } from '../field-label';

export type PhoneInputProps = Omit<React.ComponentProps<typeof PhoneInput>, 'onChangeValue'>;
export type PhoneInputFieldProps<Schema extends FieldValues> = PhoneInputProps & {
  name: FieldPath<Schema>;
  control: Control<Schema>;
  label?: string;
  className?: string;
  description?: React.ReactNode;
  markAsRequired?: boolean;
  tooltip?: string;
};

export function PhoneInputFieldComponent<Schema extends FieldValues>({
  name,
  label,
  tooltip,
  control,
  className,
  placeholder,
  description,
  markAsRequired,
  ...rest
}: PhoneInputFieldProps<Schema>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormItem key={`phone-input-field-${name}`} className={cn('w-full', className)}>
            <FormLabel markAsRequired={markAsRequired} tooltip={tooltip}>
              {label}
            </FormLabel>
            <FormControl>
              <PhoneInput
                inputContainerClassName="flex-1"
                {...rest}
                placeholder={placeholder}
                {...field}
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

export const PhoneInputField = React.memo(PhoneInputFieldComponent);
