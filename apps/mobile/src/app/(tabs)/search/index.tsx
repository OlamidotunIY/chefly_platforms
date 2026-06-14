import { SymbolView } from 'expo-symbols';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native';

import { TabHeader } from '@/components/custom/TabHeader';
import { useTheme } from '@/components/theme';
import {
  Button,
  Column,
  Divider,
  Progress,
  RNHostView,
  Row,
  Screen,
  ScrollView,
  Spacer,
  Text,
} from '@/components/ui';
import { hydrateRecipeCategories } from '@/lib/recipe-categories';
import { useCategoryStore } from '@chefly/store';

type CategoryTab = 'categories' | 'interest';

type Interest = {
  description: string;
  id: string;
  name: string;
  relatedInterestIds: string[];
};

const selectedInterests: Interest[] = [];
const availableInterests: Interest[] = [];

export default function SearchScreen() {
  const { width } = useWindowDimensions();
  const { colors, tokens } = useTheme();
  const categories = useCategoryStore((state) => state.categories);
  const status = useCategoryStore((state) => state.status);
  const [activeTab, setActiveTab] = useState<CategoryTab>('categories');

  const filteredCategories = categories;
  const selectedInterestIds = new Set(
    selectedInterests.map((interest) => interest.id),
  );
  const relatedInterestIds = new Set(
    selectedInterests.flatMap((interest) => interest.relatedInterestIds),
  );
  const suggestedInterests =
    selectedInterests.length === 0
      ? availableInterests
      : availableInterests.filter(
          (interest) =>
            relatedInterestIds.has(interest.id) &&
            !selectedInterestIds.has(interest.id),
        );

  return (
    <Screen
      contentPaddingHorizontal={tokens.spacing.none}
      spacing={tokens.spacing.none}>
      <TabHeader
        position="fixed"
        style={{
          paddingHorizontal: tokens.spacing.lg,
          width,
        }}>
        <Row alignment="center" style={{ width: width - tokens.spacing.lg * 2 }}>
          <Text
            textStyle={{
              color: colors.foreground,
              fontSize: tokens.typography.headline,
              fontWeight: '700',
            }}>
            Categories
          </Text>
          <Spacer flexible />
          <RNHostView
            matchContents
            style={{
              backgroundColor: colors.transparent,
              height: tokens.control.touchTarget,
              width: tokens.control.touchTarget,
            }}>
            <Pressable
              accessibilityLabel="Search categories"
              accessibilityRole="button"
              hitSlop={tokens.spacing.sm}
              onPress={() => router.push('/(app)/recipe-search')}
              style={[
                styles.headerButton,
                {
                  height: tokens.control.iconSize,
                  width: tokens.control.iconSize,
                },
              ]}>
              <SymbolView
                name={{ android: 'search', ios: 'magnifyingglass' }}
                size={tokens.control.iconSize + 2}
                tintColor={colors.foreground}
              />
            </Pressable>
          </RNHostView>
        </Row>
      </TabHeader>

      <Row alignment="center" spacing={tokens.spacing.none} style={{ width }}>
        <Column
          alignment="center"
          onPress={() => setActiveTab('categories')}
          spacing={tokens.spacing.md}
          style={{
            paddingTop: tokens.spacing.md,
            width: width / 2,
          }}>
          <Text
            textStyle={{
              color:
                activeTab === 'categories'
                  ? colors.primary
                  : colors.mutedForeground,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Categories
          </Text>
          <Column
            style={{
              backgroundColor:
                activeTab === 'categories'
                  ? colors.primary
                  : colors.transparent,
              height: tokens.border.strong,
              width: width / 2,
            }}
          />
        </Column>
        <Column
          alignment="center"
          onPress={() => setActiveTab('interest')}
          spacing={tokens.spacing.md}
          style={{
            paddingTop: tokens.spacing.md,
            width: width / 2,
          }}>
          <Text
            textStyle={{
              color:
                activeTab === 'interest'
                  ? colors.primary
                  : colors.mutedForeground,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Interests
          </Text>
          <Column
            style={{
              backgroundColor:
                activeTab === 'interest'
                  ? colors.primary
                  : colors.transparent,
              height: tokens.border.strong,
              width: width / 2,
            }}
          />
        </Column>
      </Row>
      <Divider />

      <ScrollView
        showsIndicators={false}
        style={{
          backgroundColor: colors.background,
          width,
        }}>
        {activeTab === 'interest' ? (
          <Column
            spacing={tokens.spacing.xxl}
            style={{
              paddingVertical: tokens.spacing.xxl,
              width,
            }}>
            <Column
              spacing={tokens.spacing.sm}
              style={{
                paddingHorizontal: tokens.spacing.lg,
                width,
              }}>
              <Text
                textStyle={{
                  fontSize: tokens.typography.title,
                  fontWeight: '700',
                }}>
                Your Interest
              </Text>
              {selectedInterests.length === 0 ? (
                <>
                  <Text textStyle={{ color: colors.mutedForeground }}>
                    Choose your interest for a better discovery experience.
                  </Text>
                  <Button
                    label="Choose Interest"
                    onPress={() => router.push('/(app)/choose-interests')}
                    borderRadius={0}
                    fullWidth
                  />
                </>
              ) : (
                selectedInterests.map((interest) => (
                  <Column key={interest.id} spacing={tokens.spacing.none}>
                    <Column
                      spacing={tokens.spacing.xs}
                      style={{
                        paddingVertical: tokens.spacing.lg,
                        width: width - tokens.spacing.lg * 2,
                      }}>
                      <Text textStyle={{ fontWeight: '700' }}>
                        {interest.name}
                      </Text>
                      <Text textStyle={{ color: colors.mutedForeground }}>
                        {interest.description}
                      </Text>
                    </Column>
                    <Divider />
                  </Column>
                ))
              )}
            </Column>

            <Column spacing={tokens.spacing.sm} style={{ width }}>
              <Text
                textStyle={{
                  fontSize: tokens.typography.title,
                  fontWeight: '700',
                }}
                style={{ paddingHorizontal: tokens.spacing.lg }}>
                You may also like
              </Text>
              {suggestedInterests.map((interest) => (
                <Column key={interest.id} spacing={tokens.spacing.none}>
                  <Column
                    spacing={tokens.spacing.xs}
                    style={{
                      paddingHorizontal: tokens.spacing.lg,
                      paddingVertical: tokens.spacing.lg,
                      width,
                    }}>
                    <Text textStyle={{ fontWeight: '700' }}>
                      {interest.name}
                    </Text>
                    <Text textStyle={{ color: colors.mutedForeground }}>
                      {interest.description}
                    </Text>
                  </Column>
                  <Divider />
                </Column>
              ))}
            </Column>
          </Column>
        ) : status === 'idle' || status === 'loading' ? (
          <Column
            style={{
              paddingHorizontal: tokens.spacing.lg,
              paddingVertical: tokens.spacing.xxl,
              width,
            }}>
            <Progress label="Loading categories" variant="circular" />
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
              Categories could not be loaded.
            </Text>
            <Button
              label="Try again"
              onPress={() => {
                void hydrateRecipeCategories(true).catch(() => undefined);
              }}
              variant="outlined"
            />
          </Column>
        ) : (
          <Column spacing={tokens.spacing.none} style={{ width }}>
            {filteredCategories.map((category) => (
              <Column key={category.id} spacing={tokens.spacing.none}>
                <Column
                  onPress={() =>
                    router.push({
                      pathname: '/(tabs)/search/[categoryId]',
                      params: { categoryId: category.id },
                    })
                  }
                  spacing={tokens.spacing.xs}
                  style={{
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.lg,
                    width,
                  }}>
                  <Text textStyle={{ fontWeight: '700' }}>{category.name}</Text>
                  <Text textStyle={{ color: colors.mutedForeground }}>
                    {category.description ||
                      `Explore recipes in ${category.name}.`}
                  </Text>
                </Column>
                <Divider />
              </Column>
            ))}
            {filteredCategories.length === 0 ? (
              <Column
                style={{
                  paddingHorizontal: tokens.spacing.lg,
                  paddingVertical: tokens.spacing.xxl,
                  width,
                }}>
                <Text textStyle={{ color: colors.mutedForeground }}>
                  No categories match your search.
                </Text>
              </Column>
            ) : null}
          </Column>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
