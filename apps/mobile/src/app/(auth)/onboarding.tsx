import { useTheme } from '@/components/theme';
import { markOnboardingComplete } from '@/lib/onboarding-storage';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function OnboardingScreen() {
  const { colors, tokens } = useTheme();

  async function completeOnboarding() {
    await markOnboardingComplete();
    router.replace('/(auth)');
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        gap: tokens.spacing.xl,
        padding: tokens.spacing.xl,
        backgroundColor: colors.background,
      }}>
      <Text
        style={{
          color: colors.foreground,
          fontSize: tokens.typography.headline,
        }}>
        Welcome to Chefly
      </Text>
      <Text style={{ color: colors.foreground }}>
        This is the onboarding screen scaffold.
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => void completeOnboarding()}
        style={{
          alignItems: 'center',
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.lg,
          backgroundColor: colors.primary,
        }}>
        <Text style={{ color: colors.primaryForeground }}>
          Continue to login
        </Text>
      </Pressable>
    </View>
  );
}
