import { RNHostView } from '@/components/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../theme';

export type AuthAccountPromptProps = {
  actionLabel: string;
  message: string;
  onPress: () => void;
  width: number;
};

export function AuthAccountPrompt({
  actionLabel,
  message,
  onPress,
  width,
}: AuthAccountPromptProps) {
  const { colors, tokens } = useTheme();

  return (
    <RNHostView
      matchContents
      style={{
        backgroundColor: colors.transparent,
        height: tokens.control.compactHeight,
        width,
      }}>
      <View
        style={[
          styles.row,
          {
            height: tokens.control.compactHeight,
            width,
          },
        ]}>
        <Text style={[styles.text, { color: colors.mutedForeground }]}>
          {message}
        </Text>
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          onPress={onPress}>
          <Text style={[styles.action, { color: colors.primary }]}>
            {actionLabel}
          </Text>
        </Pressable>
      </View>
    </RNHostView>
  );
}

const styles = StyleSheet.create({
  action: {
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
});
