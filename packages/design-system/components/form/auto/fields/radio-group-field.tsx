import React from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { cn } from '../../../../lib/utils';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../../ui/form';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import { FormLabel } from '../field-label';

export type RadioGroupItemProps = Omit<React.ComponentProps<typeof RadioGroupItem>, 'value'>;
export type RadioGroupItemOptionValue<T = string> = T;
export type RadioGroupItemOption<T = string> = {
  label: string;
  value: RadioGroupItemOptionValue<T>;
};
export type RadioGroupItemOptions<T = string> = RadioGroupItemOption<T>[];
export type RadioGroupFieldProps<Schema extends FieldValues, T = string> = RadioGroupItemProps & {
  name: FieldPath<Schema>;
  control: Control<Schema>;
  label?: string;
  className?: string;
  options: RadioGroupItemOptions<T>;
  description?: React.ReactNode;
  markAsRequired?: boolean;
  tooltip?: string;
};

export function RadioGroupFieldComponent<Schema extends FieldValues>({
  name,
  label,
  tooltip,
  control,
  className,
  options,
  description,
  markAsRequired,
  ...rest
}: RadioGroupFieldProps<Schema>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn('space-y-2', className)}>
          <div className="mb-4">
            <FormLabel markAsRequired={markAsRequired} tooltip={tooltip}>
              {label}
            </FormLabel>
            {description && <FormDescription className="text-xs">{description}</FormDescription>}
          </div>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {options.map((item) => (
                <FormItem key={item.value} className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem {...rest} value={item.value} className="bg-muted" />
                  </FormControl>
                  <FormLabel className="font-normal">{item.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage className="font-normal text-xs" />
        </FormItem>
      )}
    />
  );
}

export const RadioGroupField = React.memo(RadioGroupFieldComponent);
