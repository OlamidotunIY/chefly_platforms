import { Form as SwiftForm } from '@expo/ui/swift-ui';

import { IOSHost } from './ios-host';
import type { FormProps } from './native-types';

export function Form({ children }: FormProps) {
  return (
    <IOSHost>
      <SwiftForm>{children}</SwiftForm>
    </IOSHost>
  );
}

export type { FormProps } from './native-types';
