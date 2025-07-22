import type { PropsWithChildren, ReactNode } from 'react';

import type { Icon } from './components';

export type DynamicRouteProps<T extends string = 'id'> = {
  params: Record<T, string>;
};
export type LayoutProps<T extends string | never = never> = PropsWithChildren<Record<T, ReactNode>>;
export type SearchParam = string | string[] | undefined;
export type SearchParamProps<T extends string> = {
  searchParam: SearchParams<T>;
};
export type SearchParams<T extends string> = { [P in T]: SearchParam };

export type Route = {
  path: string;
  label: string;
  Icon: Icon;
  description?: string;
  subRoutes?: Route[];
};
