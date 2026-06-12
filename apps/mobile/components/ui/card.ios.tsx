import { VStack } from '@expo/ui/swift-ui';
import {
  background,
  border,
  clipShape,
  padding,
  shadow,
} from '@expo/ui/swift-ui/modifiers';

import { useTheme } from '../theme';
import { IOSHost } from './ios-host';
import type { CardProps } from './native-types';

export function Card({ children, variant = 'filled' }: CardProps) {
  const { colors, tokens } = useTheme();
  return (
    <IOSHost>
      <VStack
        alignment="leading"
        modifiers={[
          padding({ all: tokens.spacing.lg }),
          background(colors.card),
          ...(variant === 'outlined'
            ? [border({ color: colors.border, width: tokens.border.regular })]
            : []),
          clipShape('roundedRectangle', tokens.radius.lg),
          ...(variant === 'elevated'
            ? [shadow({ color: colors.overlay, radius: tokens.radius.sm, y: tokens.spacing.xs })]
            : []),
        ]}>
        {children}
      </VStack>
    </IOSHost>
  );
}

export type { CardProps } from './native-types';
