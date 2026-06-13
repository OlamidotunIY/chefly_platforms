import { authClient } from '@/lib/auth-client';
import { clearCurrentUser, hydrateCurrentUser } from '@/lib/current-user';
import { router, type Href } from 'expo-router';
import { useEffect } from 'react';
import { View, useWindowDimensions } from 'react-native';

import {
  hasSeenOnboarding,
  markOnboardingComplete,
} from '../../lib/onboarding-storage';
import { useTheme } from '../theme';
import { Host, RNHostView } from '../ui';
import { BrandLoader } from './BrandLoader';
import { Logo } from './Logo';

const routes = {
  emailVerification: '/(auth)/email-verification',
  login: '/(auth)',
  onboarding: '/(auth)/onboarding',
  tabs: '/(tabs)',
} satisfies Record<string, Href>;

export function SplashScreen() {
  const { height, width } = useWindowDimensions();
  const { colors, tokens } = useTheme();
  const responsiveLogoSize = Math.min(width * 0.6, 240);

  useEffect(() => {
    let cancelled = false;

    function finish(route: Href) {
      if (!cancelled) {
        router.replace(route);
      }
    }

    async function resolveInitialRoute() {
      try {
        const session = await authClient.getSession();
        const onboardingComplete = await hasSeenOnboarding();

        if (!session.data?.user) {
          clearCurrentUser();
          finish(onboardingComplete ? routes.login : routes.onboarding);
          return;
        }

        await markOnboardingComplete();
        const user = await hydrateCurrentUser(session.data.user.id);

        finish(
          user.emailVerified ? routes.tabs : routes.emailVerification,
        );
      } catch (error) {
        console.error('Unable to resolve the initial app route:', error);
        clearCurrentUser('error');
        finish(routes.login);
      }
    }

    void resolveInitialRoute();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Host
      ignoreSafeArea="all"
      style={{ flex: 1, backgroundColor: colors.background }}
      useViewportSizeMeasurement>
      <RNHostView style={{ width, height }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: tokens.spacing.xl,
            paddingVertical: tokens.spacing.xxxl,
            backgroundColor: colors.background,
          }}>
          <View />
          <Logo size={responsiveLogoSize} />
          <BrandLoader />
        </View>
      </RNHostView>
    </Host>
  );
}
