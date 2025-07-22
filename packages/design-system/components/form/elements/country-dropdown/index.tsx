'use client';

import React, { useCallback, useState, forwardRef, useMemo } from 'react';

// assets
import { CheckIcon, ChevronDown, Globe } from 'lucide-react';

// shadcn
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover';
import { VirtualizedList } from '../../../virtualized';

// utils
import { cn } from '../../../../lib/utils';

// data
import { type Country, countries } from './countries';

// Dropdown props
type CountryDropdownProps = {
  onChange?: (country: Country) => void;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
  className?: string;
};

type CountryDropdownTriggerProps = { selected?: Country; slim?: boolean; placeholder?: string };
type RowItemProps = {
  country: Country;
  onSelect: (country: Country) => void;
  selected?: Country;
  style?: React.CSSProperties;
};

const ITEM_HEIGHT = 35;
const WINDOW_HEIGHT = 250;

const RowItem = React.memo(({ country, onSelect, selected, style }: RowItemProps) => {
  return (
    <CommandItem
      style={style}
      key={country.alpha2}
      className="flex w-full items-center gap-2 rounded-sm"
      onSelect={() => onSelect(country)}
    >
      <div className="flex w-0 flex-grow items-center space-x-2 overflow-hidden">
        <span className="text-2xl">{country.emoji}</span>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">{country.name}</span>
      </div>
      <CheckIcon
        className={cn(
          'ml-auto h-4 w-4 shrink-0',
          country.alpha2 === selected?.alpha2 ? 'opacity-100' : 'opacity-0',
        )}
      />
    </CommandItem>
  );
});
RowItem.displayName = 'RowItem';

const CountryDropdownTrigger = React.memo(
  ({ selected, slim = false, placeholder = 'Select a country' }: CountryDropdownTriggerProps) => {
    if (selected) {
      return (
        <div className="flex w-0 flex-grow items-center gap-2 overflow-hidden">
          <span className="text-2xl">{selected.emoji}</span>
          {!slim && (
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">{selected.name}</span>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        {!slim && <Globe size={20} />}
        <span>{placeholder}</span>
      </div>
    );
  },
);
CountryDropdownTrigger.displayName = 'CountryDropdownTrigger';

const CountryDropdownComponent = (
  {
    onChange,
    value,
    disabled = false,
    placeholder = 'Select a country',
    slim = false,
    className,
    ...props
  }: Omit<CountryDropdownProps, 'defaultValue'> & { value?: string },
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Controlled selected country derived from value prop
  const selected = useMemo(() => {
    if (value && countries) {
      return countries.find((c) => c.alpha2 === value);
    }
    return undefined;
  }, [value]);

  // Filtered list
  const filtered = useMemo(() => {
    return countries.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const handleSelect = useCallback(
    (country: Country) => {
      onChange?.(country);
      setOpen(false);
    },
    [onChange],
  );

  const triggerClasses = cn(
    'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
    slim === true && 'w-20',
    className,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger ref={ref} className={triggerClasses} disabled={disabled} {...props}>
        <CountryDropdownTrigger selected={selected} slim={slim} placeholder={placeholder} />
        <ChevronDown size={16} />
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        collisionPadding={10}
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        <Command shouldFilter={false} className="max-h-[200px] w-full sm:max-h-[270px]">
          <CommandList>
            <div className="sticky top-0 z-10 bg-popover">
              <CommandInput
                value={search}
                onValueChange={setSearch}
                placeholder="Search country..."
              />
            </div>

            {filtered.length === 0 && <CommandEmpty>No country found.</CommandEmpty>}
            {filtered.length > 0 && (
              <CommandGroup>
                <div style={{ height: WINDOW_HEIGHT, width: '100%' }}>
                  <VirtualizedList>
                    {filtered.map((country) => (
                      <RowItem
                        key={country.alpha3}
                        country={country}
                        onSelect={handleSelect}
                        selected={selected}
                        style={{ height: ITEM_HEIGHT }}
                      />
                    ))}
                  </VirtualizedList>
                </div>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const CountryDropdownForwarded = forwardRef(CountryDropdownComponent);
CountryDropdownForwarded.displayName = 'CountryDropdown';
export const CountryDropdown = React.memo(CountryDropdownForwarded);
