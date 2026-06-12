import { ThemeProvider } from '@/components/theme';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <ThemeProvider defaultMode="system">
      <Slot />
    </ThemeProvider>
  );
}
