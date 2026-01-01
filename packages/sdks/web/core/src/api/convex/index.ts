import { useQueries } from 'convex/react';
import { makeUseQueryWithStatus } from 'convex-helpers/react';
import { useQueries as useQueriesWithCache } from 'convex-helpers/react/cache/hooks';

export { useQueries, useQuery } from 'convex/react';
export {
  useQueries as useQueriesWithCache,
  useQuery as useQueryWithCache,
} from 'convex-helpers/react/cache/hooks';

export const useQueryWithStatus = makeUseQueryWithStatus(useQueries);
export const useQueryWithStatusAndCache = makeUseQueryWithStatus(useQueriesWithCache);
