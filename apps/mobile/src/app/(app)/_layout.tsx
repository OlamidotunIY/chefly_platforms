import { Stack } from 'expo-router';

export default function AppScreensLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'fade',
        animationDuration: 180,
        headerShown: false,
      }}>
      <Stack.Screen
        name="choose-interests"
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
