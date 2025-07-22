'use client';

import { useEffect } from 'react';

import {
  type InfiniteData,
  keepPreviousData,
  type QueryKey,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { getDragonBallPlanets, type Page, type Planet } from '../endpoints';

const QUERY_KEY = 'planets';

export function getQueryKey(page?: number) {
  if (page === undefined) return [QUERY_KEY];

  return [QUERY_KEY, page];
}

export function useGetPlanets(page: number) {
  const query = useQuery<Page<Planet> | undefined>({
    queryKey: getQueryKey(page),
    queryFn: ({ signal }) => getDragonBallPlanets(page, { isDestroyed: false }, { signal }),
    placeholderData: keepPreviousData,
  });

  // Prefetch the next page!
  const queryClient = useQueryClient();

  useEffect(() => {
    if (query.data?.links.next) {
      queryClient.prefetchQuery({
        queryKey: getQueryKey(page + 1),
        queryFn: ({ signal }) => getDragonBallPlanets(page + 1, { isDestroyed: false }, { signal }),
      });
    }
  }, [query.data, page, queryClient]);

  return query;
}

export function useGetInfinitePlanets() {
  const query = useInfiniteQuery<
    Page<Planet> | undefined,
    Error,
    InfiniteData<Page<Planet>, number>,
    QueryKey,
    number
  >({
    queryKey: getQueryKey(),
    queryFn: ({ signal, pageParam }) => getDragonBallPlanets(pageParam, {}, { signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.links.next ? lastPage.meta.currentPage + 1 : undefined;
    },
  });

  return query;
}
