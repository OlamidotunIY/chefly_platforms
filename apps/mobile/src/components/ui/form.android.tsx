import { Column } from '@expo/ui/jetpack-compose';

import { useTheme } from '../theme';
import type { FormProps } from './native-types';

export function Form({ children }: FormProps) {
  const { tokens } = useTheme();

  return (
    <Column verticalArrangement={{ spacedBy: tokens.spacing.md }}>
      {children}
    </Column>
  );
}

export type { FormProps } from './native-types';
