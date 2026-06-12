import type { JSX } from 'react';

import type { BadgeProps } from './native-types';

/**
 * Type declaration for React Native platform resolution.
 * Metro loads badge.android.tsx or badge.ios.tsx at runtime.
 */
export declare function Badge(props: BadgeProps): JSX.Element;

export type { BadgeProps };
