import { Stack } from 'expo-router';

export default function SearchLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'fade',
        animationDuration: 160,
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[categoryId]" />
    </Stack>
  );
}
