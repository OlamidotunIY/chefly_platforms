import { Divider as SwiftDivider } from '@expo/ui/swift-ui';
import { background, frame, padding } from '@expo/ui/swift-ui/modifiers';

import { useTheme } from '../theme';
import { IOSHost } from './ios-host';
import type { DividerProps } from './native-types';

export function Divider({ orientation = 'horizontal', inset = 0 }: DividerProps) {
  const { colors, tokens } = useTheme();
  return (
    <IOSHost>
      <SwiftDivider
        modifiers={[
          ...(orientation === 'horizontal'
            ? [
                frame({ height: tokens.border.hairline }),
                padding({ leading: inset, trailing: inset }),
              ]
            : [
                frame({ width: tokens.border.hairline }),
                padding({ top: inset, bottom: inset }),
              ]),
          background(colors.border),
        ]}
      />
    </IOSHost>
  );
}

export type { DividerProps } from './native-types';
