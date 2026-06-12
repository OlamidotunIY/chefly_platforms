import { Picker, Text } from '@expo/ui/swift-ui';
import { pickerStyle, tag, tint } from '@expo/ui/swift-ui/modifiers';

import { useTheme } from '../theme';
import { IOSHost } from './ios-host';
import type { SegmentedButtonProps } from './native-types';

export function SegmentedButton<T extends string | number>({
  options,
  value,
  onValueChange,
}: SegmentedButtonProps<T>) {
  const { colors } = useTheme();
  return (
    <IOSHost>
      <Picker
        selection={value}
        onSelectionChange={onValueChange}
        modifiers={[pickerStyle('segmented'), tint(colors.primary)]}>
        {options.map((option) => (
          <Text key={String(option.value)} modifiers={[tag(option.value)]}>
            {option.label}
          </Text>
        ))}
      </Picker>
    </IOSHost>
  );
}

export type { SegmentedButtonProps, SegmentedOption } from './native-types';
