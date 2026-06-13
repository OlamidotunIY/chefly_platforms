import type { ButtonProps as ExpoButtonProps } from '@expo/ui';
import {
  Box,
  Button as ComposeButton,
  CircularProgressIndicator,
  OutlinedButton,
  Shape,
  Text as ComposeText,
  TextButton,
} from '@expo/ui/jetpack-compose';
import {
  animateContentSize,
  fillMaxWidth,
  height as heightModifier,
  size as sizeModifier,
  width as widthModifier,
} from '@expo/ui/jetpack-compose/modifiers';

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
  modifiers,
  onPress,
  variant = 'filled',
}: ButtonProps) {
  const { colors, tokens } = useTheme();

  if (hidden) {
    return null;
  }

  const labelColor =
    variant === 'filled'
      ? colors.primaryForeground
      : variant === 'outlined'
        ? colors.foreground
        : colors.primary;
  const isLink = variant === 'link';
  const resolvedHeight = height ?? tokens.control.height;
  const resolvedLoadingWidth = loadingWidth ?? resolvedHeight;
  const resolvedRadius = borderRadius ?? tokens.radius.md;
  const content = loading ? (
    <CircularProgressIndicator
      color={labelColor}
      modifiers={[
        sizeModifier(
          tokens.control.iconSize + tokens.spacing.sm,
          tokens.control.iconSize + tokens.spacing.sm,
        ),
      ]}
      trackColor={colors.transparent}
    />
  ) : (
    children ?? (
      <ComposeText
        color={labelColor}
        style={{
          fontSize: isLink ? tokens.typography.body : tokens.typography.title,
          fontWeight: isLink ? '600' : '700',
          textDecoration: isLink ? 'underline' : 'none',
        }}>
        {label ?? ''}
      </ComposeText>
    )
  );
  const resolvedContentPadding =
    typeof contentPadding === 'number'
      ? {
          start: contentPadding,
          top: contentPadding,
          end: contentPadding,
          bottom: contentPadding,
        }
      : contentPadding
        ? {
            start: contentPadding.left ?? contentPadding.horizontal,
            top: contentPadding.top ?? contentPadding.vertical,
            end: contentPadding.right ?? contentPadding.horizontal,
            bottom: contentPadding.bottom ?? contentPadding.vertical,
          }
        : undefined;
  const shape = Shape.RoundedCorner({
    cornerRadii: {
      topStart: resolvedRadius,
      topEnd: resolvedRadius,
      bottomStart: resolvedRadius,
      bottomEnd: resolvedRadius,
    },
  });
  const commonProps = {
    enabled: !disabled && !loading,
    modifiers: [
      ...(modifiers ?? []),
      animateContentSize(0.8, 420),
      ...(loading
        ? [widthModifier(resolvedLoadingWidth)]
        : fullWidth
          ? [fillMaxWidth()]
          : []),
      heightModifier(resolvedHeight),
    ],
    onClick: disabled || loading ? undefined : onPress,
    shape,
    contentPadding: loading
      ? { start: 0, top: 0, end: 0, bottom: 0 }
      : resolvedContentPadding,
  };

  let button: React.ReactElement;

  if (variant === 'outlined') {
    button = (
      <OutlinedButton
        {...commonProps}
        colors={{
          containerColor: colors.transparent,
          contentColor: colors.foreground,
        }}>
        {content}
      </OutlinedButton>
    );
  } else if (variant === 'text' || variant === 'link') {
    button = (
      <TextButton
        {...commonProps}
        colors={{
          containerColor: colors.transparent,
          contentColor: colors.primary,
        }}>
        {content}
      </TextButton>
    );
  } else {
    button = (
      <ComposeButton
        {...commonProps}
        colors={{
          containerColor: colors.primary,
          contentColor: colors.primaryForeground,
          disabledContainerColor: loading ? colors.primary : colors.muted,
          disabledContentColor: loading
            ? colors.primaryForeground
            : colors.mutedForeground,
        }}>
        {content}
      </ComposeButton>
    );
  }

  return fullWidth || loading ? (
    <Box
      contentAlignment="center"
      modifiers={[fillMaxWidth(), heightModifier(resolvedHeight)]}>
      {button}
    </Box>
  ) : (
    button
  );
}
