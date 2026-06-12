import { HStack, Text, TextField, useNativeState } from '@expo/ui/swift-ui';
import {
  background,
  clipShape,
  foregroundStyle,
  frame,
  padding,
  textFieldStyle,
  tint,
} from '@expo/ui/swift-ui/modifiers';
import { useEffect } from 'react';

import { useTheme } from '../theme';
import { IOSHost } from './ios-host';
import type { SearchBarProps } from './native-types';

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search',
  disabled,
}: SearchBarProps) {
  const text = useNativeState(value);
  const { colors, tokens } = useTheme();

  useEffect(() => {
    text.set(value);
  }, [text, value]);

  return (
    <IOSHost>
      <HStack
        spacing={tokens.spacing.sm}
        modifiers={[
          padding({ horizontal: tokens.spacing.lg }),
          frame({ minHeight: tokens.control.height }),
          background(colors.secondary),
          clipShape('capsule'),
        ]}>
        <Text modifiers={[foregroundStyle(colors.mutedForeground)]}>⌕</Text>
        <TextField
          text={text}
          placeholder={placeholder}
          onTextChange={onChangeText}
          modifiers={[
            textFieldStyle('plain'),
            tint(colors.primary),
            foregroundStyle(colors.foreground),
          ]}
        />
      </HStack>
    </IOSHost>
  );
}

export type { SearchBarProps } from './native-types';
