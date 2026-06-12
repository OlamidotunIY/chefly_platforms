import type { ButtonProps as ExpoButtonProps } from '@expo/ui';
import { Button as SwiftUIButton } from '@expo/ui/swift-ui';
import {
  buttonStyle,
  controlSize,
  disabled as disabledModifier,
  font,
  frame,
  foregroundColor,
  padding,
  tint,
  underline,
} from '@expo/ui/swift-ui/modifiers';

import { useTheme } from '../theme';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'link';
export type ButtonContentPadding =
  | number
  | {
      horizontal?: number;
      vertical?: number;
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };

export type ButtonProps = Omit<ExpoButtonProps, 'variant'> & {
  contentPadding?: ButtonContentPadding;
  fullWidth?: boolean;
  height?: number;
  variant?: ButtonVariant;
};

export function Button({
  children,
  contentPadding,
  disabled,
  fullWidth = false,
  height,
  hidden,
  label,
  modifiers = [],
  onPress,
  variant = 'filled',
}: ButtonProps) {
  const { colors, tokens } = useTheme();

  if (hidden) {
    return null;
  }

  const style =
    variant === 'filled'
      ? 'borderedProminent'
      : variant === 'outlined'
        ? 'bordered'
        : 'plain';
  const isLink = variant === 'link';
  const labelColor =
    variant === 'filled'
      ? colors.primaryForeground
      : variant === 'outlined'
        ? colors.foreground
        : colors.primary;

  return (
    <SwiftUIButton
      label={!children ? label : undefined}
      modifiers={[
        buttonStyle(style),
        controlSize('large'),
        tint(colors.primary),
        foregroundColor(labelColor),
        font({
          size: isLink ? tokens.typography.body : tokens.typography.title,
          weight: 'semibold',
        }),
        ...(isLink
          ? [underline({ isActive: true, pattern: 'solid', color: colors.primary })]
          : []),
        ...(contentPadding != null
          ? [
              padding(
                typeof contentPadding === 'number'
                  ? { all: contentPadding }
                  : {
                      horizontal: contentPadding.horizontal,
                      vertical: contentPadding.vertical,
                      top: contentPadding.top,
                      trailing: contentPadding.right,
                      bottom: contentPadding.bottom,
                      leading: contentPadding.left,
                    },
              ),
            ]
          : []),
        disabledModifier(Boolean(disabled)),
        ...(fullWidth || height != null
          ? [frame({ maxWidth: fullWidth ? Infinity : undefined, height })]
          : []),
        ...modifiers,
      ]}
      onPress={disabled ? undefined : onPress}>
      {children as React.ReactElement | undefined}
    </SwiftUIButton>
  );
}
