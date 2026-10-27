/**
 * Theme pack contract. Every pack implements this shape.
 * Swapping the app's look is a one-line change in `src/theme/index.ts`.
 */

export interface ThemeColors {
  text: string;
  textSecondary: string;
  background: string;
  backgroundElement: string;
  backgroundSelected: string;
  primary: string;
  onPrimary: string;
  /** Accent color for progress indicators and positive actions. */
  accent: string;
  onAccent: string;
  danger: string;
  warning: string;
  success: string;
  border: string;
  /** Card surface color (may differ from backgroundElement). */
  card: string;
  onCard: string;
}

export interface ThemePack {
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
}
