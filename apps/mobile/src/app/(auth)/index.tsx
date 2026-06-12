import { useTheme } from '@/components/theme';
import { Button, Text } from '@/components/ui';
import { Screen } from '@/components/ui/screen';

export default function LoginScreen() {
  const { colors, tokens } = useTheme();

  return (
    <Screen>
      <Text
        textStyle={{
          fontSize: tokens.typography.headline,
          fontWeight: '700',
        }}>
        Login
      </Text>
      <Text textStyle={{ color: colors.mutedForeground }}>
        Sign in to continue cooking with Chefly.
      </Text>
      <Button label="Continue" />
    </Screen>
  );
}
