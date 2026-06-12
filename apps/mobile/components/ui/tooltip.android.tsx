import { Text, TooltipBox } from '@expo/ui/jetpack-compose';

import { useTheme } from '../theme';
import { AndroidHost } from './android-host';
import type { TooltipProps } from './native-types';

export function Tooltip({ content, children }: TooltipProps) {
  const { colors } = useTheme();
  return (
    <AndroidHost>
      <TooltipBox>
        <TooltipBox.PlainTooltip
          containerColor={colors.popover}
          contentColor={colors.popoverForeground}>
          {typeof content === 'string' || typeof content === 'number' ? (
            <Text>{String(content)}</Text>
          ) : (
            content
          )}
        </TooltipBox.PlainTooltip>
        {children}
      </TooltipBox>
    </AndroidHost>
  );
}

export type { TooltipProps } from './native-types';
