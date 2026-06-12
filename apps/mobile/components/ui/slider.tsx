import { Slider as ExpoSlider, type SliderProps as ExpoSliderProps } from '@expo/ui';

import { useTheme } from '../theme';

export type SliderProps = ExpoSliderProps;

export function Slider(props: SliderProps) {
  useTheme();
  return <ExpoSlider {...props} />;
}
