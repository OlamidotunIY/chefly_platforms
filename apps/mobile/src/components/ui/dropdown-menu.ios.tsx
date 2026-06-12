import { Button, Menu } from '@expo/ui/swift-ui';
import { foregroundStyle } from '@expo/ui/swift-ui/modifiers';

import { useTheme } from '../theme';
import { IOSHost } from './ios-host';
import type { DropdownMenuProps } from './native-types';

export function DropdownMenu<T extends string | number>({
  label,
  options,
  value,
  onValueChange,
  disabled,
}: DropdownMenuProps<T>) {
  const { colors } = useTheme();
  const selectedLabel = options.find((option) => option.value === value)?.label ?? label;
  return (
    <IOSHost>
      <Menu label={selectedLabel}>
        {options.map((option) => (
          <Button
            key={String(option.value)}
            label={option.label}
            role={option.destructive ? 'destructive' : 'default'}
            modifiers={[foregroundStyle(option.destructive ? colors.destructive : colors.foreground)]}
            onPress={disabled || option.disabled ? undefined : () => onValueChange(option.value)}
          />
        ))}
      </Menu>
    </IOSHost>
  );
}

export type { DropdownMenuProps, MenuOption } from './native-types';
