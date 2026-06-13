import type { ButtonProps as ExpoButtonProps } from '@expo/ui';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'link';
export type ButtonContentPadding =
  | number
  | {
      horizontal?: number;
      vertical?: number;
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };

export type ButtonProps = Omit<ExpoButtonProps, 'variant'> & {
  borderRadius?: number;
  contentPadding?: ButtonContentPadding;
  fullWidth?: boolean;
  height?: number;
  loading?: boolean;
  loadingWidth?: number;
  variant?: ButtonVariant;
};

export declare function Button(props: ButtonProps): React.JSX.Element | null;
