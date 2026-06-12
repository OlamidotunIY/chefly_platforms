import {
  CircularProgressIndicator,
  Column,
  LinearProgressIndicator,
  Text,
} from '@expo/ui/jetpack-compose';

import { useTheme } from '../theme';
import { AndroidHost } from './android-host';
import type { ProgressProps } from './native-types';

export function Progress({ value, variant = 'linear', label }: ProgressProps) {
  const { colors, tokens } = useTheme();
  const indicator =
    variant === 'circular' ? (
      <CircularProgressIndicator
        color={colors.primary}
        progress={value}
        trackColor={colors.muted}
      />
    ) : (
      <LinearProgressIndicator color={colors.primary} progress={value} trackColor={colors.muted} />
    );

  return (
    <AndroidHost>
      {label ? (
        <Column verticalArrangement={{ spacedBy: tokens.spacing.sm }}>
          <Text color={colors.mutedForeground}>{label}</Text>
          {indicator}
        </Column>
      ) : (
        indicator
      )}
    </AndroidHost>
  );
}

export type { ProgressProps } from './native-types';
