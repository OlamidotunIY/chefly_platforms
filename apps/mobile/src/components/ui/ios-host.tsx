import { Host } from '@expo/ui/swift-ui';
import type { PropsWithChildren } from 'react';

import { useTheme } from '../theme';

export function IOSHost({ children }: PropsWithChildren) {
  const { resolvedTheme } = useTheme();
  return (
    <Host matchContents colorScheme={resolvedTheme}>
      {children}
    </Host>
  );
}
