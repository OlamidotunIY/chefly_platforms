import { Image, type ImageProps } from 'expo-image';

import { useTheme } from '../theme';

const logoSources = {
  light: require('../../assets/images/Logo/chefly_light.svg'),
  dark: require('../../assets/images/Logo/chefly_dark.svg'),
} as const;

export type LogoProps = Omit<ImageProps, 'source'> & {
  size?: number;
};

export function Logo({
  size = 120,
  style,
  contentFit = 'contain',
  accessibilityLabel = 'Chefly',
  ...props
}: LogoProps) {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      accessibilityLabel={accessibilityLabel}
      contentFit={contentFit}
      source={logoSources[resolvedTheme]}
      style={[{ width: size, height: size }, style]}
      {...props}
    />
  );
}
