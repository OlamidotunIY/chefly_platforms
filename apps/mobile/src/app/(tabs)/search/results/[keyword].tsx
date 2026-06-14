import { router, useLocalSearchParams } from 'expo-router';

import { SearchRouteHeader } from '@/components/custom/SearchRouteHeader';
import { useTheme } from '@/components/theme';
import { Screen } from '@/components/ui';

export default function RecipeSearchResultsScreen() {
  useLocalSearchParams<{ keyword: string }>();
  const { tokens } = useTheme();

  return (
    <Screen
      contentPaddingHorizontal={tokens.spacing.none}
      spacing={tokens.spacing.none}>
      <SearchRouteHeader
        onSearch={() => router.push('/(tabs)/search')}
        searchAccessibilityLabel="Start another search"
      />
    </Screen>
  );
}
