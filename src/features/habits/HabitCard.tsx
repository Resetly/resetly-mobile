import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import type { Habit } from './types';

interface Props {
  habit: Habit;
}

const CATEGORY_LABEL: Record<string, string> = {
  sleep: 'Sleep',
  nutrition: 'Nutrition',
  movement: 'Movement',
  mindfulness: 'Mindfulness',
  social: 'Social',
  custom: 'Custom',
};

export function HabitCard({ habit }: Props) {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      {/* Colour accent bar */}
      <View style={[styles.accentBar, { backgroundColor: habit.color }]} />

      <View style={styles.content}>
        {/* Header row */}
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            <ThemedText type="smallBold" style={styles.title}>
              {habit.title}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {CATEGORY_LABEL[habit.category]}
            </ThemedText>
          </View>

          {/* Streak badge */}
          <View style={[styles.streakBadge, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="smallBold" style={{ color: habit.color }}>
              {habit.currentStreak}d
            </ThemedText>
          </View>
        </View>

        {/* Description */}
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
          {habit.description}
        </ThemedText>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressLabelRow}>
            <ThemedText type="small" themeColor="textSecondary">
              This week
            </ThemedText>
            <ThemedText type="smallBold">
              {Math.round(habit.weeklyProgress * 100)}%
            </ThemedText>
          </View>
          <ProgressBar progress={habit.weeklyProgress} color={habit.color} />
        </View>

        {/* Today indicator */}
        {habit.completedToday ? (
          <View style={[styles.completedPill, { backgroundColor: `${habit.color}22` }]}>
            <ThemedText type="small" style={{ color: habit.color, fontWeight: '600' }}>
              ✓ Done today
            </ThemedText>
          </View>
        ) : (
          <View style={[styles.completedPill, { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="small" themeColor="textSecondary">
              Pending today
            </ThemedText>
          </View>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  accentBar: {
    width: 4,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  content: {
    flex: 1,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  titleGroup: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  streakBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: 99,
    alignItems: 'center',
  },
  progressSection: {
    gap: Spacing.one,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completedPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two + 2,
    paddingVertical: 3,
    borderRadius: 99,
  },
});

