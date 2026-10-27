import { ReactNode } from 'react';
import { ScrollView, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  /** Pass true for screens that handle their own scrolling. */
  scrollable?: boolean;
}

/**
 * Root screen wrapper: safe-area insets, background colour, and optional scroll.
 */
export function ScreenContainer({ children, style, contentStyle, scrollable = true }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const paddingBottom = insets.bottom + BottomTabInset + Spacing.four;

  if (!scrollable) {
    return (
      <ScrollView
        scrollEnabled={false}
        style={[{ flex: 1, backgroundColor: theme.background }, style]}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + Spacing.four, paddingBottom },
          contentStyle,
        ]}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={[{ flex: 1, backgroundColor: theme.background }, style]}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.four, paddingBottom },
        contentStyle,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
});

