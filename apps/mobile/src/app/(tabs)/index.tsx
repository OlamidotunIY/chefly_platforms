import { SymbolView } from 'expo-symbols';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { useTheme } from '@/components/theme';
import { Logo } from '@/components/custom/Logo';
import { TabHeader } from '@/components/custom/TabHeader';
import { RNHostView, Screen, ScrollView } from '@/components/ui';

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
          <View
            style={[
              styles.headerRow,
              {
                height: 52,
                width: contentWidth,
              },
            ]}>
            <Logo size={64} />

            <View style={[styles.headerActions, { gap: tokens.spacing.md }]}>
              <View style={styles.iconContainer}>
                <SymbolView
                  name={{ android: 'shopping_cart', ios: 'cart' }}
                  size={tokens.control.iconSize}
                  tintColor={colors.foreground}
                />
              </View>
              <View style={styles.iconContainer}>
                <SymbolView
                  name={{ android: 'dashboard', ios: 'square.grid.2x2.fill' }}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
