import { TextInput as ExpoTextInput, type TextInputProps as ExpoTextInputProps } from '@expo/ui';

import { useTheme } from '../theme';
import { mergeUniversalStyle } from './style';

export type TextInputProps = ExpoTextInputProps;

export function TextInput({ style, textStyle, ...props }: TextInputProps) {
  const { colors, tokens } = useTheme();
  return (
    <ExpoTextInput
      cursorColor={colors.primary}
      placeholderTextColor={colors.mutedForeground}
      selectionColor={colors.accent}
      style={mergeUniversalStyle(
        {
          backgroundColor: colors.background,
          borderColor: colors.input,
          borderRadius: tokens.radius.md,
          borderWidth: tokens.border.regular,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
        },
        style,
      )}
      textStyle={{ color: colors.foreground, fontSize: tokens.typography.body, ...textStyle }}
      {...props}
    />
  );
}
