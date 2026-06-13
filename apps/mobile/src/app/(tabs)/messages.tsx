import { useTheme } from '@/components/theme';
import { Screen, Text } from '@/components/ui';

export default function MessagesScreen() {
  const { colors, tokens } = useTheme();

  return (
    <Screen>
      <Text
        textStyle={{
          fontSize: tokens.typography.headline,
          fontWeight: '700',
        }}>
        Messages
      </Text>
      <Text textStyle={{ color: colors.mutedForeground }}>
        Your conversations and cooking updates will appear here.
      </Text>
    </Screen>
  );
}
