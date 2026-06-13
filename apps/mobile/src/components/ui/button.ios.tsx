import type { ButtonProps as ExpoButtonProps } from '@expo/ui';
import {
  Button as SwiftUIButton,
  ProgressView,
  ZStack,
} from '@expo/ui/swift-ui';
import {
  Animation,
  animation,
  buttonBorderShape,
  buttonStyle,
  controlSize,
  disabled as disabledModifier,
  font,
  frame,
  foregroundColor,
  padding,
  progressViewStyle,
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
  borderRadius?: number;
  contentPadding?: ButtonContentPadding;
  fullWidth?: boolean;
  height?: number;
  loading?: boolean;
  loadingWidth?: number;
  variant?: ButtonVariant;
};

export function Button({
  borderRadius,
  children,
  contentPadding,
  disabled,
  fullWidth = false,
  height,
  hidden,
  label,
  loading = false,
  loadingWidth,
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
  const resolvedHeight = height ?? tokens.control.height;
  const resolvedLoadingWidth = loadingWidth ?? resolvedHeight;
  const resolvedRadius = borderRadius ?? tokens.radius.md;
  const labelColor =
    variant === 'filled'
      ? colors.primaryForeground
      : variant === 'outlined'
        ? colors.foreground
        : colors.primary;

  const button = (
    <SwiftUIButton
      label={!children && !loading ? label : undefined}
      modifiers={[
        buttonStyle(style),
        buttonBorderShape('roundedRectangle', resolvedRadius),
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
        ...(contentPadding != null && !loading
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
        disabledModifier(Boolean(disabled || loading)),
        frame({
          width: loading ? resolvedLoadingWidth : undefined,
          maxWidth: !loading && fullWidth ? Infinity : undefined,
          height: resolvedHeight,
        }),
        animation(Animation.easeInOut({ duration: 0.28 }), loading),
        ...modifiers,
      ]}
      onPress={disabled || loading ? undefined : onPress}>
      {loading ? (
        <ProgressView
          modifiers={[
            progressViewStyle('circular'),
            tint(labelColor),
            frame({
              width: tokens.control.iconSize + tokens.spacing.sm,
              height: tokens.control.iconSize + tokens.spacing.sm,
            }),
          ]}
        />
      ) : (
        children as React.ReactElement | undefined
      )}
    </SwiftUIButton>
  );

  return fullWidth || loading ? (
    <ZStack
      alignment="center"
      modifiers={[frame({ maxWidth: Infinity, height: resolvedHeight })]}>
      {button}
    </ZStack>
  ) : (
    button
  );
}
