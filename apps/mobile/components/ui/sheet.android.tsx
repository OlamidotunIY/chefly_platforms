import { ModalBottomSheet } from '@expo/ui/jetpack-compose';

import { useTheme } from '../theme';
import { AndroidHost } from './android-host';
import type { SheetProps } from './native-types';

export function Sheet({ open, onOpenChange, children, showDragIndicator = true }: SheetProps) {
  const { colors } = useTheme();
  if (!open) return null;
  return (
    <AndroidHost>
      <ModalBottomSheet
        containerColor={colors.card}
        contentColor={colors.cardForeground}
        onDismissRequest={() => onOpenChange(false)}
        scrimColor={colors.overlay}
        showDragHandle={showDragIndicator}>
        {children}
      </ModalBottomSheet>
    </AndroidHost>
  );
}

export type { SheetProps } from './native-types';
