import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { ThemeProvider } from '../../components/theme';

export default function TabLayout() {
  return (
    <ThemeProvider>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
