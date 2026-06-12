import {
  ExtendedFloatingActionButton,
  FloatingActionButton as ComposeFloatingActionButton,
  LargeFloatingActionButton,
  SmallFloatingActionButton,
  Text,
} from '@expo/ui/jetpack-compose';

import { useTheme } from '../theme';
import { AndroidHost } from './android-host';
import type { FloatingActionButtonProps } from './native-types';

export function FloatingActionButton({
  children,
  label,
  onPress,
  size = 'medium',
  disabled,
}: FloatingActionButtonProps) {
  const { colors } = useTheme();
  const common = {
    containerColor: colors.primary,
    onClick: disabled ? undefined : onPress,
  };

  return (
    <AndroidHost>
      {label ? (
        <ExtendedFloatingActionButton {...common}>
          {children ? (
            <ExtendedFloatingActionButton.Icon>{children}</ExtendedFloatingActionButton.Icon>
          ) : null}
          <ExtendedFloatingActionButton.Text>
            <Text>{label}</Text>
          </ExtendedFloatingActionButton.Text>
        </ExtendedFloatingActionButton>
      ) : size === 'small' ? (
        <SmallFloatingActionButton {...common}>
          <SmallFloatingActionButton.Icon>{children}</SmallFloatingActionButton.Icon>
        </SmallFloatingActionButton>
      ) : size === 'large' ? (
        <LargeFloatingActionButton {...common}>
          <LargeFloatingActionButton.Icon>{children}</LargeFloatingActionButton.Icon>
        </LargeFloatingActionButton>
      ) : (
        <ComposeFloatingActionButton {...common}>
          <ComposeFloatingActionButton.Icon>{children}</ComposeFloatingActionButton.Icon>
        </ComposeFloatingActionButton>
      )}
    </AndroidHost>
  );
}

export type { FloatingActionButtonProps } from './native-types';
