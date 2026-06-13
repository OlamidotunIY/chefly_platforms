import { VStack } from '@expo/ui/swift-ui';

import { useTheme } from '../theme';
import type { FormProps } from './native-types';

export function Form({ children }: FormProps) {
  const { tokens } = useTheme();

  return (
    <VStack alignment="leading" spacing={tokens.spacing.md}>
      {children}
    </VStack>
  );
}

export type { FormProps } from './native-types';
