import React from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '../../../../lib/utils';
import { Checkbox } from '../../../ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form';

export type CheckboxProps = Omit<React.ComponentProps<typeof Checkbox>, 'onChange'>;
export type CheckboxFieldProps<Schema extends FieldValues> = CheckboxProps & {
  name: FieldPath<Schema>;
  control: Control<Schema>;
  label?: string;
  className?: string;
  description?: React.ReactNode;
};

export function CheckboxFieldComponent<Schema extends FieldValues>({
  name,
  label,
  control,
  className,
  description,
  ...rest
}: CheckboxFieldProps<Schema>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex flex-row items-start space-x-3 space-y-0 rounded-md border bg-muted p-4',
            className,
          )}
        >
          <FormControl>
            <Checkbox
              className="bg-accent"
              {...rest}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className="font-normal">{label}</FormLabel>
            {description && <FormDescription className="text-xs">{description}</FormDescription>}
            <FormMessage className="font-normal text-xs" />
          </div>
        </FormItem>
      )}
    />
  );
}

export const CheckboxField = React.memo(CheckboxFieldComponent);
