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

const dots = [
  { angle: -90, delay: 0, tone: 'primary' },
  { angle: 0, delay: 130, tone: 'secondary' },
  { angle: 90, delay: 260, tone: 'primarySoft' },
  { angle: 180, delay: 390, tone: 'secondarySoft' },
] as const;

type LoaderDotProps = {
  angle: number;
  delay: number;
  size: number;
  tone: (typeof dots)[number]['tone'];
};

function LoaderDot({ angle, delay, size, tone }: LoaderDotProps) {
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
        className={
          tone === 'primary'
            ? 'h-full w-full rounded-full bg-primary-500'
            : tone === 'secondary'
              ? 'h-full w-full rounded-full bg-secondary-500'
              : tone === 'primarySoft'
                ? 'h-full w-full rounded-full bg-primary-300'
                : 'h-full w-full rounded-full bg-secondary-300'
        }
      />
    </Animated.View>
  );
}

type BrandLoaderProps = {
  size?: number;
};

export function BrandLoader({ size = 56 }: BrandLoaderProps) {
  return (
    <View
      accessibilityLabel="Loading"
      accessibilityRole="progressbar"
      className="items-center justify-center"
      style={{ width: size, height: size }}
    >
      {dots.map((dot) => (
        <LoaderDot
          angle={dot.angle}
          delay={dot.delay}
          key={dot.angle}
          size={size}
          tone={dot.tone}
        />
      ))}
    </View>
  );
}
