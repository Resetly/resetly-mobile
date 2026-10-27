import { useSettings } from '../settings';

describe('settings store', () => {
  beforeEach(() => {
    useSettings.setState({
      hapticsEnabled: true,
      colorSchemePreference: 'system',
      onboardingCompleted: false,
    });
  });

  it('toggles haptics', () => {
    expect(useSettings.getState().hapticsEnabled).toBe(true);
    useSettings.getState().setHapticsEnabled(false);
    expect(useSettings.getState().hapticsEnabled).toBe(false);
  });

  it('updates color scheme preference', () => {
    expect(useSettings.getState().colorSchemePreference).toBe('system');
    useSettings.getState().setColorSchemePreference('dark');
    expect(useSettings.getState().colorSchemePreference).toBe('dark');
  });

  it('marks onboarding complete', () => {
    expect(useSettings.getState().onboardingCompleted).toBe(false);
    useSettings.getState().setOnboardingCompleted(true);
    expect(useSettings.getState().onboardingCompleted).toBe(true);
  });
});
