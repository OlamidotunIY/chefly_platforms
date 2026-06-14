import { TabHeader } from '@/components/custom/TabHeader';
import { Screen, SearchBar } from '@/components/ui';
import { useState } from 'react';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  return (
    <Screen>
      <TabHeader
        subtitle="Find recipes, ingredients, creators, and collections."
        title="Search"
      />
      <SearchBar
        onChangeText={setQuery}
        placeholder="Search recipes and ingredients"
        value={query}
      />
    </Screen>
  );
}
