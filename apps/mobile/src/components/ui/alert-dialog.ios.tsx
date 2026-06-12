import { Alert, Button, Text } from '@expo/ui/swift-ui';
import { buttonStyle, tint } from '@expo/ui/swift-ui/modifiers';

import { useTheme } from '../theme';
import { IOSHost } from './ios-host';
import type { AlertDialogProps } from './native-types';

export function AlertDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive,
  onConfirm,
  onCancel,
  onOpenChange,
}: AlertDialogProps) {
  const { colors } = useTheme();
  return (
    <IOSHost>
      <Alert
        title={title}
        isPresented={open}
        onIsPresentedChange={onOpenChange}>
        <Alert.Trigger>
          <Button label="" />
        </Alert.Trigger>
        {message ? (
          <Alert.Message>
            <Text>{message}</Text>
          </Alert.Message>
        ) : null}
        <Alert.Actions>
          <Button
            label={cancelLabel}
            role="cancel"
            onPress={() => {
              onCancel?.();
              onOpenChange(false);
            }}
          />
          <Button
            label={confirmLabel}
            role={destructive ? 'destructive' : 'default'}
            modifiers={[buttonStyle('borderedProminent'), tint(colors.primary)]}
            onPress={() => {
              onConfirm();
              onOpenChange(false);
            }}
          />
        </Alert.Actions>
      </Alert>
    </IOSHost>
  );
}

export type { AlertDialogProps } from './native-types';
