import type { ReactNode } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { useDeviceDimensions } from '@/lib/device-dimensions';
import { useTheme } from '../theme';
import { Column } from './column';
import { Host } from './host';

export type ScreenProps = ViewProps & {
  background?: ReactNode;
  children?: ReactNode;
  contentBackgroundColor?: string;
  contentPaddingHorizontal?: number;
  contentPaddingVertical?: number;
  spacing?: number;
};

export function Screen({
  background,
  children,
  contentBackgroundColor,
  contentPaddingHorizontal,
  contentPaddingVertical,
  spacing,
  style,
  ...props
}: ScreenProps) {
  const { height, width } = useDeviceDimensions();
  const { colors, tokens } = useTheme();
  const backgroundColor = contentBackgroundColor ?? colors.background;

  return (
    <View
      style={[
        styles.root,
        { backgroundColor },
        style,
      ]}
      {...props}>
      {background}
      <Host
        ignoreSafeArea="all"
        style={[styles.host, { backgroundColor }]}
        useViewportSizeMeasurement>
        <Column
          spacing={spacing ?? tokens.spacing.lg}
          style={{
            width,
            height,
            paddingHorizontal:
              contentPaddingHorizontal ?? tokens.spacing.lg,
            paddingVertical:
              contentPaddingVertical ?? tokens.spacing.xxxl,
            backgroundColor,
          }}>
          {children}
        </Column>
      </Host>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'hidden',
  },
  host: {
    ...StyleSheet.absoluteFill,
  },
});
