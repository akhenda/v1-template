'use client';

import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CharacterListItem, Page } from '../endpoints';
import { updateDragonBallCharacterDescription } from '../endpoints';

import * as GetCharacters from './use-get-characters';

export function useUpdateCharacter(page: number) {
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  const getQueryData = queryClient.getQueryData<Page<CharacterListItem>>;

  return useMutation({
    mutationFn: ({ characterId, description }: { characterId: number; description: string }) =>
      updateDragonBallCharacterDescription(characterId, description),
    onMutate: async ({ characterId }: { characterId: number; description: string }) => {
      ongoingMutationCount.current += 1;

      await queryClient.cancelQueries({ queryKey: GetCharacters.getQueryKey() });

      const currentPage = getQueryData(GetCharacters.getQueryKey(page));
      const nextPage = getQueryData(GetCharacters.getQueryKey(page + 1));

      if (!currentPage) return;

      const newItems = currentPage.items.filter(({ id }) => id !== characterId);

      if (nextPage?.items.length) {
        const lastCharacterOnPage = currentPage.items.at(-1);

        if (lastCharacterOnPage) {
          const indexOnNextPage = nextPage.items.findIndex(
            (character) => character.id === lastCharacterOnPage.id,
          );
          const nextCharacter = nextPage.items[indexOnNextPage + 1];

          if (nextCharacter) newItems.push(nextCharacter);
        }
      }

      queryClient.setQueryData(GetCharacters.getQueryKey(page), {
        ...currentPage,
        items: newItems,
      });

      return { currentCharactersPage: currentPage };
    },
    onError: (_, __, context) => {
      if (context?.currentCharactersPage) {
        queryClient.setQueryData(GetCharacters.getQueryKey(page), context.currentCharactersPage);
      }
    },
    onSettled: () => {
      ongoingMutationCount.current -= 1;

      if (ongoingMutationCount.current === 0) {
        queryClient.invalidateQueries({ queryKey: GetCharacters.getQueryKey() });
      }
    },
  });
}
