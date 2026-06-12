import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export type AlertDialogProps = {
  open: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  onOpenChange: (open: boolean) => void;
};

export type BadgeProps = {
  children?: ReactNode;
  tone?: 'primary' | 'secondary' | 'destructive' | 'muted';
};

export type CardProps = {
  children?: ReactNode;
  variant?: 'filled' | 'outlined' | 'elevated';
  style?: StyleProp<ViewStyle>;
};

export type DateTimePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
  label?: string;
  minimumDate?: Date;
  maximumDate?: Date;
};

export type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  inset?: number;
};

export type MenuOption<T extends string | number = string> = {
  label: string;
  value: T;
  disabled?: boolean;
  destructive?: boolean;
};

export type DropdownMenuProps<T extends string | number = string> = {
  label: string;
  options: MenuOption<T>[];
  value?: T;
  onValueChange: (value: T) => void;
  disabled?: boolean;
};

export type FloatingActionButtonProps = {
  children?: ReactNode;
  label?: string;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
};

export type FormProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export type ProgressProps = {
  value?: number | null;
  variant?: 'linear' | 'circular';
  label?: string;
};

export type SearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export type SegmentedOption<T extends string | number = string> = {
  label: string;
  value: T;
  disabled?: boolean;
};

export type SegmentedButtonProps<T extends string | number = string> = {
  options: SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
};

export type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
  showDragIndicator?: boolean;
};

export type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
