export type Planet = {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
};

export type PlanetFilters = { name?: string; isDestroyed?: boolean };
