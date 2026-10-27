import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ThemedText } from '@/components/themed-text';
import { MOCK_PROGRESS } from '@/features/progress/mock-data';
import { Spacing } from '@/constants/theme';
import { Radius } from '@/theme';
import { useTheme } from '@/hooks/use-theme';
import type { WeeklySnapshot } from '@/features/progress/types';

function WeekRow({ snapshot }: { snapshot: WeeklySnapshot }) {
  const theme = useTheme();
  return (
    <View style={styles.weekRow}>
      <ThemedText type="small" themeColor="textSecondary" style={styles.weekLabel}>
        {snapshot.weekLabel}
      </ThemedText>
      <View style={styles.weekBarArea}>
        <ProgressBar progress={snapshot.completionRate} height={6} />
      </View>
      <ThemedText type="smallBold" style={{ color: theme.accent, minWidth: 36, textAlign: 'right' }}>
        {Math.round(snapshot.completionRate * 100)}%
      </ThemedText>
    </View>
  );
}

export default function ProgressScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { currentWeek, history, longestStreak, totalHabitsTracked } = MOCK_PROGRESS;

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          {t('progress.title')}
        </ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          {t('progress.subtitle')}
        </ThemedText>
      </View>

      {/* Current week highlight */}
      <Card>
        <View style={styles.currentWeekInner}>
          <ThemedText type="smallBold">{t('progress.weeklyCompletion')}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {currentWeek.weekLabel}
          </ThemedText>

          {/* Big percentage */}
          <ThemedText
            style={[styles.bigPercent, { color: theme.accent }]}
          >
            {Math.round(currentWeek.completionRate * 100)}%
          </ThemedText>

          <ProgressBar progress={currentWeek.completionRate} height={10} />

          <ThemedText type="small" themeColor="textSecondary" style={{ textAlign: 'center' }}>
            {currentWeek.totalCompleted} of {currentWeek.totalTarget} habits completed
          </ThemedText>
        </View>
      </Card>

      {/* Summary stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border, borderRadius: Radius.lg }]}>
          <ThemedText style={[styles.statNumber, { color: theme.primary }]}>
            {longestStreak}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={{ textAlign: 'center' }}>
            {t('progress.streakSectionTitle')}
          </ThemedText>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border, borderRadius: Radius.lg }]}>
          <ThemedText style={[styles.statNumber, { color: theme.accent }]}>
            {totalHabitsTracked}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={{ textAlign: 'center' }}>
            {t('progress.habitCount')}
          </ThemedText>
        </View>
      </View>

      {/* History */}
      <SectionHeader title={t('progress.historySectionTitle')} />
      <Card>
        <View style={styles.historyList}>
          {history.map((snapshot) => (
            <WeekRow key={snapshot.weekLabel} snapshot={snapshot} />
          ))}
        </View>
      </Card>

      {/* Mock notice */}
      <ThemedText type="small" themeColor="textSecondary" style={styles.mockNotice}>
        [Demo data — not synced with any account]
      </ThemedText>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.two,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
  },
  currentWeekInner: {
    gap: Spacing.three,
    alignItems: 'stretch',
  },
  bigPercent: {
    fontSize: 56,
    fontWeight: '800',
    lineHeight: 64,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  statCard: {
    flex: 1,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.one,
    borderWidth: StyleSheet.hairlineWidth,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 44,
  },
  historyList: {
    gap: Spacing.three,
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  weekLabel: {
    width: 90,
    flexShrink: 0,
  },
  weekBarArea: {
    flex: 1,
  },
  mockNotice: {
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.6,
    fontSize: 11,
    marginBottom: Spacing.three,
  },
});

