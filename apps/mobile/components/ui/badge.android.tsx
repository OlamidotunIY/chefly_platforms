import { Badge as ComposeBadge, Text } from '@expo/ui/jetpack-compose';

import { useTheme } from '../theme';
import { AndroidHost } from './android-host';
import type { BadgeProps } from './native-types';

export function Badge({ children, tone = 'primary' }: BadgeProps) {
  const { colors } = useTheme();
  const containerColor =
    tone === 'destructive'
      ? colors.destructive
      : tone === 'secondary'
        ? colors.brandSecondary
        : tone === 'muted'
          ? colors.muted
          : colors.primary;
  const contentColor =
    tone === 'destructive'
      ? colors.destructiveForeground
      : tone === 'muted'
        ? colors.mutedForeground
        : colors.primaryForeground;

  return (
    <AndroidHost>
      <ComposeBadge containerColor={containerColor} contentColor={contentColor}>
        {children == null ? null : <Text>{String(children)}</Text>}
      </ComposeBadge>
    </AndroidHost>
  );
}

export type { BadgeProps } from './native-types';
