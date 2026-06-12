import { Text as ExpoText, type TextProps as ExpoTextProps } from '@expo/ui';

import { useTheme } from '../theme';

export type TextProps = ExpoTextProps;

export function Text({ textStyle, ...props }: TextProps) {
  const { colors, tokens } = useTheme();
  return (
    <ExpoText
      textStyle={{
        color: colors.foreground,
        fontSize: tokens.typography.body,
        lineHeight: tokens.typography.lineHeightBody,
        ...textStyle,
      }}
      {...props}
    />
  );
}
