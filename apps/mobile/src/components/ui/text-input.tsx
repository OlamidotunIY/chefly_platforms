import { RNHostView as ExpoRNHostView } from '@expo/ui';
import {
  SymbolView,
  type AndroidSymbol,
  type SFSymbol,
  type SymbolViewProps,
} from 'expo-symbols';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput as RNTextInput,
  View,
  useWindowDimensions,
  type TextInputProps as RNTextInputProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '../theme';

export type TextInputIconName = SymbolViewProps['name'];

const androidIconAliases: Partial<Record<SFSymbol, AndroidSymbol>> = {
  checkmark: 'check',
  envelope: 'mail',
  eye: 'visibility',
  'eye.slash': 'visibility_off',
  xmark: 'close',
};

function resolveIconName(name: TextInputIconName): SymbolViewProps['name'] {
  if (typeof name !== 'string') {
    return name;
  }

  return {
    ios: name as SFSymbol,
    android: androidIconAliases[name as SFSymbol] ?? (name as AndroidSymbol),
  };
}

export type TextInputProps = Omit<RNTextInputProps, 'style'> & {
  containerStyle?: StyleProp<ViewStyle>;
  height?: number;
  iconColor?: string;
  iconSize?: number;
  inputStyle?: StyleProp<TextStyle>;
  leftIcon?: TextInputIconName;
  onRightIconPress?: () => void;
  rightIcon?: TextInputIconName;
  rightIconAccessibilityLabel?: string;
  rightIconLoading?: boolean;
  /** @deprecated Use inputStyle instead. */
  textStyle?: TextStyle;
  width?: number;
};

export function TextInput({
  containerStyle,
  height,
  iconColor,
  iconSize,
  inputStyle,
  leftIcon,
  onRightIconPress,
  placeholderTextColor,
  rightIcon,
  rightIconAccessibilityLabel,
  rightIconLoading = false,
  selectionColor,
  textStyle,
  width,
  ...props
}: TextInputProps) {
  const viewport = useWindowDimensions();
  const { colors, tokens } = useTheme();
  const inputHeight = height ?? tokens.control.height;
  const inputWidth = width ?? viewport.width - tokens.spacing.xl * 2;
  const resolvedIconColor = iconColor ?? colors.mutedForeground;
  const resolvedIconSize = iconSize ?? tokens.control.iconSize;

  return (
    <ExpoRNHostView
      matchContents
      style={{
        backgroundColor: colors.transparent,
        height: inputHeight,
        width: inputWidth,
      }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            borderColor: colors.input,
            borderRadius: tokens.radius.md,
            borderWidth: tokens.border.regular,
            height: inputHeight,
            paddingHorizontal: tokens.spacing.md,
            width: inputWidth,
          },
          containerStyle,
        ]}>
        {leftIcon ? (
          <View style={[styles.icon, { marginRight: tokens.spacing.sm }]}>
            <SymbolView
              name={resolveIconName(leftIcon)}
              size={resolvedIconSize}
              tintColor={resolvedIconColor}
            />
          </View>
        ) : null}
        <RNTextInput
          cursorColor={colors.primary}
          placeholderTextColor={placeholderTextColor ?? colors.mutedForeground}
          selectionColor={selectionColor ?? colors.accent}
          style={[
            styles.input,
            {
              color: colors.foreground,
              fontSize: tokens.typography.body,
            },
            textStyle,
            inputStyle,
          ]}
          {...props}
        />
        {rightIconLoading ? (
          <ActivityIndicator
            color={resolvedIconColor}
            size="small"
            style={{ marginLeft: tokens.spacing.sm }}
          />
        ) : rightIcon && onRightIconPress ? (
          <Pressable
            accessibilityLabel={rightIconAccessibilityLabel}
            accessibilityRole="button"
            hitSlop={tokens.spacing.sm}
            onPress={onRightIconPress}
            style={[styles.icon, { marginLeft: tokens.spacing.sm }]}>
            <SymbolView
              name={resolveIconName(rightIcon)}
              size={resolvedIconSize}
              tintColor={resolvedIconColor}
            />
          </Pressable>
        ) : rightIcon ? (
          <View style={[styles.icon, { marginLeft: tokens.spacing.sm }]}>
            <SymbolView
              name={resolveIconName(rightIcon)}
              size={resolvedIconSize}
              tintColor={resolvedIconColor}
            />
          </View>
        ) : null}
      </View>
    </ExpoRNHostView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    minWidth: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
