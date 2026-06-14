import type { UniversalStyle } from '@expo/ui';
import type { ReactNode } from 'react';

import { useTheme } from '@/components/theme';
import { Column, Text } from '@/components/ui';

export type TabHeaderPosition = 'fixed' | 'inline';

export type TabHeaderProps = {
  children?: ReactNode;
  position?: TabHeaderPosition;
  spacing?: number;
  style?: UniversalStyle;
  subtitle?: string;
  title?: string;
};

export function TabHeader({
  children,
  position = 'inline',
  spacing,
  style,
  subtitle,
  title,
}: TabHeaderProps) {
  const { colors, tokens } = useTheme();
  const hasDefaultContent = Boolean(title || subtitle);
  const positionStyle: UniversalStyle =
    position === 'fixed'
      ? {
          backgroundColor: colors.background,
          paddingBottom: tokens.spacing.md,
        }
      : {};

  return (
    <Column
      spacing={spacing ?? tokens.spacing.xs}
      style={{ ...positionStyle, ...style }}>
      {hasDefaultContent ? (
        <Column spacing={tokens.spacing.xs}>
          {title ? (
            <Text
              textStyle={{
                color: colors.foreground,
                fontSize: tokens.typography.headline,
                fontWeight: '700',
              }}>
              {title}
            </Text>
          ) : null}
          {subtitle ? (
            <Text textStyle={{ color: colors.mutedForeground }}>
              {subtitle}
            </Text>
          ) : null}
        </Column>
      ) : null}
      {children}
    </Column>
  );
}
