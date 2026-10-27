# Resetly Mobile

A premium React Native / Expo app helping users quit unwanted habits, build healthier routines, and track their progress.

> **Status**: Frontend boilerplate — UI, navigation, design system, and API integration layer are set up. The backend is a separate service; the app currently uses mock data for demonstration.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React Native (0.86) + Expo SDK 57 |
| Language | TypeScript (strict type-checking) |
| Navigation | Expo Router (file-based navigation with NativeTabs) |
| Server state | TanStack Query v5 |
| Client state | Zustand v5 + MMKV storage |
| HTTP client | Native `fetch` wrapper (`src/services/api/client.ts`) |
| Styling | `StyleSheet.create` + centralized design tokens |
| Secure storage | `expo-secure-store` |
| i18n | `i18next` + `react-i18next` |
| Testing | `jest-expo` + React Native Testing Library |
| Builds & OTA | EAS Build + EAS Update |

---

## Product Scope & Backend Boundary

Resetly's mobile app is a standalone frontend client.
- The backend is maintained separately and will use PostgreSQL.
- **No** PostgreSQL clients, database schemas, ORMs, or server migrations are in this repository.
- **No** Supabase or Firebase backend services are used.
- The app includes typed endpoint stubs in `src/services/api/` ready for integration once the API server is deployed.
- Realistic mock data is used for habit lists, stats, and progress snapshots, all clearly marked with `[Demo data — not synced with any account]`.

---

## Design System

The app visual identity is calm, modern, and supportive. It uses the `resetly` theme pack (`src/theme/packs/resetly.ts`):

| Token | Light Value | Dark Value | Purpose |
|---|---|---|---|
| `primary` | `#1A2E4A` | `#5A8FBF` | Deep calm navy — anchors trust and focus |
| `accent` | `#3D9E7A` | `#5DCCA9` | Soft teal-green — progress, hope, positive actions |
| `background` | `#F5F7FA` | `#0D1520` | Gentle surface background |
| `backgroundElement` | `#EBF0F7` | `#162032` | Secondary surface / chips / tracks |
| `backgroundSelected` | `#D8E4F0` | `#1E2E45` | Selected states |
| `card` | `#FFFFFF` | `#162032` | Elevated content cards |
| `text` | `#1A2332` | `#E8EDF5` | High-contrast readable typography |
| `textSecondary` | `#5A6A7E` | `#8A9AB5` | Secondary labels, descriptions |
| `success` | `#2D8653` | `#4CC97F` | Completion, positive streaks |
| `warning` | `#D97706` | `#FBBF24` | Reminders, warnings |
| `danger` | `#C8384A` | `#FF6B76` | Destructive actions, missed goals |
| `border` | `#D4DCE8` | `#1E2E45` | Subtle borders and dividers |

All components access colors via `useTheme()` and metrics via static imports (`Spacing`, `Radius`, `Fonts`) from `@/theme`.

---

## Prerequisites (Linux Development)

- **Node.js**: v22+ (verified on v22.22.1)
- **npm**: v9+ (verified on v9.2.0)
- **Android Studio** with Android SDK and an Android Virtual Device (AVD), or a physical Android device connected via USB with USB debugging enabled.
- **Expo account** & **EAS CLI** for cloud builds and OTA updates.

> *Note on iOS*: Local iOS Simulator and Xcode are not available on Linux. Use EAS Build (`npm run build:ios`) to generate iOS binaries in the Expo cloud.

---

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repo-url> resetly-mobile
   cd resetly-mobile
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` to point to your development backend:
   ```env
   # Android emulator (10.0.2.2 maps to host localhost):
   EXPO_PUBLIC_API_URL=http://10.0.2.2:3000

   # Physical Android device (use your development computer's LAN IP):
   # EXPO_PUBLIC_API_URL=http://192.168.1.100:3000
   ```
   > **Security**: `EXPO_PUBLIC_*` variables are embedded into client JavaScript bundles. Never place private keys, database credentials, or backend secrets in `.env*`.

---

## Running the App

### Option A: Android Development Build (Recommended)

Because `react-native-mmkv` is a native C++ module, running with full persistence support requires a development build rather than stock Expo Go.

1. Ensure your Android emulator is booted:
   ```bash
   # Example: start your emulator from command line or via Android Studio Device Manager
   $ANDROID_HOME/emulator/emulator -avd <your-avd-name> &
   ```
2. Build and launch locally:
   ```bash
   npm run android
   ```
3. Or create an installable development build via EAS cloud:
   ```bash
   npx eas-cli@latest build --platform android --profile development
   ```
   Download the `.apk`, drag it onto the emulator, and start the Metro bundler:
   ```bash
   npm start
   ```

### Option B: Physical Android Device

1. Connect device with USB cable.
2. Enable **Developer Options** and **USB Debugging** on your device.
3. Verify connection:
   ```bash
   adb devices
   ```
4. Run:
   ```bash
   npm run android
   ```

### Option C: Web Preview

For rapid layout and typography iteration:
```bash
npm run web
```

---

## Project Structure

```text
resetly-mobile/
├── .env.example             # Template for public environment variables
├── app.json                 # Expo project manifest (identity: Resetly, scheme: resetly)
├── eas.json                 # EAS build and update configurations
├── package.json             # Scripts and dependencies
├── CLAUDE.md                # Agent instruction & architecture rules
├── assets/                  # Icons, splash screen, and tab assets
├── src/
│   ├── app/                 # Expo Router file-based screens
│   │   ├── _layout.tsx      # Root layout (QueryClientProvider, ThemeProvider, AppTabs)
│   │   ├── index.tsx        # Home screen (welcome, daily progress, habit cards, reflection)
│   │   ├── progress.tsx     # Progress screen (weekly completion, streak, history snapshot)
│   │   └── settings.tsx     # Settings screen (theme selector, haptics, API URL status)
│   ├── components/
│   │   ├── app-tabs.tsx     # Native bottom tab bar
│   │   ├── app-tabs.web.tsx # Web fallback tab bar
│   │   ├── bounceable.tsx   # Tactile spring pressable component
│   │   ├── themed-text.tsx  # Typography component with theme tokens
│   │   ├── themed-view.tsx  # Surface container with theme tokens
│   │   └── ui/              # Reusable design system primitives
│   │       ├── AppButton.tsx       # Primary, secondary, ghost, accent buttons
│   │       ├── Card.tsx            # Elevated surface cards
│   │       ├── EmptyState.tsx      # Empty view container
│   │       ├── ErrorState.tsx      # Error view container with retry
│   │       ├── LoadingState.tsx    # Loading indicator container
│   │       ├── ProgressBar.tsx     # Animated progress indicator
│   │       ├── ScreenContainer.tsx # Safe-area aware screen wrapper
│   │       └── SectionHeader.tsx   # Section heading with optional action
│   ├── features/            # Feature domains
│   │   ├── habits/          # Habit types, mock data, HabitCard component
│   │   └── progress/        # Progress types and mock data
│   ├── services/
│   │   └── api/             # API transport layer
│   │       ├── client.ts    # Typed fetch client, auth token injection, ApiError
│   │       └── habits.ts    # Typed habit endpoint stubs
│   ├── store/               # Zustand stores
│   │   └── settings.ts      # Client preferences (haptics, theme, onboarding)
│   ├── theme/               # Centralized design tokens
│   │   ├── index.ts         # Active pack export and useTheme() hook
│   │   ├── types.ts         # ThemeColors and ThemePack contracts
│   │   └── packs/           # Theme packs (resetly.ts, default.ts)
│   ├── constants/           # Spacing, Fonts, Colors
│   ├── hooks/               # use-theme, use-color-scheme
│   ├── locales/             # i18n localization resources (en.json)
│   └── lib/                 # TanStack Query client & MMKV storage adapter
└── tests/
```

---

## Quality Gates & Available Scripts

| Command | Action |
|---|---|
| `npm run typecheck` | Run TypeScript type checks (`tsc --noEmit`) |
| `npm run lint` | Run oxlint linter |
| `npm run lint:fix` | Fix auto-fixable lint issues |
| `npm test` | Run Jest test suite |
| `npm run verify` | Run typecheck, lint, and tests in one step |
| `npm run setup:eas` | Initialize EAS project linking |
| `npm run build:android` | Build production Android app via EAS |
| `npm run build:ios` | Build production iOS app via EAS |
| `npm run update:preview` | Publish OTA update to `preview` channel |
| `npm run update:prod` | Publish OTA update to `production` channel |

---

## EAS Build & OTA Updates

EAS configuration is located in `eas.json`.

### First-Time Setup

1. Install EAS CLI: `npm install -g eas-cli`
2. Log in to Expo: `eas login`
3. Initialize the project: `npm run setup:eas` (links your Expo account and adds `projectId` to `app.json`).

### OTA Updates vs Native Builds

- **OTA Updates (`eas update`)**: Distributes changes to JavaScript, TypeScript, styling, i18n text, and static assets instantly without app store review.
- **Native Builds (`eas build`)**: **Required** when adding/updating native packages (e.g., changes to Gradle, native dependencies like MMKV, camera permissions, or `app.json` plugins). OTA updates cannot modify the underlying native binary.
