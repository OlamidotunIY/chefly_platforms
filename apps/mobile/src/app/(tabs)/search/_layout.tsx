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
      <Stack.Screen name="recipes/[categorySlug]/[subCategorySlug]" />
      <Stack.Screen name="results/[keyword]" />
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
