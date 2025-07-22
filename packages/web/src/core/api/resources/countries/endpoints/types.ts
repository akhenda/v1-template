export type CountryName = {
  common: string;
  official: string;
  nativeName: Record<string, { official: string; common: string }>;
};

export type CountryTLD = string[];
export type CountryFlag = { png: string; svg: string };
export type CountryMap = { googleMaps: string; openStreetMaps: string };

export type Country = {
  name: CountryName;
  tld: CountryTLD;
  independent: boolean;
  status: string;
  unMember: boolean;
  capital: string[];
  region: string;
  landlocked: boolean;
  area: number;
  flag: string;
  maps: CountryMap;
  population: number;
  fifa: string;
  timezones: string[];
  continents: string[];
  flags: CountryFlag;
};
