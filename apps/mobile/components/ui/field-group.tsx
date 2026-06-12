import { FieldGroup as ExpoFieldGroup, type FieldGroupProps as ExpoFieldGroupProps } from '@expo/ui';

import { useTheme } from '../theme';

export type FieldGroupProps = ExpoFieldGroupProps;

function FieldGroupBase(props: FieldGroupProps) {
  useTheme();
  return <ExpoFieldGroup {...props} />;
}

export const FieldGroup = Object.assign(FieldGroupBase, {
  Section: ExpoFieldGroup.Section,
  SectionHeader: ExpoFieldGroup.SectionHeader,
  SectionFooter: ExpoFieldGroup.SectionFooter,
});
