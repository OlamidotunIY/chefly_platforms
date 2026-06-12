import { authClient, getCurrentUser } from '@chefly/api';
import { router, type Href } from 'expo-router';
import { useEffect } from 'react';
import { View, useWindowDimensions, type ViewProps } from 'react-native';

import { hasSeenOnboarding } from '../../lib/onboarding-storage';
import { useTheme } from '../theme';
import { Column, Host, RNHostView, Spacer } from '../ui';
import { BrandLoader } from './BrandLoader';
import { Logo } from './Logo';

const authenticatedRoute = '/(auth)' as Href;
const onboardingRoute = '/onboarding' as Href;
const verificationRoute = '/' as Href;

export type SplashScreenProps = ViewProps & {
  logoSize?: number;
  loaderSize?: number;
};

export function SplashScreen({
  logoSize,
  loaderSize = 56,
  style,
  ...props
}: SplashScreenProps) {
  const { width } = useWindowDimensions();
  const { colors, tokens } = useTheme();
  const session = authClient.useSession();
  const responsiveLogoSize = Math.min(width * 0.6, 240);

  useEffect(() => {
    if (session.isPending) {
      return;
    }

    let cancelled = false;

    async function replaceRoute(route: Href) {
      if (!cancelled) {
        router.replace(route);
      }
    }

    async function resolveInitialRoute() {
      try {
        const onboardingComplete = await hasSeenOnboarding();

        if (!onboardingComplete) {
          await replaceRoute(onboardingRoute);
          return;
        }

        if (!session.data?.user) {
          await replaceRoute(authenticatedRoute);
          return;
        }

        const { data, error } = await getCurrentUser();

        if (error) {
          console.error('Unable to load the current user:', error);
          await replaceRoute(authenticatedRoute);
          return;
        }

        await replaceRoute(
          data?.data.emailVerified ? authenticatedRoute : verificationRoute,
        );
      } catch (error) {
        console.error('Unable to resolve the initial app route:', error);
        await replaceRoute(onboardingRoute);
      }
    }

    void resolveInitialRoute();

    return () => {
      cancelled = true;
    };
  }, [session.data?.user, session.isPending]);

  return (
    <Host
      ignoreSafeArea="all"
      style={[{ flex: 1, backgroundColor: colors.background }, style]}
      useViewportSizeMeasurement
      {...props}>
      <Column
        alignment="center"
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: tokens.spacing.xl,
          paddingVertical: tokens.spacing.xxxl,
        }}>
        <Spacer flexible />
        <RNHostView matchContents>
          <Logo size={logoSize ?? responsiveLogoSize} />
        </RNHostView>
        <Spacer flexible />
        <RNHostView matchContents>
          <View>
            <BrandLoader size={loaderSize} />
          </View>
        </RNHostView>
      </Column>
    </Host>
  );
}
