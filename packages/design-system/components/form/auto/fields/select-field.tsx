import React from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../ui/select';
import { FormLabel } from '../field-label';

export type SelectInputOptionValue = string;
export type SelectInputOption = { label: string; value: SelectInputOptionValue };
export type SelectInputItems = SelectInputOption[];
export type SelectItemProps = Omit<React.ComponentProps<typeof SelectItem>, 'value'>;
export type SelectFieldProps<Schema extends FieldValues> = SelectItemProps & {
  name: FieldPath<Schema>;
  control: Control<Schema>;
  label?: string;
  className?: string;
  items: SelectInputItems;
  placeholder?: string;
  description?: React.ReactNode;
  markAsRequired?: boolean;
  tooltip?: string;
};

export function SelectFieldComponent<Schema extends FieldValues>({
  name,
  label,
  tooltip,
  control,
  className,
  placeholder,
  description,
  items,
  markAsRequired,
  ...rest
}: SelectFieldProps<Schema>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel markAsRequired={markAsRequired} tooltip={tooltip}>
            {label}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full bg-muted">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem {...rest} key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="font-normal text-xs" />
        </FormItem>
      )}
    />
  );
}

export const SelectField = React.memo(SelectFieldComponent);
