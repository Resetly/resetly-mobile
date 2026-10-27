/**
 * Settings store — client-only preferences persisted via MMKV.
 * Server data does NOT belong here; use TanStack Query for that.
 * Sensitive values (auth tokens) belong in expo-secure-store, not MMKV.
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { mmkvStorage } from '@/lib/storage';

type ColorSchemePreference = 'system' | 'light' | 'dark';

interface SettingsState {
  hapticsEnabled: boolean;
  setHapticsEnabled: (enabled: boolean) => void;
  colorSchemePreference: ColorSchemePreference;
  setColorSchemePreference: (pref: ColorSchemePreference) => void;
  onboardingCompleted: boolean;
  setOnboardingCompleted: (done: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      hapticsEnabled: true,
      setHapticsEnabled: (enabled) => set({ hapticsEnabled: enabled }),
      colorSchemePreference: 'system',
      setColorSchemePreference: (pref) => set({ colorSchemePreference: pref }),
      onboardingCompleted: false,
      setOnboardingCompleted: (done) => set({ onboardingCompleted: done }),
    }),
    {
      name: 'settings',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
