import { Column } from '@expo/ui/jetpack-compose';
import { background, paddingAll } from '@expo/ui/jetpack-compose/modifiers';

import { useTheme } from '../theme';
import { AndroidHost } from './android-host';
import type { FormProps } from './native-types';

export function Form({ children }: FormProps) {
  const { colors, tokens } = useTheme();
  return (
    <AndroidHost>
      <Column
        verticalArrangement={{ spacedBy: tokens.spacing.lg }}
        modifiers={[background(colors.background), paddingAll(tokens.spacing.lg)]}>
        {children}
      </Column>
    </AndroidHost>
  );
}

export type { FormProps } from './native-types';
