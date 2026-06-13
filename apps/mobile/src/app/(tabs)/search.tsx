import { useTheme } from '@/components/theme';
import { Screen, SearchBar, Text } from '@/components/ui';
import { useState } from 'react';

export default function SearchScreen() {
  const { colors, tokens } = useTheme();
  const [query, setQuery] = useState('');

  return (
    <Screen>
      <Text
        textStyle={{
          fontSize: tokens.typography.headline,
          fontWeight: '700',
        }}>
        Search
      </Text>
      <SearchBar
        onChangeText={setQuery}
        placeholder="Search recipes and ingredients"
        value={query}
      />
      <Text textStyle={{ color: colors.mutedForeground }}>
        Find recipes, ingredients, creators, and collections.
      </Text>
    </Screen>
  );
}
