import {
  AlertDialog as ComposeAlertDialog,
  Button,
  Text,
} from '@expo/ui/jetpack-compose';

import { useTheme } from '../theme';
import { AndroidHost } from './android-host';
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
  if (!open) return null;

  return (
    <AndroidHost>
      <ComposeAlertDialog
        colors={{
          containerColor: colors.popover,
          titleContentColor: colors.popoverForeground,
          textContentColor: colors.mutedForeground,
        }}
        onDismissRequest={() => onOpenChange(false)}>
        <ComposeAlertDialog.Title>
          <Text>{title}</Text>
        </ComposeAlertDialog.Title>
        {message ? (
          <ComposeAlertDialog.Text>
            <Text>{message}</Text>
          </ComposeAlertDialog.Text>
        ) : null}
        <ComposeAlertDialog.ConfirmButton>
          <Button
            colors={{
              containerColor: destructive ? colors.destructive : colors.primary,
              contentColor: destructive
                ? colors.destructiveForeground
                : colors.primaryForeground,
            }}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}>
            <Text>{confirmLabel}</Text>
          </Button>
        </ComposeAlertDialog.ConfirmButton>
        <ComposeAlertDialog.DismissButton>
          <Button
            colors={{
              containerColor: colors.secondary,
              contentColor: colors.secondaryForeground,
            }}
            onClick={() => {
              onCancel?.();
              onOpenChange(false);
            }}>
            <Text>{cancelLabel}</Text>
          </Button>
        </ComposeAlertDialog.DismissButton>
      </ComposeAlertDialog>
    </AndroidHost>
  );
}

export type { AlertDialogProps } from './native-types';
