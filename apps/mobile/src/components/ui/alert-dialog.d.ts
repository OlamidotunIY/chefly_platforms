import type { JSX } from 'react';

import type { AlertDialogProps } from './native-types';

/**
 * Type declaration for React Native platform resolution.
 * Metro loads alert-dialog.android.tsx or alert-dialog.ios.tsx at runtime.
 */
export declare function AlertDialog(props: AlertDialogProps): JSX.Element | null;

export type { AlertDialogProps };
