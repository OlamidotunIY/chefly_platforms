import { useWindowDimensions, type ViewProps } from 'react-native';

import { Logo } from '@/components/custom/Logo';
import { Box } from '@/components/ui/box';

type SplashScreenProps = ViewProps & {
  logoSize?: number;
};

export function SplashScreen({
  logoSize,
  className,
  ...props
}: SplashScreenProps & { className?: string }) {
  const { width } = useWindowDimensions();
  const responsiveLogoSize = Math.min(width * 0.55, 240);

  return (
    <Box
      className={`flex-1 items-center justify-center bg-background-0 ${className ?? ''}`}
      {...props}
    >
      <Logo size={logoSize ?? responsiveLogoSize} />
    </Box>
  );
}
