import { Spacer as ExpoSpacer, type SpacerProps as ExpoSpacerProps } from '@expo/ui';

import { useTheme } from '../theme';

export type SpacerProps = ExpoSpacerProps;

export function Spacer({ size, ...props }: SpacerProps) {
  const { tokens } = useTheme();
  return <ExpoSpacer size={size ?? tokens.spacing.md} {...props} />;
}
