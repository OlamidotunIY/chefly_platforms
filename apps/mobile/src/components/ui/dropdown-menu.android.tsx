import {
  Button,
  DropdownMenu as ComposeDropdownMenu,
  DropdownMenuItem,
  Text,
} from '@expo/ui/jetpack-compose';
import { useState } from 'react';

import { useTheme } from '../theme';
import { AndroidHost } from './android-host';
import type { DropdownMenuProps } from './native-types';

export function DropdownMenu<T extends string | number>({
  label,
  options,
  value,
  onValueChange,
  disabled,
}: DropdownMenuProps<T>) {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useTheme();
  const selectedLabel = options.find((option) => option.value === value)?.label ?? label;

  return (
    <AndroidHost>
      <ComposeDropdownMenu
        color={colors.popover}
        expanded={expanded}
        onDismissRequest={() => setExpanded(false)}>
        <ComposeDropdownMenu.Trigger>
          <Button
            enabled={!disabled}
            colors={{ containerColor: colors.secondary, contentColor: colors.secondaryForeground }}
            onClick={() => setExpanded(true)}>
            <Text>{selectedLabel}</Text>
          </Button>
        </ComposeDropdownMenu.Trigger>
        <ComposeDropdownMenu.Items>
          {options.map((option) => (
            <DropdownMenuItem
              key={String(option.value)}
              enabled={!option.disabled}
              elementColors={{
                textColor: option.destructive ? colors.destructive : colors.popoverForeground,
              }}
              onClick={() => {
                onValueChange(option.value);
                setExpanded(false);
              }}>
              <DropdownMenuItem.Text>
                <Text>{option.label}</Text>
              </DropdownMenuItem.Text>
            </DropdownMenuItem>
          ))}
        </ComposeDropdownMenu.Items>
      </ComposeDropdownMenu>
    </AndroidHost>
  );
}

export type { DropdownMenuProps, MenuOption } from './native-types';
