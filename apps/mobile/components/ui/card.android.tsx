import {
  Card as ComposeCard,
  ElevatedCard,
  OutlinedCard,
} from '@expo/ui/jetpack-compose';
import { paddingAll } from '@expo/ui/jetpack-compose/modifiers';

import { useTheme } from '../theme';
import { AndroidHost } from './android-host';
import type { CardProps } from './native-types';

export function Card({ children, variant = 'filled' }: CardProps) {
  const { colors, tokens } = useTheme();
  const props = {
    colors: { containerColor: colors.card, contentColor: colors.cardForeground },
    modifiers: [paddingAll(tokens.spacing.lg)],
  };

  return (
    <AndroidHost>
      {variant === 'elevated' ? (
        <ElevatedCard {...props}>{children}</ElevatedCard>
      ) : variant === 'outlined' ? (
        <OutlinedCard {...props} border={{ color: colors.border, width: tokens.border.regular }}>
          {children}
        </OutlinedCard>
      ) : (
        <ComposeCard {...props}>{children}</ComposeCard>
      )}
    </AndroidHost>
  );
}

export type { CardProps } from './native-types';
