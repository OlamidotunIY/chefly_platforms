import * as SecureStore from 'expo-secure-store';

import type { ThemeMode } from './tokens';

const THEME_MODE_KEY = 'chefly.theme-mode';

export async function readThemeMode(): Promise<ThemeMode | null> {
  const value = await SecureStore.getItemAsync(THEME_MODE_KEY);
  return value === 'light' || value === 'dark' || value === 'system' ? value : null;
}

export async function writeThemeMode(themeMode: ThemeMode): Promise<void> {
  await SecureStore.setItemAsync(THEME_MODE_KEY, themeMode);
}
