import { countries as countriesList } from 'country-data-list';

export interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
}

export const countries = countriesList.all.filter(
  (country: Country) => country.emoji && country.status !== 'deleted',
);
