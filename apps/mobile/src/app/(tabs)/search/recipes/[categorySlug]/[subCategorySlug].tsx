import { router, useLocalSearchParams } from 'expo-router';

import { SearchRouteHeader } from '@/components/custom/SearchRouteHeader';
import { useTheme } from '@/components/theme';
import { Screen } from '@/components/ui';

export default function CategoryRecipesScreen() {
  useLocalSearchParams<{
    categorySlug: string;
    subCategorySlug: string;
  }>();
  const { tokens } = useTheme();

  return (
    <Screen
      contentPaddingHorizontal={tokens.spacing.none}
      spacing={tokens.spacing.none}>
      <SearchRouteHeader
        onSearch={() => router.push('/(tabs)/search')}
        searchAccessibilityLabel="Search recipes"
      />
    </Screen>
  );
}
