import {
  Collapsible as ExpoCollapsible,
  type CollapsibleProps as ExpoCollapsibleProps,
} from '@expo/ui';

import { useTheme } from '../theme';

export type CollapsibleProps = ExpoCollapsibleProps;

export function Collapsible({ labelStyle, ...props }: CollapsibleProps) {
  const { colors, tokens } = useTheme();
  return (
    <ExpoCollapsible
      labelStyle={{
        color: colors.foreground,
        fontSize: tokens.typography.body,
        ...labelStyle,
      }}
      {...props}
    />
  );
}
