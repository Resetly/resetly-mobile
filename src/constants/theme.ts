/**
 * Legacy Colors export for components that reference Colors.light / Colors.dark directly.
 * Prefer useTheme() from `@/theme` in new components.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1A2332',
    background: '#F5F7FA',
    backgroundElement: '#EBF0F7',
    backgroundSelected: '#D8E4F0',
    textSecondary: '#5A6A7E',
  },
  dark: {
    text: '#E8EDF5',
    background: '#0D1520',
    backgroundElement: '#162032',
    backgroundSelected: '#1E2E45',
    textSecondary: '#8A9AB5',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
