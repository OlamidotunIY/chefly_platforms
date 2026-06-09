import Storage from 'expo-sqlite/kv-store';

export const ONBOARDING_KEY = 'chefly.has-seen-onboarding';

export async function hasSeenOnboarding() {
  return (await Storage.getItem(ONBOARDING_KEY)) === 'true';
}

export async function markOnboardingComplete() {
  await Storage.setItem(ONBOARDING_KEY, 'true');
}
