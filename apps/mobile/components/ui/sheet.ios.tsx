import { BottomSheet as SwiftBottomSheet, VStack } from '@expo/ui/swift-ui';
import {
  background,
  padding,
  presentationDragIndicator,
} from '@expo/ui/swift-ui/modifiers';

import { useTheme } from '../theme';
import { IOSHost } from './ios-host';
import type { SheetProps } from './native-types';

export function Sheet({ open, onOpenChange, children, showDragIndicator = true }: SheetProps) {
  const { colors, tokens } = useTheme();
  return (
    <IOSHost>
      <SwiftBottomSheet isPresented={open} onIsPresentedChange={onOpenChange}>
        <VStack
          modifiers={[
            padding({ all: tokens.spacing.xl }),
            background(colors.card),
            presentationDragIndicator(showDragIndicator ? 'visible' : 'hidden'),
          ]}>
          {children}
        </VStack>
      </SwiftBottomSheet>
    </IOSHost>
  );
}

export type { SheetProps } from './native-types';
