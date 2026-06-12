import { HorizontalDivider, VerticalDivider } from '@expo/ui/jetpack-compose';
import { padding } from '@expo/ui/jetpack-compose/modifiers';

import { useTheme } from '../theme';
import { AndroidHost } from './android-host';
import type { DividerProps } from './native-types';

export function Divider({ orientation = 'horizontal', inset = 0 }: DividerProps) {
  const { colors, tokens } = useTheme();
  const modifiers =
    orientation === 'horizontal' ? [padding(inset, 0, inset, 0)] : [padding(0, inset, 0, inset)];
  return (
    <AndroidHost>
      {orientation === 'horizontal' ? (
        <HorizontalDivider
          color={colors.border}
          modifiers={modifiers}
          thickness={tokens.border.hairline}
        />
      ) : (
        <VerticalDivider
          color={colors.border}
          modifiers={modifiers}
          thickness={tokens.border.hairline}
        />
      )}
    </AndroidHost>
  );
}

export type { DividerProps } from './native-types';
