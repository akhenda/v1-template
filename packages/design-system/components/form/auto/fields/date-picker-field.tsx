import { CalendarIcon } from 'lucide-react';
import React, { type ComponentProps, useState } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { formatDate } from '@repo/date';

import { cn } from '../../../../lib/utils';
import { Button } from '../../../ui/button';
import { Calendar } from '../../../ui/calendar';
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '../../../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';
import { FormLabel } from '../field-label';

export type DatePickerProps = ComponentProps<typeof Calendar>;

export type DatePickerFieldProps<Schema extends FieldValues> = {
  name: FieldPath<Schema>;
  control: Control<Schema>;
  label?: string;
  className?: string;
  placeholder?: string;
  description?: React.ReactNode;
  markAsRequired?: boolean;
  tooltip?: string;
  disabled?: boolean | null;
  startMonth?: DatePickerProps['startMonth'];
  endMonth?: DatePickerProps['endMonth'];
};

export function DatePickerFieldComponent<Schema extends FieldValues>({
  name,
  label,
  tooltip,
  control,
  disabled,
  className,
  placeholder,
  description,
  markAsRequired,
  ...rest
}: DatePickerFieldProps<Schema>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => {
        const selected = field.value ? new Date(field.value) : undefined;

        return (
          <FormItem className={cn('flex flex-col', { 'cursor-not-allowed': disabled }, className)}>
            <FormLabel
              markAsRequired={markAsRequired}
              tooltip={tooltip}
              className={cn({ 'pointer-events-none': disabled })}
            >
              {label}
            </FormLabel>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    disabled={!!disabled}
                    className={cn(
                      'h-10 w-full bg-muted pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? (
                      formatDate(field.value, 'LONG_DATE', false)
                    ) : (
                      <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selected}
                  captionLayout="dropdown"
                  onSelect={(value) => field.onChange(formatDate(value, 'ISO_8601_DATE', false))}
                  onDayClick={() => setIsOpen(false)}
                  startMonth={new Date(1970, 5)}
                  endMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
                  defaultMonth={selected}
                  {...rest}
                />
              </PopoverContent>
            </Popover>
            <FormMessage className="font-normal text-xs" />
            {description && <FormDescription className="text-xs">{description}</FormDescription>}
          </FormItem>
        );
      }}
    />
  );
}

export const DatePickerField = React.memo(DatePickerFieldComponent);
