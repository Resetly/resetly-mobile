import { ActivityIndicator, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Bounceable } from '@/components/bounceable';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/theme';
import { useTheme } from '@/hooks/use-theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent';
type Size = 'sm' | 'md' | 'lg';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * Primary interactive button. Uses Bounceable for tactile feedback.
 */
export function AppButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  accessibilityLabel,
}: Props) {
  const theme = useTheme();

  const bgColor = {
    primary: theme.primary,
    secondary: theme.backgroundElement,
    ghost: 'transparent',
    accent: theme.accent,
  }[variant];

  const textColor = {
    primary: theme.onPrimary,
    secondary: theme.text,
    ghost: theme.primary,
    accent: theme.onAccent,
  }[variant];

  const paddingVertical = { sm: Spacing.one + 2, md: Spacing.two + 4, lg: Spacing.three }[size];
  const paddingHorizontal = { sm: Spacing.three, md: Spacing.four, lg: Spacing.five }[size];

  return (
    <Bounceable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityRole="button"
      style={[
        styles.base,
        {
          backgroundColor: bgColor,
          paddingVertical,
          paddingHorizontal,
          opacity: disabled || loading ? 0.55 : 1,
          borderWidth: variant === 'ghost' ? 1 : 0,
          borderColor: theme.primary,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <ThemedText
          type={size === 'sm' ? 'small' : 'default'}
          style={{ color: textColor, fontWeight: '600', textAlign: 'center' }}
        >
          {label}
        </ThemedText>
      )}
    </Bounceable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: Spacing.two,
  },
});

