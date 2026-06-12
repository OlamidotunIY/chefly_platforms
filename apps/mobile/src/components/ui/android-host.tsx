import { Host } from '@expo/ui/jetpack-compose';
import type { PropsWithChildren } from 'react';

import { useTheme } from '../theme';

export function AndroidHost({ children }: PropsWithChildren) {
  const { colors, resolvedTheme } = useTheme();
  return (
    <Host matchContents colorScheme={resolvedTheme} seedColor={colors.brandPrimary}>
      {children}
    </Host>
  );
}
