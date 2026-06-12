import type { UniversalStyle } from '@expo/ui';

export function mergeUniversalStyle(
  base: UniversalStyle,
  override?: UniversalStyle,
): UniversalStyle {
  return { ...base, ...override };
}
