import { Checkbox as ExpoCheckbox, type CheckboxProps as ExpoCheckboxProps } from '@expo/ui';

import { useTheme } from '../theme';

export type CheckboxProps = ExpoCheckboxProps;

export function Checkbox(props: CheckboxProps) {
  useTheme();
  return <ExpoCheckbox {...props} />;
}
