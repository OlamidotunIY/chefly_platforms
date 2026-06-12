import { SearchBar as ComposeSearchBar, Text } from '@expo/ui/jetpack-compose';

import { AndroidHost } from './android-host';
import type { SearchBarProps } from './native-types';

export function SearchBar({
  onChangeText,
  onSubmit,
  placeholder = 'Search',
  disabled,
}: SearchBarProps) {
  return (
    <AndroidHost>
      <ComposeSearchBar
        onSearch={
          disabled
            ? undefined
            : (text) => {
                onChangeText(text);
                onSubmit?.(text);
              }
        }>
        <ComposeSearchBar.Placeholder>
          <Text>{placeholder}</Text>
        </ComposeSearchBar.Placeholder>
      </ComposeSearchBar>
    </AndroidHost>
  );
}

export type { SearchBarProps } from './native-types';
