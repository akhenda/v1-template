import * as React from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';

import { isoToEmoji } from './helpers';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

type ComboboxCountryInputProps<T extends Option> = {
  value: T;
  onValueChange: (value: T) => void;
  options: T[];
  renderOption: ({ option, isSelected }: { option: T; isSelected: boolean }) => React.ReactNode;
  renderValue: (option: T) => string;
  emptyMessage: string;
  placeholder?: string;
  className?: string;
};

export function ComboboxCountryInput<T extends Option>({
  value,
  onValueChange,
  options,
  renderOption,
  renderValue,
  placeholder,
  emptyMessage,
}: ComboboxCountryInputProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          className="inline-flex h-10 items-center justify-between self-start rounded-md border border-stone-200 bg-white px-4 py-2 font-medium text-base ring-offset-white transition-colors hover:bg-stone-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          type="button"
        >
          {value.value ? isoToEmoji(value.value) : 'Select option...'}
          <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-75 p-2 pb-2">
        <Command>
          <CommandInput className="h-9" placeholder={placeholder} />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandList>
            <CommandGroup className="mt-2 h-full max-h-48 overflow-auto p-0 [&_div[cmdk-group-items]]:flex [&_div[cmdk-group-items]]:flex-col [&_div[cmdk-group-items]]:gap-1">
              {options.map((option) => {
                const isSelected = value.value === option.value;

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      onValueChange(option);
                      setOpen(false);
                    }}
                    value={renderValue(option)}
                  >
                    {renderOption({ option, isSelected })}
                    {isSelected ? <Check className="mr-2 ml-auto h-4 w-4" /> : null}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
