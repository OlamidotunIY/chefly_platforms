import { Text } from '@expo/ui/swift-ui';
import {
  background,
  clipShape,
  foregroundStyle,
  frame,
  padding,
} from '@expo/ui/swift-ui/modifiers';

import { useTheme } from '../theme';
import { IOSHost } from './ios-host';
import type { BadgeProps } from './native-types';

export function Badge({ children, tone = 'primary' }: BadgeProps) {
  const { colors, tokens } = useTheme();
  const backgroundColor =
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
    <IOSHost>
      <Text
        modifiers={[
          foregroundStyle(contentColor),
          padding({ horizontal: children ? tokens.spacing.sm : tokens.spacing.xs }),
          frame({ minWidth: tokens.spacing.xl, minHeight: tokens.spacing.xl }),
          background(backgroundColor),
          clipShape('capsule'),
        ]}>
        {children == null ? '' : String(children)}
      </Text>
    </IOSHost>
  );
}

export type { BadgeProps } from './native-types';
