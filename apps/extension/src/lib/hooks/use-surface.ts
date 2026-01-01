import { useMemo } from 'react';

import type { Surface } from '../surface';
import { detectSurface } from '../surface';

export function useSurface(): Surface {
  return useMemo(() => detectSurface(), []);
}

export const useIsPopupSurface = () => useSurface() === 'popup';
export const useIsSidepanelSurface = () => useSurface() === 'sidepanel';
export const useIsOptionsSurface = () => useSurface() === 'options';
export const useIsDevtoolsSurface = () => useSurface() === 'devtools';
export const useIsUnknownSurface = () => useSurface() === 'unknown';
