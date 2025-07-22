import type { Planet } from './planets.types';

export type Transformation = { id: number; name: string; image: string; ki: string };

export type Character = {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
  originPlanet: Planet;
  transformations: Transformation[];
};

export type Gender = 'Male' | 'Female' | 'Unknown';
export type CharacterListItem = Omit<Character, 'transformations' | 'originPlanet'>;
export type CharacterList = CharacterListItem[];

export type Race =
  | 'Human'
  | 'Saiyan'
  | 'Namekian'
  | 'Majin'
  | 'Frieza Race'
  | 'Android'
  | 'Jiren Race'
  | 'God'
  | 'Angel'
  | 'Evil'
  | 'Nucleico'
  | 'Nucleico benigno'
  | 'Unknown';

export type Affiliation =
  | 'Z Fighter'
  | 'Red Ribbon Army'
  | 'Namekian Warrior'
  | 'Freelancer'
  | 'Army of Frieza'
  | 'Pride Troopers'
  | 'Assistant of Vermoud'
  | 'God'
  | 'Assistant of Beerus'
  | 'Villain'
  | 'Other';

export type CharacterFilters = {
  affiliation?: Affiliation;
  gender?: Gender;
  name?: string;
  race?: Race;
};
