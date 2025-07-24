import { useConvexAuth } from 'convex/react';
import { useQuery } from 'convex-helpers/react/cache/hooks';

import { api } from '@repo/convex/api';

export function useCurrentUser() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const user = useQuery(api.users.current);

  // Combine the authentication state with the user existence check
  return {
    isLoading: isLoading || (isAuthenticated && user === null),
    isAuthenticated: isAuthenticated && user !== null,
  };
}

export function useUser() {
  const user = useQuery(api.users.getUser);

  if (!user) return null;

  return { ...user, avatar: user.avatarUrl };
}

export function useOnboardingComplete() {
  const response = useQuery(api.users.onboardingComplete);

  if (!response) return { onboarded: false, credits: 0 };

  return response;
}
