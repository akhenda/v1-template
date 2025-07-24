import React from 'react';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';

import { cn } from '../../../../lib/utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form';
import { Switch } from '../../../ui/switch';

export type SwitchProps = Omit<React.ComponentProps<typeof Switch>, 'onChange'>;

export type SwitchFieldProps<Schema extends FieldValues> = SwitchProps & {
  name: FieldPath<Schema>;
  control: Control<Schema>;
  className?: string;
  label?: string;
  description?: React.ReactNode;
};

export function SwitchFieldComponent<Schema extends FieldValues>({
  name,
  label,
  control,
  className,
  description,
  ...rest
}: SwitchFieldProps<Schema>) {
  const defaultValue = false as FieldPathValue<Schema, typeof name>;

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex flex-row items-center justify-between rounded-lg border bg-muted p-4',
            className,
          )}
        >
          <div className="m-0">
            <FormLabel className="text-base">{label}</FormLabel>
            {description && <FormDescription className="text-xs">{description}</FormDescription>}
            <FormMessage className="mt-1 text-xs" />
          </div>
          <FormControl>
            <Switch
              className="mb-0 data-[state=unchecked]:bg-accent"
              {...rest}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export const SwitchField = React.memo(SwitchFieldComponent);
