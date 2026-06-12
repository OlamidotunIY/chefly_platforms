import {
  SegmentedButton as ComposeSegmentedButton,
  SingleChoiceSegmentedButtonRow,
  Text,
} from '@expo/ui/jetpack-compose';

import { useTheme } from '../theme';
import { AndroidHost } from './android-host';
import type { SegmentedButtonProps } from './native-types';

export function SegmentedButton<T extends string | number>({
  options,
  value,
  onValueChange,
}: SegmentedButtonProps<T>) {
  const { colors } = useTheme();
  return (
    <AndroidHost>
      <SingleChoiceSegmentedButtonRow>
        {options.map((option) => (
          <ComposeSegmentedButton
            key={String(option.value)}
            selected={option.value === value}
            enabled={!option.disabled}
            onClick={() => onValueChange(option.value)}
            colors={{
              activeContainerColor: colors.primary,
              activeContentColor: colors.primaryForeground,
              inactiveContainerColor: colors.secondary,
              inactiveContentColor: colors.secondaryForeground,
              activeBorderColor: colors.primary,
              inactiveBorderColor: colors.border,
            }}>
            <ComposeSegmentedButton.Label>
              <Text>{option.label}</Text>
            </ComposeSegmentedButton.Label>
          </ComposeSegmentedButton>
        ))}
      </SingleChoiceSegmentedButtonRow>
    </AndroidHost>
  );
}

export type { SegmentedButtonProps, SegmentedOption } from './native-types';
