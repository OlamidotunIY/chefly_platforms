import Storage from 'expo-sqlite/kv-store';

export const ONBOARDING_STORAGE_KEY = 'chefly.has-seen-onboarding';

export async function hasSeenOnboarding(): Promise<boolean> {
  return (await Storage.getItem(ONBOARDING_STORAGE_KEY)) === 'true';
}

export async function markOnboardingComplete(): Promise<void> {
  await Storage.setItem(ONBOARDING_STORAGE_KEY, 'true');
}

export async function resetOnboarding(): Promise<void> {
  await Storage.removeItem(ONBOARDING_STORAGE_KEY);
}
