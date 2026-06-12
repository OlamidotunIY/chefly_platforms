import { Host as ExpoHost, type UniversalHostProps } from '@expo/ui';

import { useTheme } from '../theme';

export type HostProps = UniversalHostProps;

export function Host({ style, colorScheme, ...props }: HostProps) {
  const { colors, resolvedTheme } = useTheme();

  return (
    <ExpoHost
      colorScheme={colorScheme ?? resolvedTheme}
      style={[{ backgroundColor: colors.background }, style]}
      {...props}
    />
  );
}
