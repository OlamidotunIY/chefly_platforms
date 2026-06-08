import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import
  {
    ThemeProvider,
    useTheme,
  } from '@/components/ui/ThemeProvider/ThemeProvider';
import '@/global.css';

function RootStack()
{
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{
        headerShown: false
      }} />
    </>
  );
}

export default function RootLayout()
{
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}
