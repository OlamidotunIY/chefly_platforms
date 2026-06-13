import * as SecureStore from 'expo-secure-store';

const LEGACY_ONBOARDING_STORAGE_KEY = 'chefly.has-seen-onboarding';

export const ONBOARDING_STORAGE_KEY = 'chefly.has-seen-onboarding.v2';

export async function hasSeenOnboarding(): Promise<boolean> {
  return (await SecureStore.getItemAsync(ONBOARDING_STORAGE_KEY)) === 'true';
}

export async function markOnboardingComplete(): Promise<void> {
  await SecureStore.setItemAsync(ONBOARDING_STORAGE_KEY, 'true');
}

export async function resetOnboarding(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(ONBOARDING_STORAGE_KEY),
    SecureStore.deleteItemAsync(LEGACY_ONBOARDING_STORAGE_KEY),
  ]);
}
