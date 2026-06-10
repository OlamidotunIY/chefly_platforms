// import { Image, type ImageProps } from 'expo-image';


// const logoSources = {
//   light: require('@/assets/images/Logo/chefly_dark.png'),
//   dark: require('@/assets/images/Logo/chefly_light.png'),
// } as const;

// type LogoProps = Omit<ImageProps, 'source'> & {
//   size?: number;
// };

// export function Logo({
//   size = 120,
//   style,
//   contentFit = 'contain',
//   ...props
// }: LogoProps) {
//   const { resolvedTheme } = useTheme();

//   return (
//     <Image
//       accessibilityLabel="Chefly"
//       contentFit={contentFit}
//       source={logoSources[resolvedTheme]}
//       style={[{ width: size, height: size }, style]}
//       {...props}
//     />
//   );
// }
