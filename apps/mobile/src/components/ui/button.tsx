import { Button as ExpoButton, type ButtonProps as ExpoButtonProps } from '@expo/ui';

import { useTheme } from '../theme';
import { mergeUniversalStyle } from './style';

export type ButtonProps = ExpoButtonProps;

export function Button({ style, variant = 'filled', ...props }: ButtonProps) {
  const { colors, tokens } = useTheme();
  const variantStyle =
    variant === 'filled'
      ? { backgroundColor: colors.primary }
      : variant === 'outlined'
        ? { backgroundColor: colors.background, borderColor: colors.border, borderWidth: 1 }
        : { backgroundColor: colors.transparent };

  return (
    <ExpoButton
      variant={variant}
      style={mergeUniversalStyle(
        {
          borderRadius: tokens.radius.md,
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.md,
          ...variantStyle,
        },
        style,
      )}
      {...props}
    />
  );
}
