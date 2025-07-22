export type PageMeta = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

export type PageLinks = { first: string; previous: string; next: string; last: string };
export type Page<T> = { items: T[]; meta: PageMeta; links: PageLinks };
