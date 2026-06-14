import { Dimensions, useWindowDimensions } from 'react-native';

export function useDeviceDimensions() {
  const viewport = useWindowDimensions();
  const screen = Dimensions.get('screen');

  return {
    height: viewport.height,
    width: Math.max(viewport.width, screen.width),
  };
}
