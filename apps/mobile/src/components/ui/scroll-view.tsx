import { ScrollView as ExpoScrollView, type ScrollViewProps as ExpoScrollViewProps } from '@expo/ui';

import { useTheme } from '../theme';
import { mergeUniversalStyle } from './style';

export type ScrollViewProps = ExpoScrollViewProps;

export function ScrollView({ style, ...props }: ScrollViewProps) {
  const { colors } = useTheme();
  return (
    <ExpoScrollView
      style={mergeUniversalStyle({ backgroundColor: colors.background }, style)}
      {...props}
    />
  );
}
