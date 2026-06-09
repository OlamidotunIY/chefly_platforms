import { useWindowDimensions, type ViewProps } from 'react-native';
import { Box } from '@/components/ui/box';
import { BrandLoader, Logo } from './';
import { authClient } from '@chefly/api';

type SplashScreenProps = ViewProps & {
  logoSize?: number;
};

export function SplashScreen({
  logoSize,
  className,
  ...props
}: SplashScreenProps & { className?: string }) {
  const { width } = useWindowDimensions();
  const responsiveLogoSize = Math.min(width * 0.60, 240);
  const session = authClient.useSession();

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
