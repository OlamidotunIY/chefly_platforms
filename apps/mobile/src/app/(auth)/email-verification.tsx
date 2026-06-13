import { useTheme } from '@/components/theme';
import { Button, Text } from '@/components/ui';
import { Screen } from '@/components/ui/screen';
import { useLocalSearchParams } from 'expo-router';

export default function EmailVerificationScreen() {
  const { colors, tokens } = useTheme();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const verificationMessage = email
    ? `Enter the verification code sent to ${email}.`
    : 'Enter the verification code sent to your email address.';

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
        {verificationMessage}
      </Text>
      <Button label="Verify email" />
      <Button label="Resend code" variant="text" />
    </Screen>
  );
}
