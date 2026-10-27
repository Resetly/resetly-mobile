import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { AppButton } from '@/components/ui/AppButton';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedText } from '@/components/themed-text';
import { HabitCard } from '@/features/habits/HabitCard';
import { MOCK_HABITS, MOCK_WEEKLY_STATS } from '@/features/habits/mock-data';
import { Spacing } from '@/constants/theme';
import { Radius } from '@/theme';
import { useTheme } from '@/hooks/use-theme';

/** [MOCK] Weekly completion rate computed from MOCK_WEEKLY_STATS. */
const WEEKLY_RATE = MOCK_WEEKLY_STATS.completedThisWeek / MOCK_WEEKLY_STATS.totalThisWeek;

export default function HomeScreen() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <ScreenContainer>
      {/* Greeting */}
      <View style={styles.greeting}>
        <ThemedText type="small" themeColor="textSecondary">
          {t('home.greeting')} 👋
        </ThemedText>
        <ThemedText type="title" style={styles.headline}>
          {t('home.headline')}
        </ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          {t('home.subheadline')}
        </ThemedText>
      </View>

      {/* Primary CTA */}
      <AppButton
        label={t('home.ctaContinue')}
        onPress={() => {/* navigate to habit logging */}}
        variant="primary"
        size="lg"
      />

      {/* Weekly Progress Card */}
      <Card>
        <View style={styles.progressCardInner}>
          <View style={styles.progressCardHeader}>
            <ThemedText type="smallBold">{t('home.weeklyLabel')}</ThemedText>
            <ThemedText type="smallBold" style={{ color: theme.accent }}>
              {Math.round(WEEKLY_RATE * 100)}%
            </ThemedText>
          </View>
          <ProgressBar progress={WEEKLY_RATE} />
          <View style={styles.progressStats}>
            <View style={styles.statItem}>
              <ThemedText type="subtitle" style={[styles.statValue, { color: theme.primary }]}>
                {MOCK_WEEKLY_STATS.completedThisWeek}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                completed
              </ThemedText>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
            <View style={styles.statItem}>
              <ThemedText type="subtitle" style={[styles.statValue, { color: theme.accent }]}>
                {MOCK_WEEKLY_STATS.longestCurrentStreak}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {t('home.streakLabel')}
              </ThemedText>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.border }]} />
            <View style={styles.statItem}>
              <ThemedText type="subtitle" style={[styles.statValue, { color: theme.success }]}>
                {MOCK_WEEKLY_STATS.habitsOnTrack}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                on track
              </ThemedText>
            </View>
          </View>
          {/* Mock data notice */}
          <ThemedText type="small" themeColor="textSecondary" style={styles.mockNotice}>
            {t('common.mockDataNotice')}
          </ThemedText>
        </View>
      </Card>

      {/* Habit List */}
      <SectionHeader title={t('home.habitsSection')} subtitle="Your active routines" />
      {MOCK_HABITS.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}

      {/* Daily Reflection */}
      <View style={[styles.reflectionCard, { backgroundColor: theme.primary, borderRadius: Radius.lg }]}>
        <ThemedText type="smallBold" style={{ color: theme.onPrimary, opacity: 0.7 }}>
          {t('home.reflectionSection')}
        </ThemedText>
        <ThemedText type="default" style={{ color: theme.onPrimary, lineHeight: 26 }}>
          "{t('home.reflectionPrompt')}"
        </ThemedText>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  greeting: {
    gap: Spacing.two,
  },
  headline: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  },
  progressCardInner: {
    gap: Spacing.three,
  },
  progressCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: Spacing.two,
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
  },
  statDivider: {
    width: 1,
    height: 36,
  },
  mockNotice: {
    fontSize: 11,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.6,
  },
  reflectionCard: {
    padding: Spacing.four,
    gap: Spacing.two,
  },
});
