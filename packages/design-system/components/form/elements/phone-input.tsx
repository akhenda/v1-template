import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';

import { flag } from 'country-emoji';
import { CheckIcon, ChevronsUpDown, PhoneIcon } from 'lucide-react';

import { cn } from '../../../lib/utils';
import { Button } from '../../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../ui/command';
import { Input } from '../../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { VirtualizedList } from '../../virtualized';

type PhoneInputProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'ref'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
    inputClassName?: string;
    inputContainerClassName?: string;
    flagClassName?: string;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
  React.ComponentRef<typeof RPNInput.default>,
  PhoneInputProps
>(
  (
    { className, inputClassName, inputContainerClassName, flagClassName, onChange, ...props },
    ref,
  ) => {
    const MemoizedPhoneInput = React.useCallback(
      (props: React.ComponentProps<typeof InputComponent>) => {
        return (
          <InputComponent
            className={inputClassName}
            containerClassName={inputContainerClassName}
            {...props}
          />
        );
      },
      [inputClassName],
    );

    const MemoizedFlagComponent = React.useCallback(
      (props: React.ComponentProps<typeof FlagComponent>) => {
        return <FlagComponent className={flagClassName} {...props} />;
      },
      [flagClassName],
    );

    return (
      <RPNInput.default
        ref={ref}
        className={cn('flex', className)}
        flagComponent={MemoizedFlagComponent}
        countrySelectComponent={CountrySelect}
        inputComponent={MemoizedPhoneInput}
        smartCaret={false}
        /**
         * Handles the onChange event.
         *
         * react-phone-number-input might trigger the onChange event as undefined
         * when a valid phone number is not entered. To prevent this,
         * the value is coerced to an empty string.
         *
         * @param {E164Number | undefined} value - The entered value
         */
        onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
        {...props}
      />
    );
  },
);
PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & {
    containerClassName?: string;
  }
>(({ className, containerClassName, ...props }, ref) => (
  <Input
    className={cn('rounded-s-none rounded-e-lg', className)}
    containerClassName={containerClassName}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const [search, setSearch] = React.useState('');
  const filtered = React.useMemo(() => {
    return countryList.filter((c) => c.label.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="flex h-10 gap-1 rounded-s-lg rounded-e-none border-r-0 bg-muted px-3 py-2 focus:z-10"
          disabled={disabled}
        >
          <FlagComponent country={selectedCountry} countryName={selectedCountry} />
          <ChevronsUpDown
            className={cn('-mr-2 size-3 opacity-50', disabled ? 'hidden' : 'opacity-50')}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command shouldFilter={false}>
          <CommandList>
            <CommandInput
              value={search}
              onValueChange={setSearch}
              placeholder="Search country..."
            />

            {filtered.length === 0 && <CommandEmpty>No country found.</CommandEmpty>}
            {filtered.length > 0 && (
              <CommandGroup>
                <div style={{ height: 250, width: '100%' }}>
                  <VirtualizedList>
                    {filtered.map(({ value, label }) => (
                      <CountrySelectOption
                        key={value}
                        country={value ?? 'US'}
                        countryName={label}
                        selectedCountry={selectedCountry}
                        onChange={onChange}
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

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
}: CountrySelectOptionProps) => {
  return (
    <CommandItem className="gap-2" onSelect={() => onChange(country)}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-foreground/50 text-sm">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, className }: RPNInput.FlagProps & { className?: string }) => {
  return (
    <span
      className={cn(
        'flex items-center justify-center overflow-hidden rounded-xs text-2xl',
        className,
      )}
    >
      {!country && <PhoneIcon size={20} />}
      {country && flag(country)}
    </span>
  );
};

export { PhoneInput };
