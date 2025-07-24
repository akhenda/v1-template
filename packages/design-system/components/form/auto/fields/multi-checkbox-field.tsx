import React from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { Checkbox } from '../../../ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../../ui/form';
import { FormLabel } from '../field-label';

export type MultiCheckboxOptionValue = string;
export type MultiCheckboxOption = {
  id: string | number;
  name: string;
  label: string;
  value: MultiCheckboxOptionValue;
};
export type MultiCheckboxOptions = MultiCheckboxOption[];
export type MultiCheckboxProps = Omit<React.ComponentProps<typeof Checkbox>, 'onChange'>;
export type MultiCheckboxFieldProps<Schema extends FieldValues> = MultiCheckboxProps & {
  name: FieldPath<Schema>;
  control: Control<Schema>;
  label?: string;
  className?: string;
  options: MultiCheckboxOptions;
  description?: React.ReactNode;
  markAsRequired?: boolean;
  tooltip?: string;
};

export function MultiCheckboxFieldComponent<Schema extends FieldValues>({
  name,
  label,
  tooltip,
  control,
  className,
  options,
  description,
  markAsRequired,
  ...rest
}: MultiCheckboxFieldProps<Schema>) {
  return (
    <FormField
      name={name}
      control={control}
      render={() => (
        <FormItem className={className}>
          <div className="mb-4">
            <FormLabel markAsRequired={markAsRequired} tooltip={tooltip}>
              {label}
            </FormLabel>
            {description && <FormDescription className="text-xs">{description}</FormDescription>}
          </div>
          {options.map((item) => (
            <FormField
              key={item.id}
              name={name}
              control={control}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.value}
                    className="flex flex-row items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        className="bg-muted"
                        {...rest}
                        checked={field.value?.includes(item.value)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.value])
                            : field.onChange(
                                field.value?.filter((value: string) => value !== item.value),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage className="font-normal text-xs" />
        </FormItem>
      )}
    />
  );
}

export const MultiCheckboxField = React.memo(MultiCheckboxFieldComponent);
