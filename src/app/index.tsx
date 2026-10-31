import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Badge, BadgeText } from '@/components/ui/badge';
import { Box } from '@/components/ui/box';
import { useSettings } from '@/store/settings';

export default function HomeScreen() {
  const { hapticsEnabled, setHapticsEnabled } = useSettings();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'Not configured (check .env.local)';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <Box className="items-center gap-2">
          <Badge variant="outline" className="rounded-full px-3 py-1">
            <BadgeText className="text-xs font-semibold">RESETLY MOBILE</BadgeText>
          </Badge>
          <Text style={styles.title}>Welcome to Resetly</Text>
          <Text style={styles.subtitle}>
            Frontend boilerplate is ready. Test your UI, theme, and API setup locally.
          </Text>
        </Box>

        {/* Status Card */}
        <Box className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 gap-4">
          <Text style={styles.cardHeader}>System Status</Text>

          {/* Gluestack UI */}
          <View style={styles.row}>
            <Text style={styles.label}>UI Library</Text>
            <Badge variant="default" className="rounded-full px-2.5">
              <BadgeText className="text-xs">Gluestack UI v2</BadgeText>
            </Badge>
          </View>

          {/* Styling Engine */}
          <View style={styles.row}>
            <Text style={styles.label}>Styling</Text>
            <Badge variant="secondary" className="rounded-full px-2.5">
              <BadgeText className="text-xs">NativeWind v5 / Tailwind</BadgeText>
            </Badge>
          </View>

          {/* API URL */}
          <View style={styles.row}>
            <Text style={styles.label}>API Base URL</Text>
            <Text style={styles.value} numberOfLines={1}>
              {apiUrl}
            </Text>
          </View>

          {/* State / MMKV Storage Test */}
          <View style={styles.row}>
            <Text style={styles.label}>Haptics (MMKV Store)</Text>
            <Pressable
              onPress={() => setHapticsEnabled(!hapticsEnabled)}
              style={[
                styles.toggleButton,
                { backgroundColor: hapticsEnabled ? '#1A2E4A' : '#94A3B8' },
              ]}
            >
              <Text style={styles.toggleText}>
                {hapticsEnabled ? 'Enabled' : 'Disabled'}
              </Text>
            </Pressable>
          </View>
        </Box>

        {/* Getting Started note */}
        <Box className="rounded-xl bg-neutral-100 dark:bg-neutral-800/60 p-4">
          <Text style={styles.footerNote}>
            Start developing your features by editing{' '}
            <Text style={styles.code}>src/app/index.tsx</Text>.
          </Text>
        </Box>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'center',
    gap: 24,
    maxWidth: 540,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 22,
  },
  cardHeader: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    fontSize: 14,
    opacity: 0.8,
  },
  value: {
    fontSize: 13,
    fontWeight: '500',
    maxWidth: 180,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  toggleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  footerNote: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.7,
  },
  code: {
    fontFamily: 'monospace',
    fontWeight: '700',
  },
});
