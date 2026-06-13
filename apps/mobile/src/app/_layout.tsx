import { ThemeProvider } from '@/components/theme';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider defaultMode="system">
      <Stack
        screenOptions={{
          animation: 'slide_from_right',
          animationTypeForReplace: 'push',
          headerShown: false,
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
