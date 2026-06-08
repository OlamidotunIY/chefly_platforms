import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import {
  ThemeProvider,
  useTheme,
} from '@/components/ui/ThemeProvider/ThemeProvider';
import '@/global.css';

function RootStack() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const backgroundColor = isDark ? '#121212' : '#ffffff';
  const foregroundColor = isDark ? '#fefeff' : '#171717';

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor },
          headerStyle: { backgroundColor },
          headerTintColor: foregroundColor,
        }}
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}
