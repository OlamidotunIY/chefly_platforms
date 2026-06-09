import { useWindowDimensions, type ViewProps } from 'react-native';
import { Box } from '@/components/ui/box';
import { authClient, ErrorResponse, getCurrentUser } from '@chefly/api';
import { useEffect } from 'react';
import { router, type Href } from 'expo-router';

import { hasSeenOnboarding } from '../../src/lib/onboarding-storage';
import { BrandLoader } from './BrandLoader';
import { Logo } from './Logo';

const onboardingRoute = '/onboarding' as Href;

type SplashScreenProps = ViewProps & {
  logoSize?: number;
};

export function SplashScreen({
  logoSize,
  className,
  ...props
}: SplashScreenProps & { className?: string })
{
  const { width } = useWindowDimensions();
  const responsiveLogoSize = Math.min(width * 0.60, 240);
  const session = authClient.useSession();

  useEffect(() =>
  {
    if (session.isPending)
    {
      return;
    }

    let cancelled = false;

    async function resolveInitialRoute()
    {
      if (session.data?.user)
      {
        await getCurrentUser().then(({ data }) =>
        {
          if (!data?.data?.emailVerified)
          {
            router.replace('/');
          }
        }).catch((error: ErrorResponse) =>
        {
          console.error('Error fetching current user:', error.msg);
          // If there's an error fetching the user, we can choose to route to onboarding or show an error screen.
          if (!cancelled)
          {
            router.replace(onboardingRoute);
          }
        });
      }

      try
      {
        const onboardingComplete = await hasSeenOnboarding();

        if (!cancelled)
        {
          router.replace(onboardingComplete ? '/(auth)' : onboardingRoute);
        }
      } catch (error)
      {
        console.error('Unable to read onboarding state:', error);

        if (!cancelled)
        {
          router.replace(onboardingRoute);
        }
      }
    }

    void resolveInitialRoute();

    return () =>
    {
      cancelled = true;
    };
  }, [session.data?.user, session.isPending])


  return (
    <Box
      className={`flex-1 items-center justify-center bg-background-0 ${className ?? ''}`}
      {...props}
    >
      <Logo size={logoSize ?? responsiveLogoSize} />
      <Box className="absolute bottom-24">
        <BrandLoader />
      </Box>
    </Box>
  );
}
