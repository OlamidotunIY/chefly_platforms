import {
  Picker as ExpoPicker,
  type PickerItemValue,
  type PickerProps as ExpoPickerProps,
} from '@expo/ui';

import { useTheme } from '../theme';

export type PickerProps<T extends PickerItemValue = PickerItemValue> = ExpoPickerProps<T>;

function PickerBase<T extends PickerItemValue>(props: PickerProps<T>) {
  useTheme();
  return <ExpoPicker {...props} />;
}

export const Picker = Object.assign(PickerBase, { Item: ExpoPicker.Item });
