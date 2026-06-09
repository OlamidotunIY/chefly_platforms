import { useWindowDimensions, type ViewProps } from 'react-native';
import { Box } from '@/components/ui/box';
import { BrandLoader, Logo } from './';
import { authClient, getCurrentUser } from '@chefly/api';
import { useEffect } from 'react';
import { router } from 'expo-router';

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

    if (session.data?.user)
    {
      getCurrentUser().then((user) =>
      {
        console.log('Current user:', user);
      });
    } else
    {
      router.replace('/(auth)');
    }
  }, [session.data?.user])


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
