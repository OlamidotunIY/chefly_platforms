import { useTheme } from '@/components/theme';
import { Button, Text } from '@/components/ui';
import { Screen } from '@/components/ui/screen';

export default function EmailVerificationScreen() {
  const { colors, tokens } = useTheme();

  return (
    <Screen>
      <Text
        textStyle={{
          fontSize: tokens.typography.headline,
          fontWeight: '700',
        }}>
        Verify your email
      </Text>
      <Text textStyle={{ color: colors.mutedForeground }}>
        Enter the verification code sent to your email address.
      </Text>
      <Button label="Verify email" />
      <Button label="Resend code" variant="text" />
    </Screen>
  );
}
