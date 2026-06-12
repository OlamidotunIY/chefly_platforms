import { Row as ExpoRow, type RowProps as ExpoRowProps } from '@expo/ui';

import { useTheme } from '../theme';
import { mergeUniversalStyle } from './style';

export type RowProps = ExpoRowProps;

export function Row({ spacing, style, ...props }: RowProps) {
  const { tokens } = useTheme();
  return (
    <ExpoRow spacing={spacing ?? tokens.spacing.sm} style={mergeUniversalStyle({}, style)} {...props} />
  );
}
