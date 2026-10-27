/**
 * Design tokens. Colors come from the active theme pack via `useTheme()`;
 * dimensional tokens (Spacing, Radius, Fonts) are scheme-independent statics.
 *
 * To restyle the whole app, add a pack under `packs/` and change `activePack`.
 */

import { useColorScheme } from '@/hooks/use-color-scheme';

import { resetlyPack } from './packs/resetly';
import type { ThemeColors, ThemePack } from './types';

export const activePack: ThemePack = resetlyPack;

export function useTheme(): ThemeColors {
  const scheme = useColorScheme();
  return scheme === 'dark' ? activePack.dark : activePack.light;
}

export { Fonts, Spacing, BottomTabInset, MaxContentWidth } from '@/constants/theme';

export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  full: 9999,
} as const;

export type { ThemeColors, ThemePack } from './types';
