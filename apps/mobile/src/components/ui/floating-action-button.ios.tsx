import { Button, HStack, Text } from '@expo/ui/swift-ui';
import {
  background,
  buttonStyle,
  clipShape,
  disabled as disabledModifier,
  frame,
  foregroundStyle,
  padding,
} from '@expo/ui/swift-ui/modifiers';
import { isValidElement } from 'react';

import { useTheme } from '../theme';
import { IOSHost } from './ios-host';
import type { FloatingActionButtonProps } from './native-types';

export function FloatingActionButton({
  children,
  label,
  onPress,
  size = 'medium',
  disabled,
}: FloatingActionButtonProps) {
  const { colors, tokens } = useTheme();
  const dimension =
    size === 'small' ? tokens.control.touchTarget : size === 'large' ? 72 : 56;
  const labelContent = (
    <HStack spacing={tokens.spacing.sm}>
      {isValidElement(children) ? children : null}
      {label ? <Text modifiers={[foregroundStyle(colors.primaryForeground)]}>{label}</Text> : null}
    </HStack>
  );

  return (
    <IOSHost>
      <Button
        onPress={onPress}
        modifiers={[
          buttonStyle('plain'),
          disabledModifier(disabled),
          padding({ horizontal: label ? tokens.spacing.lg : 0 }),
          frame({ minWidth: dimension, height: dimension }),
          background(colors.primary),
          clipShape('capsule'),
        ]}>
        {labelContent}
      </Button>
    </IOSHost>
  );
}

export type { FloatingActionButtonProps } from './native-types';
