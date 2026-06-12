export type ResolvedTheme = 'light' | 'dark';
export type ThemeMode = ResolvedTheme | 'system';

const sharedColors = {
  brandPrimary: '#00c896',
  primary: '#00c896',
  primaryForeground: '#0f1115',
  ring: '#00c896',
  transparent: 'transparent',
} as const;

export const colorSchemes = {
  light: {
    ...sharedColors,
    background: '#ffffff',
    foreground: '#0f1115',
    card: '#ffffff',
    cardForeground: '#0f1115',
    popover: '#ffffff',
    popoverForeground: '#0f1115',
    brandSecondary: '#ff6b3d',
    brandTertiary: '#e78128',
    secondary: '#f3f5f6',
    secondaryForeground: '#0f1115',
    muted: '#f3f5f6',
    mutedForeground: '#66707a',
    accent: '#e6faf5',
    accentForeground: '#0f1115',
    destructive: '#dc2626',
    destructiveForeground: '#ffffff',
    border: '#e2e6e9',
    input: '#d5dadd',
    overlay: 'rgba(15, 17, 21, 0.42)',
  },
  dark: {
    ...sharedColors,
    background: '#0f1115',
    foreground: '#f8f9fa',
    card: '#15181d',
    cardForeground: '#f8f9fa',
    popover: '#15181d',
    popoverForeground: '#f8f9fa',
    brandSecondary: '#bd5bff',
    brandTertiary: '#fb9d4b',
    secondary: '#1d2128',
    secondaryForeground: '#f8f9fa',
    muted: '#1d2128',
    mutedForeground: '#a0a8b0',
    accent: '#18352f',
    accentForeground: '#f8f9fa',
    destructive: '#f87171',
    destructiveForeground: '#0f1115',
    border: '#292e36',
    input: '#343a43',
    overlay: 'rgba(0, 0, 0, 0.62)',
  },
} as const;

export type ThemeColors = (typeof colorSchemes)[ResolvedTheme];

export const tokens = {
  spacing: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    xxxl: 48,
  },
  radius: {
    none: 0,
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
    full: 999,
  },
  typography: {
    caption: 12,
    body: 16,
    label: 14,
    title: 20,
    headline: 28,
    lineHeightBody: 24,
  },
  control: {
    height: 48,
    compactHeight: 36,
    iconSize: 20,
    touchTarget: 44,
  },
  border: {
    hairline: 1,
    regular: 1,
    strong: 2,
  },
  opacity: {
    disabled: 0.48,
    pressed: 0.72,
  },
} as const;

export type ThemeTokens = typeof tokens;
