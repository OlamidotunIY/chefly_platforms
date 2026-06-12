import {
  BottomSheet as ExpoBottomSheet,
  type BottomSheetProps as ExpoBottomSheetProps,
} from '@expo/ui';

import { useTheme } from '../theme';

export type BottomSheetProps = ExpoBottomSheetProps;

export function BottomSheet(props: BottomSheetProps) {
  useTheme();
  return <ExpoBottomSheet {...props} />;
}
