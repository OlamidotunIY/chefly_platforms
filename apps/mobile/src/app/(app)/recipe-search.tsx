import { SymbolView } from 'expo-symbols';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native';

import { RecipeSearchInput } from '@/components/custom/RecipeSearchInput';
import { useTheme } from '@/components/theme';
import {
  Column,
  RNHostView,
  Row,
  Screen,
  Text,
} from '@/components/ui';

type SearchTarget = 'chefs' | 'recipes';

export default function RecipeSearchScreen() {
  const { width } = useWindowDimensions();
  const { colors, tokens } = useTheme();
  const [query, setQuery] = useState('');
  const [searchTarget, setSearchTarget] = useState<SearchTarget>('recipes');
  const buttonSize = tokens.control.iconSize;
  const inputWidth = width - tokens.spacing.lg * 3 - buttonSize;

  function submitSearch() {
    const keyword = query.trim();

    if (!keyword) {
      return;
    }

    router.push({
      pathname: '/(tabs)/search/results/[keyword]',
      params: { keyword, type: searchTarget },
    });
  }

  return (
    <Screen
      contentPaddingHorizontal={tokens.spacing.none}
      spacing={tokens.spacing.none}>
      <Row
        alignment="center"
        spacing={tokens.spacing.md}
        style={{
          paddingHorizontal: tokens.spacing.lg,
          width,
        }}>
        <RNHostView
          matchContents
          style={{
            backgroundColor: colors.transparent,
            height: buttonSize,
            width: buttonSize,
          }}>
          <Pressable
            accessibilityLabel="Close recipe search"
            accessibilityRole="button"
            hitSlop={tokens.spacing.sm}
            onPress={() => router.back()}
            style={[
              styles.backButton,
              {
                height: buttonSize,
                width: buttonSize,
              },
            ]}>
            <SymbolView
              name={{ android: 'arrow_back', ios: 'chevron.left' }}
              size={tokens.control.iconSize + 2}
              tintColor={colors.foreground}
            />
          </Pressable>
        </RNHostView>

        <RecipeSearchInput
          autoFocus
          onChangeText={setQuery}
          onSubmitEditing={submitSearch}
          placeholder={
            searchTarget === 'recipes' ? 'Search recipes' : 'Search chefs'
          }
          returnKeyType="search"
          value={query}
          width={inputWidth}
        />
      </Row>

      <Row
        alignment="center"
        spacing={tokens.spacing.none}
        style={{ width }}>
        <Column
          alignment="center"
          onPress={() => setSearchTarget('recipes')}
          spacing={tokens.spacing.md}
          style={{
            paddingTop: tokens.spacing.lg,
            width: width / 2,
          }}>
          <Text
            textStyle={{
              color:
                searchTarget === 'recipes'
                  ? colors.primary
                  : colors.mutedForeground,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Recipes
          </Text>
          <Column
            style={{
              backgroundColor:
                searchTarget === 'recipes'
                  ? colors.primary
                  : colors.transparent,
              height: tokens.border.strong,
              width: width / 2,
            }}
          />
        </Column>
        <Column
          alignment="center"
          onPress={() => setSearchTarget('chefs')}
          spacing={tokens.spacing.md}
          style={{
            paddingTop: tokens.spacing.lg,
            width: width / 2,
          }}>
          <Text
            textStyle={{
              color:
                searchTarget === 'chefs'
                  ? colors.primary
                  : colors.mutedForeground,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Chefs
          </Text>
          <Column
            style={{
              backgroundColor:
                searchTarget === 'chefs'
                  ? colors.primary
                  : colors.transparent,
              height: tokens.border.strong,
              width: width / 2,
            }}
          />
        </Column>
      </Row>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
