import i18nIsoCountries from 'i18n-iso-countries';
import enCountries from 'i18n-iso-countries/langs/en.json';
import {
  type CountryCallingCode,
  type E164Number,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
import React, { useMemo, useState } from 'react';
import ReactPhoneInput, { type Country } from 'react-phone-number-input/input';

import { Input } from '../../../ui/input';

import { ComboboxCountryInput } from './combobox';
import { getCountriesOptions, isoToEmoji } from './helpers';

type CountryOption = { value: Country; label: string; indicatif: CountryCallingCode };

i18nIsoCountries.registerLocale(enCountries);

export const PhoneInput = ({
  inputClassName,
  inputContainerClassName,
}: {
  inputClassName?: string;
  inputContainerClassName?: string;
}) => {
  const MemoizedInput = useMemo(() => {
    return function PhoneInput(props: React.ComponentProps<typeof Input>) {
      return (
        <Input className={inputClassName} containerClassName={inputContainerClassName} {...props} />
      );
    };
  }, [inputClassName]);

  const options = getCountriesOptions();

  // You can use a the country of the phone number to set the default country
  const defaultCountry = parsePhoneNumberWithError('+1 747 454 5454')?.country;
  const defaultCountryOption = options.find((option) => option.value === defaultCountry);

  const [country, setCountry] = useState<CountryOption>(defaultCountryOption || options[0]!);
  const [phoneNumber, setPhoneNumber] = useState<E164Number>();

  const onCountryChange = (value: CountryOption) => {
    setPhoneNumber(undefined);
    setCountry(value);
  };

  return (
    <div className="not-prose flex flex-col gap-4">
      <div className="flex gap-2">
        <ComboboxCountryInput
          value={country}
          onValueChange={onCountryChange}
          options={options}
          placeholder="Find your country..."
          renderOption={({ option }) => `${isoToEmoji(option.value)} ${option.label}`}
          renderValue={(option) => option.label}
          emptyMessage="No country found."
        />
        <ReactPhoneInput
          international
          withCountryCallingCode
          country={country.value.toUpperCase() as Country}
          value={phoneNumber}
          inputComponent={MemoizedInput}
          placeholder="Enter phone number"
          className="flex-1"
          onChange={(value) => {
            setPhoneNumber(value);
          }}
        />
      </div>
    </div>
  );
};
