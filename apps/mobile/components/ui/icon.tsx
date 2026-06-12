import { Icon as ExpoIcon, type IconProps as ExpoIconProps } from '@expo/ui';

import { useTheme } from '../theme';

export type IconProps = ExpoIconProps;

function IconBase({ color, size, ...props }: IconProps) {
  const { colors, tokens } = useTheme();
  return <ExpoIcon color={color ?? colors.foreground} size={size ?? tokens.control.iconSize} {...props} />;
}

export const Icon = Object.assign(IconBase, { select: ExpoIcon.select });
