import { useTheme } from '@/components/theme';
import { Text, View } from 'react-native';

export default function EmailVerificationScreen() {
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
        Verify your email
      </Text>
      <Text style={{ color: colors.foreground }}>
        This is the email verification screen scaffold.
      </Text>
    </View>
  );
}
