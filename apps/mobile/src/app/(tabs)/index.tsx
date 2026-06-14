import { SymbolView } from 'expo-symbols';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { useTheme } from '@/components/theme';
import { Logo } from '@/components/custom/Logo';
import { TabHeader } from '@/components/custom/TabHeader';
import { Button, RNHostView, Screen, ScrollView } from '@/components/ui';

export default function FeaturedScreen() {
  const { width } = useWindowDimensions();
  const { colors, tokens } = useTheme();
  const contentWidth = width - tokens.spacing.lg * 2;

  return (
    <Screen>
      <TabHeader position="fixed" style={{ width: contentWidth }}>
        <RNHostView
          matchContents
          style={{
            backgroundColor: colors.background,
            height: 52,
            width: contentWidth,
          }}>
          <View style={styles.headerRow}>
            <Logo size={46} />

            <View style={[styles.headerActions, { gap: tokens.spacing.md }]}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: colors.secondary,
                    borderRadius: tokens.radius.full,
                  },
                ]}>
                <SymbolView
                  name={{ android: 'shopping_cart', ios: 'cart' }}
                  size={tokens.control.iconSize}
                  tintColor={colors.foreground}
                />
              </View>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: colors.secondary,
                    borderRadius: tokens.radius.full,
                  },
                ]}>
                <SymbolView
                  name={{ android: 'category', ios: 'square.grid.2x2' }}
                  size={tokens.control.iconSize}
                  tintColor={colors.foreground}
                />
              </View>
            </View>
          </View>
        </RNHostView>
      </TabHeader>

      <ScrollView
        showsIndicators={false}
        style={{
          backgroundColor: colors.background,
          width: contentWidth,
        }}>
        <Button label="Explore recipes" />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerRow: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
});
