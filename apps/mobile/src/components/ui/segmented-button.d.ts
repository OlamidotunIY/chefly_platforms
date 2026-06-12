import type { JSX } from 'react';

import type { SegmentedButtonProps, SegmentedOption } from './native-types';

export declare function SegmentedButton<T extends string | number>(
  props: SegmentedButtonProps<T>,
): JSX.Element;

export type { SegmentedButtonProps, SegmentedOption };
