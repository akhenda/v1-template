import type React from 'react';
import type { ComponentProps } from 'react';
import { memo, useState } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { CalendarIcon } from 'lucide-react';

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
      control={control}
      name={name}
      render={({ field }) => {
        const selected = field.value ? new Date(field.value) : undefined;

        return (
          <FormItem className={cn('flex flex-col', { 'cursor-not-allowed': disabled }, className)}>
            <FormLabel
              className={cn({ 'pointer-events-none': disabled })}
              markAsRequired={markAsRequired}
              tooltip={tooltip}
            >
              {label}
            </FormLabel>
            <Popover onOpenChange={setIsOpen} open={isOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    className={cn(
                      'h-10 w-full bg-muted pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                    disabled={!!disabled}
                    variant="outline"
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
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  captionLayout="dropdown"
                  defaultMonth={selected}
                  endMonth={new Date(new Date().getFullYear(), new Date().getMonth())}
                  mode="single"
                  onDayClick={() => setIsOpen(false)}
                  onSelect={(value) => field.onChange(formatDate(value, 'ISO_8601_DATE', false))}
                  selected={selected}
                  startMonth={new Date(1970, 5)}
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

export const DatePickerField = memo(DatePickerFieldComponent);
