import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';

import { readThemeMode, writeThemeMode } from './theme-storage';
import {
  colorSchemes,
  tokens,
  type ResolvedTheme,
  type ThemeColors,
  type ThemeMode,
  type ThemeTokens,
} from './tokens';

type ThemeContextValue = {
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setThemeMode: (themeMode: ThemeMode) => void;
  colors: ThemeColors;
  tokens: ThemeTokens;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export type ThemeProviderProps = PropsWithChildren<{
  defaultMode?: ThemeMode;
}>;

export function ThemeProvider({ children, defaultMode = 'system' }: ThemeProviderProps) {
  const deviceTheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultMode);

  useEffect(() => {
    let active = true;

    void readThemeMode().then((storedMode) => {
      if (active && storedMode) {
        setThemeModeState(storedMode);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const setThemeMode = useCallback((nextMode: ThemeMode) => {
    setThemeModeState(nextMode);
    void writeThemeMode(nextMode);
  }, []);

  const resolvedTheme: ResolvedTheme =
    themeMode === 'system' ? (deviceTheme === 'dark' ? 'dark' : 'light') : themeMode;

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeMode,
      resolvedTheme,
      setThemeMode,
      colors: colorSchemes[resolvedTheme],
      tokens,
    }),
    [resolvedTheme, setThemeMode, themeMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
