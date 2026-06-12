import Storage from 'expo-sqlite/kv-store';

const LEGACY_ONBOARDING_STORAGE_KEY = 'chefly.has-seen-onboarding';

export const ONBOARDING_STORAGE_KEY = 'chefly.has-seen-onboarding.v2';

export async function hasSeenOnboarding(): Promise<boolean> {
  return (await Storage.getItem(ONBOARDING_STORAGE_KEY)) === 'true';
}

export async function markOnboardingComplete(): Promise<void> {
  await Storage.setItem(ONBOARDING_STORAGE_KEY, 'true');
}

export async function resetOnboarding(): Promise<void> {
  await Promise.all([
    Storage.removeItem(ONBOARDING_STORAGE_KEY),
    Storage.removeItem(LEGACY_ONBOARDING_STORAGE_KEY),
  ]);
}
