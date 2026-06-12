import { Column as ExpoColumn, type ColumnProps as ExpoColumnProps } from '@expo/ui';

import { useTheme } from '../theme';
import { mergeUniversalStyle } from './style';

export type ColumnProps = ExpoColumnProps;

export function Column({ spacing, style, ...props }: ColumnProps) {
  const { tokens } = useTheme();
  return (
    <ExpoColumn
      spacing={spacing ?? tokens.spacing.md}
      style={mergeUniversalStyle({}, style)}
      {...props}
    />
  );
}
