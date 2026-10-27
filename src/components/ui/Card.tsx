import { type ReactNode } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle, View } from 'react-native';

import { Radius, Spacing } from '@/theme';
import { useTheme } from '@/hooks/use-theme';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Reduce internal padding. */
  compact?: boolean;
}

/**
 * Surface card with theme-aware background and subtle border.
 */
export function Card({ children, style, compact = false }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          padding: compact ? Spacing.three : Spacing.four,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

