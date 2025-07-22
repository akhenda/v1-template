import React, { useCallback } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { debounce } from '../../../../lib/debounce';
import { FormControl, FormDescription, FormItem, FormMessage } from '../../../ui/form';
import { CountryDropdown } from '../../elements/country-dropdown';
import { FormLabel } from '../field-label';

export type CountryDropdownProps = Omit<
  React.ComponentProps<typeof CountryDropdown>,
  'onChange' | 'value'
>;

export type CountryDropdownFieldProps<Schema extends FieldValues> = CountryDropdownProps & {
  name: FieldPath<Schema>;
  control: Control<Schema>;
  label?: string;
  className?: string;
  placeholder?: string;
  description?: React.ReactNode;
  markAsRequired?: boolean;
  tooltip?: string;
};

export function CountryDropdownFieldComponent<Schema extends FieldValues>({
  name,
  label,
  tooltip,
  control,
  className,
  placeholder,
  description,
  markAsRequired,
  ...rest
}: CountryDropdownFieldProps<Schema>) {
  // Use useController to get the field object
  const { field } = useController({ name, control });

  // Debounce the onChange handler for the country dropdown
  const debouncedOnChange = useCallback(
    debounce((country) => {
      if (country.alpha2 !== field.value) field.onChange(country.alpha2);
    }, 300),
    [field.value, field.onChange],
  );

  return (
    <FormItem className={className}>
      <FormLabel markAsRequired={markAsRequired} tooltip={tooltip}>
        {label}
      </FormLabel>
      <FormControl>
        <CountryDropdown
          {...rest}
          className="h-10 w-full bg-muted"
          placeholder={placeholder}
          value={field.value}
          onChange={debouncedOnChange}
        />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage className="font-normal text-xs" />
    </FormItem>
  );
}

export const CountryDropdownField = React.memo(CountryDropdownFieldComponent);
