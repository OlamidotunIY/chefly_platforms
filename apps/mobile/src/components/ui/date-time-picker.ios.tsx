import { DatePicker } from '@expo/ui/swift-ui';
import { tint } from '@expo/ui/swift-ui/modifiers';

import { useTheme } from '../theme';
import { IOSHost } from './ios-host';
import type { DateTimePickerProps } from './native-types';

export function DateTimePicker({
  value,
  onChange,
  mode = 'date',
  label,
  minimumDate,
  maximumDate,
}: DateTimePickerProps) {
  const { colors } = useTheme();
  return (
    <IOSHost>
      <DatePicker
        title={label}
        selection={value}
        range={{ start: minimumDate, end: maximumDate }}
        displayedComponents={
          mode === 'datetime' ? ['date', 'hourAndMinute'] : [mode === 'time' ? 'hourAndMinute' : 'date']
        }
        modifiers={[tint(colors.primary)]}
        onDateChange={onChange}
      />
    </IOSHost>
  );
}

export type { DateTimePickerProps } from './native-types';
