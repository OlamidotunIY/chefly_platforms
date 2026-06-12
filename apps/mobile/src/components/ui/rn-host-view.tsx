import {
  RNHostView as ExpoRNHostView,
  type RNHostViewProps as ExpoRNHostViewProps,
} from '@expo/ui';

import { useTheme } from '../theme';
import { mergeUniversalStyle } from './style';

export type RNHostViewProps = ExpoRNHostViewProps;

export function RNHostView({ style, ...props }: RNHostViewProps) {
  const { colors } = useTheme();
  return (
    <ExpoRNHostView
      style={mergeUniversalStyle({ backgroundColor: colors.background }, style)}
      {...props}
    />
  );
}
