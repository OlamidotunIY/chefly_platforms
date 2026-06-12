import { Switch as ExpoSwitch, type SwitchProps as ExpoSwitchProps } from '@expo/ui';

import { useTheme } from '../theme';

export type SwitchProps = ExpoSwitchProps;

export function Switch(props: SwitchProps) {
  useTheme();
  return <ExpoSwitch {...props} />;
}
