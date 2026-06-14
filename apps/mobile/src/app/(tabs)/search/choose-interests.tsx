import { SymbolView } from 'expo-symbols';
import { router } from 'expo-router';
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native';

import { useTheme } from '@/components/theme';
import {
  Button,
  Column,
  RNHostView,
  Row,
  Screen,
  ScrollView,
  Spacer,
  Text,
} from '@/components/ui';

type Interest = {
  description: string;
  id: string;
  name: string;
};

const availableInterests: Interest[] = [];

export default function ChooseInterestsScreen() {
  const { height, width } = useWindowDimensions();
  const { colors, tokens } = useTheme();
  const scrollHeight =
    height -
    tokens.spacing.lg * 2 -
    tokens.control.touchTarget -
    tokens.spacing.lg -
    tokens.control.height -
    tokens.spacing.md;

  return (
    <Screen
      contentPaddingHorizontal={tokens.spacing.none}
      contentPaddingVertical={tokens.spacing.lg}
      spacing={tokens.spacing.none}>
      <Row
        alignment="center"
        style={{
          paddingHorizontal: tokens.spacing.lg,
          paddingBottom: tokens.spacing.lg,
          width,
        }}>
        <Spacer flexible />
        <RNHostView
          matchContents
          style={{
            backgroundColor: colors.transparent,
            height: tokens.control.touchTarget,
            width: tokens.control.touchTarget,
          }}>
          <Pressable
            accessibilityLabel="Close interest selection"
            accessibilityRole="button"
            hitSlop={tokens.spacing.sm}
            onPress={() => router.back()}
            style={[
              styles.closeButton,
              {
                height: tokens.control.touchTarget,
                width: tokens.control.touchTarget,
              },
            ]}>
            <SymbolView
              name={{ android: 'close', ios: 'xmark' }}
              size={tokens.control.iconSize + 2}
              tintColor={colors.foreground}
            />
          </Pressable>
        </RNHostView>
      </Row>

      <ScrollView
        showsIndicators={false}
        style={{
          backgroundColor: colors.background,
          height: scrollHeight,
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
              fontSize: tokens.typography.headline,
              fontWeight: '700',
            }}>
            Choose what inspires you
          </Text>
          <Text textStyle={{ color: colors.mutedForeground }}>
            Select the interests you enjoy to personalize your recipe
            discovery experience.
          </Text>

          {availableInterests.map((interest) => (
            <Column
              key={interest.id}
              spacing={tokens.spacing.xs}
              style={{
                paddingVertical: tokens.spacing.lg,
                width: width - tokens.spacing.lg * 2,
              }}>
              <Text textStyle={{ fontWeight: '700' }}>{interest.name}</Text>
              <Text textStyle={{ color: colors.mutedForeground }}>
                {interest.description}
              </Text>
            </Column>
          ))}
        </Column>
      </ScrollView>

      <Column
        style={{
          backgroundColor: colors.background,
          paddingHorizontal: tokens.spacing.lg,
          paddingTop: tokens.spacing.md,
          width,
        }}>
        <Button
          fullWidth
          label="Save Interest"
          onPress={() => router.back()}
        />
      </Column>
    </Screen>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
