import { authClient, getCurrentUser } from '@chefly/api';
import { router, type Href } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, useWindowDimensions, type ViewProps } from 'react-native';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { hasSeenOnboarding } from '../../lib/onboarding-storage';
import { useTheme } from '../theme';
import { Host, RNHostView } from '../ui';
import { BrandLoader } from './BrandLoader';
import { Logo } from './Logo';

export type SplashScreenProps = ViewProps & {
  logoSize?: number;
  loaderSize?: number;
};

const routes = {
  emailVerification: '/email-verification',
  login: '/(auth)',
  onboarding: '/onboarding',
  tabs: '/(tabs)',
} satisfies Record<string, Href>;

const minimumSplashDuration = 900;
const pageTurnDuration = 1150;

function navigateToRoute(route: Href) {
  router.replace(route);
}

export function SplashScreen({
  logoSize,
  loaderSize = 56,
  style,
  ...props
}: SplashScreenProps) {
  const { height, width } = useWindowDimensions();
  const { colors, tokens } = useTheme();
  const session = authClient.useSession();
  const reduceMotion = useReducedMotion();
  const mountedAt = useRef(0);
  const [destination, setDestination] = useState<Href | null>(null);
  const entrance = useSharedValue(0);
  const pageTurn = useSharedValue(0);
  const responsiveLogoSize = Math.min(width * 0.6, 240);

  useEffect(() => {
    mountedAt.current = Date.now();
    entrance.value = withTiming(1, {
      duration: 700,
      easing: Easing.out(Easing.cubic),
    });
  }, [entrance]);

  useEffect(() => {
    if (!destination) {
      return;
    }

    if (reduceMotion) {
      navigateToRoute(destination);
      return;
    }

    const elapsed = Date.now() - mountedAt.current;
    const delay = Math.max(0, minimumSplashDuration - elapsed);

    pageTurn.value = withDelay(
      delay,
      withTiming(
        1,
        {
          duration: pageTurnDuration,
          easing: Easing.bezier(0.62, 0.02, 0.2, 1),
        },
        (finished) => {
          if (finished) {
            runOnJS(navigateToRoute)(destination);
          }
        },
      ),
    );
  }, [destination, pageTurn, reduceMotion]);

  useEffect(() => {
    if (session.isPending) {
      return;
    }

    let cancelled = false;

    function replaceRoute(route: Href) {
      if (!cancelled) {
        setDestination((current) => current ?? route);
      }
    }

    async function resolveInitialRoute() {
      try {
        const onboardingComplete = await hasSeenOnboarding();

        if (!session.data?.user) {
          replaceRoute(onboardingComplete ? routes.login : routes.onboarding);
          return;
        }

        const { data, error } = await getCurrentUser();

        if (error || !data?.data) {
          console.error('Unable to load the current user:', error);
          replaceRoute(routes.login);
          return;
        }

        replaceRoute(
          data.data.emailVerified ? routes.tabs : routes.emailVerification,
        );
      } catch (error) {
        console.error('Unable to resolve the initial app route:', error);
        replaceRoute(routes.login);
      }
    }

    void resolveInitialRoute();

    return () => {
      cancelled = true;
    };
  }, [session.data?.user, session.isPending]);

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      pageTurn.value,
      [0, 0.08, 0.72, 1],
      [0, 1, 1, 0.25],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        scale: interpolate(
          pageTurn.value,
          [0, 0.6, 1],
          [0.92, 1.04, 1.12],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const pageStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      pageTurn.value,
      [0, 0.18, 0.72, 1],
      [0, -4, -72, -108],
      Extrapolation.CLAMP,
    );

    return {
      transformOrigin: ['0%', '50%', 0],
      transform: [
        { perspective: 1400 },
        {
          translateX: interpolate(
            pageTurn.value,
            [0, 0.45, 1],
            [0, width * 0.025, -width * 0.16],
            Extrapolation.CLAMP,
          ),
        },
        { rotateY: `${rotation}deg` },
        {
          rotateZ: `${interpolate(
            pageTurn.value,
            [0, 0.45, 1],
            [0, 0.5, -1.8],
            Extrapolation.CLAMP,
          )}deg`,
        },
        {
          scale: interpolate(
            pageTurn.value,
            [0, 0.35, 1],
            [1, 1.015, 0.96],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  const contentStyle = useAnimatedStyle(() => ({
    opacity:
      entrance.value *
      interpolate(
        pageTurn.value,
        [0, 0.3, 0.78, 1],
        [1, 1, 0.5, 0],
        Extrapolation.CLAMP,
      ),
    transform: [
      {
        translateY: interpolate(
          entrance.value,
          [0, 1],
          [28, 0],
          Extrapolation.CLAMP,
        ),
      },
      {
        scale: interpolate(
          pageTurn.value,
          [0, 0.55, 1],
          [1, 0.92, 0.76],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const pageShadowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      pageTurn.value,
      [0, 0.12, 0.7, 1],
      [0, 0.12, 0.55, 0],
      Extrapolation.CLAMP,
    ),
    transform: [
      {
        translateX: interpolate(
          pageTurn.value,
          [0, 1],
          [width, width * 0.16],
          Extrapolation.CLAMP,
        ),
      },
      {
        scaleX: interpolate(
          pageTurn.value,
          [0, 0.65, 1],
          [0.08, 0.65, 0.18],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <Host
      ignoreSafeArea="all"
      style={[{ flex: 1, backgroundColor: colors.background }, style]}
      useViewportSizeMeasurement
      {...props}>
      <RNHostView style={{ width, height }}>
        <View style={[styles.viewport, { backgroundColor: colors.background }]}>
          <Animated.View
            style={[
              styles.backdrop,
              { backgroundColor: colors.accent },
              backdropStyle,
            ]}>
            <View
              style={[
                styles.backdropOrb,
                styles.backdropOrbTop,
                { backgroundColor: colors.brandPrimary },
              ]}
            />
            <View
              style={[
                styles.backdropOrb,
                styles.backdropOrbBottom,
                { backgroundColor: colors.brandSecondary },
              ]}
            />
          </Animated.View>

          <Animated.View
            pointerEvents="none"
            style={[
              styles.pageShadow,
              { backgroundColor: colors.overlay },
              pageShadowStyle,
            ]}
          />

          <Animated.View
            style={[
              styles.page,
              {
                width,
                height,
                backgroundColor: colors.background,
                shadowColor: colors.foreground,
              },
              pageStyle,
            ]}>
            <Animated.View
              style={[
                styles.content,
                {
                  paddingHorizontal: tokens.spacing.xl,
                  paddingVertical: tokens.spacing.xxxl,
                },
                contentStyle,
              ]}>
              <View />
              <Logo size={logoSize ?? responsiveLogoSize} />
              <BrandLoader size={loaderSize} />
            </Animated.View>
          </Animated.View>
        </View>
      </RNHostView>
    </Host>
  );
}

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    overflow: 'hidden',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backdropOrb: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    opacity: 0.22,
  },
  backdropOrbTop: {
    top: -80,
    right: -110,
  },
  backdropOrbBottom: {
    bottom: -120,
    left: -90,
  },
  pageShadow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 180,
  },
  page: {
    position: 'absolute',
    top: 0,
    left: 0,
    backfaceVisibility: 'hidden',
    elevation: 18,
    shadowOffset: { width: 18, height: 4 },
    shadowOpacity: 0.38,
    shadowRadius: 22,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
