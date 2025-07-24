'use client';

import { SquarePenIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';

import { Button } from '@repo/design-system/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/design-system/components/ui/dialog';

import { FormControl, FormDescription, FormItem, FormMessage } from '../../../ui/form';
import { FormField } from '../../elements';
import { TagInput } from '../../elements/tag-input';
import { FormLabel } from '../field-label';

export type TagInputProps = Omit<React.ComponentProps<typeof TagInput>, 'setTags' | 'value'>;
export type TagInputFieldProps<Schema extends FieldValues> = TagInputProps & {
  name: FieldPath<Schema>;
  control: Control<Schema>;
  label?: string;
  className?: string;
  description?: React.ReactNode;
  markAsRequired?: boolean;
  tooltip?: string;
  allowEdit?: boolean;
};

export type EditTagProps<Schema extends FieldValues> = {
  index: number;
  name: FieldPath<Schema>;
  placeholder: string;
};

export function EditTag<Schema extends FieldValues>({
  index,
  name,
  placeholder,
}: EditTagProps<Schema>) {
  const { setValue, getValues } = useFormContext<Schema>();

  const data = getValues(name)?.at(index);

  const [text, setText] = useState(data ?? '');

  const onSave = () => setValue(name, text);

  const label = name.at(0)?.toUpperCase() + name.slice(1);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePenIcon className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit {label}</DialogTitle>
          <DialogDescription>
            Make changes to your {name}. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <FormField
            id={name}
            label={label}
            value={text}
            onChange={setText}
            placeholder={placeholder}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button size="sm" onClick={onSave}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function TagInputFieldComponent<Schema extends FieldValues>({
  name,
  label,
  tooltip,
  control,
  className,
  placeholder,
  description,
  markAsRequired,
  ...rest
}: TagInputFieldProps<Schema>) {
  const { field } = useController({ name, control });
  const setTags = useCallback((tags: string[]) => field.onChange(tags), [field.onChange]);

  return (
    <FormItem key={`tag-input-field-${name}`} className={className}>
      <FormLabel markAsRequired={markAsRequired} tooltip={tooltip}>
        {label}
      </FormLabel>
      <FormControl>
        <TagInput {...rest} placeholder={placeholder} {...field} setTags={setTags} name={name} />
      </FormControl>
      <FormMessage className="font-normal text-xs" />
      {description && <FormDescription className="text-xs">{description}</FormDescription>}
    </FormItem>
  );
}

export const TagInputField = React.memo(TagInputFieldComponent);
