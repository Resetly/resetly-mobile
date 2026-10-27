import { useTranslation } from 'react-i18next';
import { StyleSheet, Switch, View } from 'react-native';
import Constants from 'expo-constants';

import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/themed-text';
import { AppButton } from '@/components/ui/AppButton';
import { useSettings } from '@/store/settings';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ThemePref = 'system' | 'light' | 'dark';

const THEME_OPTIONS: { label: string; value: ThemePref }[] = [
  { label: 'Follow system', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
];

export default function SettingsScreen() {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    hapticsEnabled,
    setHapticsEnabled,
    colorSchemePreference,
    setColorSchemePreference,
  } = useSettings();

  const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? null;
  const appVersion = Constants.expoConfig?.version ?? '—';

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          {t('settings.title')}
        </ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          {t('settings.subtitle')}
        </ThemedText>
      </View>

      {/* Appearance */}
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
        {t('settings.appearance').toUpperCase()}
      </ThemedText>
      <Card compact>
        <View style={styles.row}>
          <ThemedText type="default">Theme</ThemedText>
          <View style={styles.themeOptions}>
            {THEME_OPTIONS.map((opt) => (
              <AppButton
                key={opt.value}
                label={opt.label}
                onPress={() => setColorSchemePreference(opt.value)}
                variant={colorSchemePreference === opt.value ? 'primary' : 'secondary'}
                size="sm"
              />
            ))}
          </View>
        </View>
      </Card>

      {/* Haptics */}
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
        FEEDBACK
      </ThemedText>
      <Card compact>
        <View style={[styles.row, styles.rowSpaceBetween]}>
          <View style={styles.rowText}>
            <ThemedText type="default">{t('settings.haptics')}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Subtle vibration on interactions
            </ThemedText>
          </View>
          <Switch
            value={hapticsEnabled}
            onValueChange={setHapticsEnabled}
            trackColor={{ false: theme.border, true: theme.accent }}
            thumbColor={theme.onAccent}
            accessibilityLabel={t('settings.haptics')}
          />
        </View>
      </Card>

      {/* Backend / API */}
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
        {t('settings.backendSection').toUpperCase()}
      </ThemedText>
      <Card compact>
        <View style={styles.rowText}>
          <ThemedText type="default">{t('settings.backendUrl')}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={1}>
            {apiUrl ?? t('settings.backendNotConnected')}
          </ThemedText>
        </View>
      </Card>

      {/* App Info */}
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
        ABOUT
      </ThemedText>
      <Card compact>
        <View style={[styles.row, styles.rowSpaceBetween]}>
          <ThemedText type="default">{t('settings.version')}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {appVersion}
          </ThemedText>
        </View>
      </Card>
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
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 0.8,
    marginTop: Spacing.two,
  },
  row: {
    gap: Spacing.two,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowText: {
    gap: 2,
    flex: 1,
  },
  themeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
});

