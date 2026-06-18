import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { Logo } from '@/components/custom/Logo';
import { TabHeader } from '@/components/custom/TabHeader';
import { useTheme } from '@/components/theme';
import { Column, RNHostView, Screen, ScrollView, Text } from '@/components/ui';
import {
  ReelsPlayer,
  type ReelsPlayerProgress,
  type ReelsPlayerState,
} from 'reels-engine';

const demoSource = {
  uri: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
};

export default function FeaturedScreen() {
  const { width } = useWindowDimensions();
  const { colors, tokens } = useTheme();
  const contentWidth = width - tokens.spacing.lg * 2;
  const playerHeight = (contentWidth * 9) / 16;
  const [playerState, setPlayerState] = useState<ReelsPlayerState>('idle');
  const [progress, setProgress] = useState<ReelsPlayerProgress>({
    bufferedPercentage: 0,
    bufferedPositionMs: 0,
    durationMs: 0,
    positionMs: 0,
  });

  return (
    <Screen>
      <TabHeader position="fixed" style={{ width: contentWidth }}>
        <RNHostView
          matchContents
          style={{
            backgroundColor: colors.background,
            height: 52,
            width: contentWidth,
          }}>
          <View
            style={[
              styles.headerRow,
              {
                height: 52,
                width: contentWidth,
              },
            ]}>
            <Logo size={64} />

            <View style={[styles.headerActions, { gap: tokens.spacing.md }]}>
              <View style={styles.iconContainer}>
                <SymbolView
                  name={{ android: 'shopping_cart', ios: 'cart' }}
                  size={tokens.control.iconSize}
                  tintColor={colors.foreground}
                />
              </View>
              <View style={styles.iconContainer}>
                <SymbolView
                  name={{ android: 'dashboard', ios: 'square.grid.2x2.fill' }}
                  size={tokens.control.iconSize}
                  tintColor={colors.foreground}
                />
              </View>
            </View>
          </View>
        </RNHostView>
      </TabHeader>

      <ScrollView
        showsIndicators={false}
        style={{
          backgroundColor: colors.background,
          width: contentWidth,
        }}>
        <Column
          spacing={tokens.spacing.lg}
          style={{
            backgroundColor: colors.background,
            paddingVertical: tokens.spacing.lg,
            width: contentWidth,
          }}>
          <RNHostView
            style={{
              backgroundColor: '#000000',
              height: playerHeight,
              width: contentWidth,
            }}>
            <View
              style={{
                backgroundColor: '#000000',
                height: playerHeight,
                width: contentWidth,
              }}>
              <ReelsPlayer
                controls
                onProgress={setProgress}
                onStateChange={(event) => setPlayerState(event.state)}
                resizeMode="contain"
                source={demoSource}
                style={StyleSheet.absoluteFill}
              />
            </View>
          </RNHostView>

          <Text textStyle={{ color: colors.foreground, fontWeight: '700' }}>
            {`Player: ${playerState}`}
          </Text>
          <Text textStyle={{ color: colors.mutedForeground }}>
            {`${formatTime(progress.positionMs)} / ${formatTime(progress.durationMs)} - ${progress.bufferedPercentage}% buffered`}
          </Text>
        </Column>
      </ScrollView>
    </Screen>
  );
}

function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
