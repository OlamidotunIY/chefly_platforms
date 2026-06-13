import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
        animationTypeForReplace: 'push',
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="email-verification" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
