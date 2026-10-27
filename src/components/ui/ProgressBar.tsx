import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';

import { Radius } from '@/theme';
import { useTheme } from '@/hooks/use-theme';

interface Props {
  /** Value between 0 and 1. */
  progress: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
  /** Override the fill colour. Defaults to theme.accent. */
  color?: string;
  accessibilityLabel?: string;
}

/**
 * Animated horizontal progress bar.
 */
export function ProgressBar({ progress, height = 8, style, color, accessibilityLabel }: Props) {
  const theme = useTheme();
  const width = useSharedValue(0);

  useEffect(() => {
    width.set(withSpring(Math.min(Math.max(progress, 0), 1), { damping: 20, stiffness: 120 }));
  }, [progress, width]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value * 100}%`,
  }));

  return (
    <View
      style={[styles.track, { height, backgroundColor: theme.backgroundElement }, style]}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel ?? `${Math.round(progress * 100)}% complete`}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(progress * 100) }}
    >
      <Animated.View
        style={[
          styles.fill,
          { height, backgroundColor: color ?? theme.accent },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    borderRadius: Radius.full,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    borderRadius: Radius.full,
  },
});

