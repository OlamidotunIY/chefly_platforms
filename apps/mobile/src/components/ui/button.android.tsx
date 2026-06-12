import type { ButtonProps as ExpoButtonProps } from '@expo/ui';
import {
  Button as ComposeButton,
  OutlinedButton,
  Shape,
  Text as ComposeText,
  TextButton,
} from '@expo/ui/jetpack-compose';
import {
  fillMaxWidth,
  height as heightModifier,
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
  const content = children ?? (
    <ComposeText
      color={labelColor}
      style={{
        fontSize: isLink ? tokens.typography.body : tokens.typography.title,
        fontWeight: isLink ? '600' : '700',
        textDecoration: isLink ? 'underline' : 'none',
      }}>
      {label ?? ''}
    </ComposeText>
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
      topStart: tokens.radius.md,
      topEnd: tokens.radius.md,
      bottomStart: tokens.radius.md,
      bottomEnd: tokens.radius.md,
    },
  });
  const commonProps = {
    enabled: !disabled,
    modifiers: [
      ...(modifiers ?? []),
      ...(fullWidth ? [fillMaxWidth()] : []),
      ...(height != null ? [heightModifier(height)] : []),
    ],
    onClick: disabled ? undefined : onPress,
    shape,
    contentPadding: resolvedContentPadding,
  };

  if (variant === 'outlined') {
    return (
      <OutlinedButton
        {...commonProps}
        colors={{
          containerColor: colors.transparent,
          contentColor: colors.foreground,
        }}>
        {content}
      </OutlinedButton>
    );
  }

  if (variant === 'text' || variant === 'link') {
    return (
      <TextButton
        {...commonProps}
        colors={{
          containerColor: colors.transparent,
          contentColor: colors.primary,
        }}>
        {content}
      </TextButton>
    );
  }

  return (
    <ComposeButton
      {...commonProps}
      colors={{
        containerColor: colors.primary,
        contentColor: colors.primaryForeground,
        disabledContainerColor: colors.muted,
        disabledContentColor: colors.mutedForeground,
      }}>
      {content}
    </ComposeButton>
  );
}
