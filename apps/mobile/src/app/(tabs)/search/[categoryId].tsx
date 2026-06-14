import { SymbolView } from 'expo-symbols';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { SearchRouteHeader } from '@/components/custom/SearchRouteHeader';
import { useTheme } from '@/components/theme';
import {
  Button,
  Column,
  Progress,
  RNHostView,
  Row,
  Screen,
  ScrollView,
  SearchBar,
  Spacer,
  Text,
} from '@/components/ui';
import { hydrateRecipeCategories } from '@/lib/recipe-categories';
import { useDeviceDimensions } from '@/lib/device-dimensions';
import { useCategoryStore } from '@chefly/store';

export default function SubCategoriesScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { width } = useDeviceDimensions();
  const { colors, tokens } = useTheme();
  const categories = useCategoryStore((state) => state.categories);
  const status = useCategoryStore((state) => state.status);
  const [query, setQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const category = categories.find((item) => item.id === categoryId);
  const normalizedQuery = query.trim().toLowerCase();
  const subCategories =
    category?.subCategories.filter(
      (subCategory) =>
        !normalizedQuery ||
        subCategory.name.toLowerCase().includes(normalizedQuery) ||
        subCategory.group.toLowerCase().includes(normalizedQuery),
    ) ?? [];
  const groupedSubCategories = subCategories.reduce<
    Record<string, typeof subCategories>
  >(
    (groups, subCategory) => {
      const group = subCategory.group || 'Other';

      groups[group] = [...(groups[group] ?? []), subCategory];
      return groups;
    },
    {},
  );

  useEffect(() => {
    if (status === 'idle') {
      void hydrateRecipeCategories().catch(() => undefined);
    }
  }, [status]);

  return (
    <Screen
      contentPaddingHorizontal={tokens.spacing.none}
      spacing={tokens.spacing.none}>
      <SearchRouteHeader
        onSearch={() => setSearchVisible((visible) => !visible)}
        searchAccessibilityLabel="Search subcategories"
      />

      {searchVisible ? (
        <Column
          style={{
            paddingHorizontal: tokens.spacing.lg,
            paddingBottom: tokens.spacing.md,
            width,
          }}>
          <SearchBar
            onChangeText={setQuery}
            placeholder="Search subcategories"
            value={query}
          />
        </Column>
      ) : null}

      <ScrollView
        showsIndicators={false}
        style={{
          backgroundColor: colors.background,
          width,
        }}>
        {status === 'idle' || status === 'loading' ? (
          <Column
            style={{
              paddingHorizontal: tokens.spacing.lg,
              paddingVertical: tokens.spacing.xxl,
              width,
            }}>
            <Progress label="Loading subcategories" variant="circular" />
          </Column>
        ) : status === 'error' ? (
          <Column
            spacing={tokens.spacing.md}
            style={{
              paddingHorizontal: tokens.spacing.lg,
              paddingVertical: tokens.spacing.xxl,
              width,
            }}>
            <Text textStyle={{ color: colors.destructive }}>
              Subcategories could not be loaded.
            </Text>
            <Button
              label="Try again"
              onPress={() => {
                void hydrateRecipeCategories(true).catch(() => undefined);
              }}
              variant="outlined"
            />
          </Column>
        ) : !category ? (
          <Column
            spacing={tokens.spacing.sm}
            style={{
              paddingHorizontal: tokens.spacing.lg,
              paddingVertical: tokens.spacing.xxl,
              width,
            }}>
            <Text textStyle={{ fontWeight: '700' }}>Category not found</Text>
            <Text textStyle={{ color: colors.mutedForeground }}>
              This category is no longer available.
            </Text>
          </Column>
        ) : (
          <Column spacing={tokens.spacing.xxl} style={{ width }}>
            <Column
              alignment="center"
              spacing={tokens.spacing.sm}
              style={{
                paddingHorizontal: tokens.spacing.xl,
                paddingVertical: tokens.spacing.xxl,
                width,
              }}>
              <Text
                textStyle={{
                  fontSize: tokens.typography.headline,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                {category.name}
              </Text>
              <Text
                textStyle={{
                  color: colors.mutedForeground,
                  textAlign: 'center',
                }}>
                {category.description ||
                  `Explore recipes in ${category.name}.`}
              </Text>
            </Column>

            {Object.entries(groupedSubCategories).map(([group, items]) => (
              <Column
                key={group}
                spacing={tokens.spacing.xs}
                style={{
                  paddingHorizontal: tokens.spacing.lg,
                  width,
                }}>
                <Text
                  textStyle={{
                    color: colors.mutedForeground,
                    fontSize: tokens.typography.caption,
                    fontWeight: '700',
                  }}>
                  {group}
                </Text>
                {items.map((subCategory) => (
                  <Row
                    key={subCategory.id}
                    alignment="center"
                    onPress={() =>
                      router.push({
                        pathname:
                          '/(tabs)/search/recipes/[categorySlug]/[subCategorySlug]',
                        params: {
                          categorySlug: category.slug,
                          subCategorySlug: subCategory.slug,
                        },
                      })
                    }
                    style={{
                      paddingVertical: tokens.spacing.md,
                      width: width - tokens.spacing.lg * 2,
                    }}>
                    <Text textStyle={{ fontWeight: '600' }}>
                      {subCategory.name}
                    </Text>
                    <Spacer flexible />
                    <RNHostView
                      matchContents
                      style={{
                        backgroundColor: colors.transparent,
                        height: tokens.control.iconSize,
                        width: tokens.control.iconSize,
                      }}>
                      <SymbolView
                        name={{
                          android: 'chevron_right',
                          ios: 'chevron.right',
                        }}
                        size={tokens.control.iconSize}
                        tintColor={colors.mutedForeground}
                      />
                    </RNHostView>
                  </Row>
                ))}
              </Column>
            ))}
            {subCategories.length === 0 ? (
              <Column
                style={{
                  paddingHorizontal: tokens.spacing.lg,
                  paddingVertical: tokens.spacing.xxl,
                  width,
                }}>
                <Text textStyle={{ color: colors.mutedForeground }}>
                  No subcategories match your search.
                </Text>
              </Column>
            ) : null}
          </Column>
        )}
      </ScrollView>
    </Screen>
  );
}
