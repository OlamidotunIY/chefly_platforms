import { useTheme } from '@/components/theme';
import { Button, Text } from '@/components/ui';
import { Screen } from '@/components/ui/screen';

export default function HomeScreen() {
  const { colors, tokens } = useTheme();

  return (
    <Screen>
      <Text
        textStyle={{
          fontSize: tokens.typography.headline,
          fontWeight: '700',
        }}>
        Chefly
      </Text>
      <Text textStyle={{ color: colors.mutedForeground }}>
        Your authenticated home screen is ready.
      </Text>
      <Button label="Explore recipes" />
    </Screen>
  );
}
