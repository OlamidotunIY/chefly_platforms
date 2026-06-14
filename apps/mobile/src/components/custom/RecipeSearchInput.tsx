import { RNHostView as ExpoRNHostView } from '@expo/ui';
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { useTheme } from '@/components/theme';

export type RecipeSearchInputProps = Omit<TextInputProps, 'style'> & {
  width: number;
};

export function RecipeSearchInput({
  placeholderTextColor,
  selectionColor,
  width,
  ...props
}: RecipeSearchInputProps) {
  const { colors, tokens } = useTheme();

  return (
    <ExpoRNHostView
      matchContents
      style={{
        backgroundColor: colors.transparent,
        height: tokens.control.height,
        width,
      }}>
      <View
        style={[
          styles.container,
          {
            height: tokens.control.height,
            width,
          },
        ]}>
        <TextInput
          cursorColor={colors.primary}
          placeholderTextColor={placeholderTextColor ?? colors.mutedForeground}
          selectionColor={selectionColor ?? colors.accent}
          style={[
            styles.input,
            {
              color: colors.foreground,
              fontSize: tokens.typography.body,
            },
          ]}
          {...props}
        />
      </View>
    </ExpoRNHostView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  input: {
    height: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
