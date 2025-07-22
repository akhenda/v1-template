'use client';

import { SquarePenIcon, X } from 'lucide-react';
import { type ComponentProps, Fragment, type KeyboardEvent, useState } from 'react';
import { type FieldPath, type FieldValues, useFormContext } from 'react-hook-form';

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
import { cn } from '@repo/design-system/lib/utils';

import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';

import { FormField } from './form-field';

type TagInputProps<Schema extends FieldValues> = ComponentProps<typeof Input> & {
  value: string[];
  setTags: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  name?: FieldPath<Schema>;
  allowEdit?: boolean;
};

export type EditTagProps<Schema extends FieldValues> = {
  index: number;
  name: FieldPath<Schema>;
  placeholder?: string;
};

function EditTag<Schema extends FieldValues>({ index, name, placeholder }: EditTagProps<Schema>) {
  const { setValue, getValues } = useFormContext<Schema>();

  const initialText = getValues(name)?.at(index);

  const [text, setText] = useState(initialText ?? '');

  const onSave = () => setValue(`${name}.${index}` as FieldPath<Schema>, text);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquarePenIcon className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Tag</DialogTitle>
          <DialogDescription>
            Make changes to your tag. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <FormField
            id={name}
            label="Tag"
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

export function TagInput<Schema extends FieldValues>({
  value: tags,
  setTags,
  placeholder = 'Type and press Enter',
  className = '',
  error,
  name,
  allowEdit,
  ...rest
}: TagInputProps<Schema>) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();

      if (tags && !tags.includes(inputValue.trim())) setTags([...tags, inputValue.trim()]);

      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className={cn('@container', className)}>
      {Boolean(tags?.length) && (
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Fragment key={index}>
              <Badge
                key={index}
                variant="secondary"
                className="flex max-w-full items-center gap-1 border-0 bg-gradient-to-r from-emerald-200 to-teal-100 py-1 font-normal hover:from-emerald-300 hover:to-teal-200 hover:text-foreground dark:from-zinc-700 dark:to-stone-600 dark:hover:from-zinc-800 dark:hover:to-stone-900 dark:hover:text-white"
              >
                <span className="block flex-1 truncate pr-1">{tag}</span>
                {name && allowEdit && (
                  <EditTag index={index} name={name} placeholder={placeholder} />
                )}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            </Fragment>
          ))}
        </div>
      )}

      <Input
        {...rest}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
}
