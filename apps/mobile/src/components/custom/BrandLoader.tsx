import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../theme';

const dots = [
  { angle: -90, delay: 0, tone: 'primary' },
  { angle: 0, delay: 130, tone: 'secondary' },
  { angle: 90, delay: 260, tone: 'primarySoft' },
  { angle: 180, delay: 390, tone: 'secondarySoft' },
] as const;

type LoaderDotProps = {
  angle: number;
  delay: number;
  color: string;
  size: number;
};

function LoaderDot({ angle, color, delay, size }: LoaderDotProps) {
  const pulse = useSharedValue(0.45);
  const dotSize = size * 0.16;
  const radius = size * 0.32;
  const radians = (angle * Math.PI) / 180;
  const left = size / 2 + Math.cos(radians) * radius - dotSize / 2;
  const top = size / 2 + Math.sin(radians) * radius - dotSize / 2;

  useEffect(() => {
    pulse.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, {
            duration: 220,
            easing: Easing.out(Easing.cubic),
          }),
          withTiming(0.45, {
            duration: 680,
            easing: Easing.inOut(Easing.quad),
          }),
        ),
        -1,
      ),
    );

    return () => {
      cancelAnimation(pulse);
    };
  }, [delay, pulse]);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: 0.35 + pulse.value * 0.65,
    transform: [{ scale: 0.75 + pulse.value * 0.35 }],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: dotSize,
          height: dotSize,
          left,
          top,
        },
        pulseStyle,
      ]}
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          borderRadius: dotSize / 2,
          backgroundColor: color,
        }}
      />
    </Animated.View>
  );
}

type BrandLoaderProps = {
  size?: number;
};

export function BrandLoader({ size = 56 }: BrandLoaderProps) {
  const { colors } = useTheme();
  const dotColors = {
    primary: colors.brandPrimary,
    secondary: colors.brandSecondary,
    primarySoft: colors.accent,
    secondarySoft: colors.brandTertiary,
  } as const;

  return (
    <View
      accessibilityLabel="Loading"
      accessibilityRole="progressbar"
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {dots.map((dot) => (
        <LoaderDot
          angle={dot.angle}
          color={dotColors[dot.tone]}
          delay={dot.delay}
          key={dot.angle}
          size={size}
        />
      ))}
    </View>
  );
}
