import type { JSX } from 'react';

import type { DropdownMenuProps, MenuOption } from './native-types';

export declare function DropdownMenu<T extends string | number>(
  props: DropdownMenuProps<T>,
): JSX.Element;

export type { DropdownMenuProps, MenuOption };
