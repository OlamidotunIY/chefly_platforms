import { DateTimePicker as ComposeDateTimePicker } from '@expo/ui/jetpack-compose';

import { useTheme } from '../theme';
import { AndroidHost } from './android-host';
import type { DateTimePickerProps } from './native-types';

export function DateTimePicker({
  value,
  onChange,
  mode = 'date',
  minimumDate,
  maximumDate,
}: DateTimePickerProps) {
  const { colors } = useTheme();
  return (
    <AndroidHost>
      <ComposeDateTimePicker
        color={colors.primary}
        displayedComponents={
          mode === 'time' ? 'hourAndMinute' : mode === 'datetime' ? 'dateAndTime' : 'date'
        }
        initialDate={value.toISOString()}
        onDateSelected={onChange}
        selectableDates={{ start: minimumDate, end: maximumDate }}
      />
    </AndroidHost>
  );
}

export type { DateTimePickerProps } from './native-types';
