import { ProgressView, Text, VStack } from '@expo/ui/swift-ui';
import {
  foregroundStyle,
  progressViewStyle,
  tint,
} from '@expo/ui/swift-ui/modifiers';

import { useTheme } from '../theme';
import { IOSHost } from './ios-host';
import type { ProgressProps } from './native-types';

export function Progress({ value, variant = 'linear', label }: ProgressProps) {
  const { colors, tokens } = useTheme();
  const indicator = (
    <ProgressView
      value={value}
      modifiers={[progressViewStyle(variant === 'circular' ? 'circular' : 'linear'), tint(colors.primary)]}
    />
  );
  return (
    <IOSHost>
      {label ? (
        <VStack alignment="leading" spacing={tokens.spacing.sm}>
          <Text modifiers={[foregroundStyle(colors.mutedForeground)]}>{label}</Text>
          {indicator}
        </VStack>
      ) : (
        indicator
      )}
    </IOSHost>
  );
}

export type { ProgressProps } from './native-types';
