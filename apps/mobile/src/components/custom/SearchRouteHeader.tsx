import { SymbolView } from 'expo-symbols';
import { router } from 'expo-router';
import { Pressable, StyleSheet, useWindowDimensions } from 'react-native';

import { useTheme } from '@/components/theme';
import { RNHostView, Row, Spacer } from '@/components/ui';

import { TabHeader } from './TabHeader';

export type SearchRouteHeaderProps = {
  onSearch: () => void;
  searchAccessibilityLabel?: string;
};

export function SearchRouteHeader({
  onSearch,
  searchAccessibilityLabel = 'Search recipes',
}: SearchRouteHeaderProps) {
  const { width } = useWindowDimensions();
  const { colors, tokens } = useTheme();
  const contentWidth = width - tokens.spacing.lg * 2;

  return (
    <TabHeader
      position="fixed"
      style={{
        paddingHorizontal: tokens.spacing.lg,
        width,
      }}>
      <Row alignment="center" style={{ width: contentWidth }}>
        <RNHostView
          matchContents
          style={{
            backgroundColor: colors.transparent,
            height: tokens.control.touchTarget,
            width: tokens.control.touchTarget,
          }}>
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            hitSlop={tokens.spacing.sm}
            onPress={() => router.back()}
            style={[
              styles.button,
              {
                height: tokens.control.touchTarget,
                width: tokens.control.touchTarget,
              },
            ]}>
            <SymbolView
              name={{ android: 'arrow_back', ios: 'chevron.left' }}
              size={tokens.control.iconSize + 2}
              tintColor={colors.foreground}
            />
          </Pressable>
        </RNHostView>
        <Spacer flexible />
        <RNHostView
          matchContents
          style={{
            backgroundColor: colors.transparent,
            height: tokens.control.touchTarget,
            width: tokens.control.touchTarget,
          }}>
          <Pressable
            accessibilityLabel={searchAccessibilityLabel}
            accessibilityRole="button"
            hitSlop={tokens.spacing.sm}
            onPress={onSearch}
            style={[
              styles.button,
              {
                height: tokens.control.touchTarget,
                width: tokens.control.touchTarget,
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
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
