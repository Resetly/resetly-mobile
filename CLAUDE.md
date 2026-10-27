# Resetly Mobile

Expo SDK 57 / React Native 0.86 / TypeScript strict. Read the versioned docs at
https://docs.expo.dev/versions/v57.0.0/ before writing native-adjacent code.

## Stack (locked — do not swap without a decision)

- **Navigation**: `expo-router`, file-based routes in `src/app/`.
- **Server state**: TanStack Query. All API data flows through `useQuery`/`useMutation`. Never store API responses in Zustand.
- **Client state**: Zustand, client-only concerns (theme pref, onboarding, UI state). Stores stay small. Example: `src/store/settings.ts`.
- **Transport**: `fetch` via `src/services/api/client.ts` (base URL, auth headers, normalized `ApiError`). No axios.
- **Styling**: `StyleSheet.create` + tokens from `src/theme/`. No styled-components / NativeWind / Unistyles.
- **Storage**: `react-native-mmkv` (`src/lib/storage.ts`) for all key-value cache/prefs — AsyncStorage is banned. `expo-secure-store` for tokens/secrets.
- **i18n**: i18next. Every user-facing string via `t("group.key")`; keys live in `src/locales/en.json` (source of truth).

## Layout

```
src/app/              # expo-router routes only — no business logic
src/components/       # shared UI, one component per file
src/components/ui/    # primitive UI components (Button, Card, ProgressBar…)
src/features/<name>/  # feature code: components, hooks, queries co-located
src/services/api/     # fetch wrapper + typed endpoint functions
src/store/            # Zustand stores
src/theme/            # token packs; change activePack in src/theme/index.ts
src/locales/          # i18n resources
```

- Route files stay thin: compose feature components, no data logic inline.
- Server-state hooks (`useXxxQuery`) live in the feature folder and are the only place endpoint functions are called from UI.

## Theming

- Tokens only — no hex literals, raw font names, or magic spacing in components.
- Colors via `useTheme()`; `Spacing`, `Radius`, `Fonts` are static imports from `@/theme`.
- Every theme pack defines `light` + `dark`; dark mode is required.
- Active pack: `resetly` (in `src/theme/packs/resetly.ts`).
- To add a new pack: create `src/theme/packs/yourPack.ts`, update `src/theme/index.ts`.

## API Integration

- Base URL is read from `EXPO_PUBLIC_API_URL` (see `.env.example`).
- On Android emulators, use `10.0.2.2` instead of `localhost`.
- On physical devices, use your machine's LAN IP.
- Auth tokens are stored in `expo-secure-store` via `getAuthToken` / `setAuthToken`.
- Endpoint stubs live in `src/services/api/` (e.g. `habits.ts`).
- Until the backend is running, screens use mock data from `src/features/*/mock-data.ts`.
  - Mock data is clearly labelled with `/** [MOCK] */` JSDoc and rendered with `[Demo data — not synced with any account]` notices.

## State Management Rules

- **Zustand** (`src/store/`): theme preference, haptics, onboarding flag. Never put server data here.
- **TanStack Query** (`useQuery`/`useMutation`): everything fetched from or sent to the API.
- **MMKV**: backing store for Zustand persistence. Never use AsyncStorage.
- **expo-secure-store**: auth tokens and other secrets only.

## Workflow

- Install native deps with `npx expo install`, never bare `npm i` for Expo-managed packages.
- Verify before finishing: `npm run verify` (typecheck + lint + tests).
- Builds: EAS (`eas.json`; first-time: `npm run setup:eas`). OTA via `npm run update:<channel>`.
- **OTA safe**: JS/TS changes, assets, i18n strings, StyleSheet tweaks.
- **Requires new binary**: new native modules, Expo plugin changes, new permissions, changes to `app.json` plugins array.
- New Architecture is on; don't add libraries incompatible with it.

## Testing Bar

- jest-expo + React Native Testing Library, co-located `__tests__/`, `*.test.ts(x)`.
- E2E & on-device verification: **Argent** (`@swmansion/argent`). Maestro/Detox are banned.
  - Regression E2E flows: `.argent/flows/*.yaml`. Author by live recording (`argent-qa-flows` skill).
  - Replay: `npm run e2e` (smoke).
- New feature = at least one test for its core logic. No brittle snapshots.

## Guardrails

- Secrets never in the repo or bundle — EAS secrets / `EXPO_PUBLIC_*` env for public config only.
- No new global state library, styling system, or HTTP client.
- No PostgreSQL, Supabase, Firebase, or backend server in this repo.
- No fake claims that auth or sync is operational — the backend is a separate service.
- Conventional commits (commitlint enforced).

## Working in This Repo (Agents)

- One-shot check: `npm run verify` (typecheck + lint + tests). Run it before finishing.
- Scaffolding: `npm run gen screen <name>` / `npm run gen feature <name>`.
- Rule files (`AGENTS.md`, `.cursor/rules/`, `.github/copilot-instructions.md`) are GENERATED from `CLAUDE.md` — edit `CLAUDE.md` then run `npm run sync:ai-rules`.
