import Storage from 'expo-sqlite/kv-store';

import type { ThemeMode } from './tokens';

const THEME_MODE_KEY = 'chefly.theme-mode';

export async function readThemeMode(): Promise<ThemeMode | null> {
  const value = await Storage.getItem(THEME_MODE_KEY);
  return value === 'light' || value === 'dark' || value === 'system' ? value : null;
}

export async function writeThemeMode(themeMode: ThemeMode): Promise<void> {
  await Storage.setItem(THEME_MODE_KEY, themeMode);
}
