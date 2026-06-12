import { List as ExpoList, type ListProps as ExpoListProps } from '@expo/ui';

import { useTheme } from '../theme';

export type ListProps = ExpoListProps;

export function List(props: ListProps) {
  useTheme();
  return <ExpoList {...props} />;
}
