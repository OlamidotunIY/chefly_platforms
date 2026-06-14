import { SymbolView } from 'expo-symbols';
import { router } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import { useTheme } from '@/components/theme';
import {
  Button,
  Column,
  RNHostView,
  Row,
  Screen,
  ScrollView,
  Text,
} from '@/components/ui';
import { useDeviceDimensions } from '@/lib/device-dimensions';

type Interest = {
  description: string;
  id: string;
  name: string;
};

const availableInterests: Interest[] = [];

export default function ChooseInterestsScreen() {
  const { height, width } = useDeviceDimensions();
  const { colors, tokens } = useTheme();
  const closeButtonSize = 30;
  const bottomActionHeight =
    tokens.control.height + tokens.spacing.lg * 3.5;
  const scrollHeight =
    height -
    closeButtonSize -
    bottomActionHeight -
    tokens.spacing.lg * 2;

  return (
    <Screen
      contentPaddingHorizontal={tokens.spacing.none}
      contentPaddingVertical={tokens.spacing.none}
      spacing={tokens.spacing.none}>
      <Row
        alignment="center"
        style={{
          paddingHorizontal: tokens.spacing.lg,
          paddingTop: tokens.spacing.xxxl,
          paddingBottom: tokens.spacing.sm,
          width,
        }}>
        <RNHostView
          matchContents
          style={{
            backgroundColor: colors.transparent,
            height: closeButtonSize,
            width: closeButtonSize,
          }}>
          <Pressable
            accessibilityLabel="Close interest selection"
            accessibilityRole="button"
            hitSlop={tokens.spacing.sm}
            onPress={() => router.back()}
            style={[
              styles.closeButton,
              {
                height: closeButtonSize,
                width: closeButtonSize,
              },
            ]}>
            <SymbolView
              name={{ android: 'close', ios: 'xmark' }}
              size={30}
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
          backgroundColor: colors.secondary,
          height: bottomActionHeight,
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.lg,
          width,

        }}>
        <Button
          borderRadius={tokens.radius.none}
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
