import { Popover, Text, VStack } from '@expo/ui/swift-ui';
import {
  background,
  clipShape,
  foregroundStyle,
  padding,
} from '@expo/ui/swift-ui/modifiers';

import { useTheme } from '../theme';
import { IOSHost } from './ios-host';
import type { TooltipProps } from './native-types';

export function Tooltip({ content, children, open, onOpenChange }: TooltipProps) {
  const { colors, tokens } = useTheme();
  return (
    <IOSHost>
      <Popover isPresented={open} onIsPresentedChange={onOpenChange} arrowEdge="bottom">
        <Popover.Trigger>{children}</Popover.Trigger>
        <Popover.Content>
          <VStack
            modifiers={[
              padding({ all: tokens.spacing.sm }),
              background(colors.popover),
              clipShape('roundedRectangle', tokens.radius.sm),
            ]}>
            {typeof content === 'string' || typeof content === 'number' ? (
              <Text modifiers={[foregroundStyle(colors.popoverForeground)]}>{String(content)}</Text>
            ) : (
              content
            )}
          </VStack>
        </Popover.Content>
      </Popover>
    </IOSHost>
  );
}

export type { TooltipProps } from './native-types';
