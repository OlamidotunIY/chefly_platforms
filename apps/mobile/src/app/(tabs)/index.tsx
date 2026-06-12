import { useTheme } from '@/components/theme';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  const { colors, tokens } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: tokens.spacing.xl,
        backgroundColor: colors.background,
      }}>
      <Text
        style={{
          color: colors.foreground,
          fontSize: tokens.typography.headline,
        }}>
        Chefly
      </Text>
      <Text style={{ color: colors.foreground }}>
        This is the authenticated tabs scaffold.
      </Text>
    </View>
  );
}
