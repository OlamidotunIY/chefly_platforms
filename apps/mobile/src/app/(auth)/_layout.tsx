import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'fade',
        animationDuration: 180,
        animationTypeForReplace: 'push',
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="email-verification" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="forget-password" />
      <Stack.Screen name="change-password" />
    </Stack>
  );
}
