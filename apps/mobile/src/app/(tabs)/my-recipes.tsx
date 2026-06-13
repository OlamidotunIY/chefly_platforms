import { useTheme } from '@/components/theme';
import { Button, Screen, Text } from '@/components/ui';

export default function MyRecipesScreen() {
  const { colors, tokens } = useTheme();

  return (
    <Screen>
      <Text
        textStyle={{
          fontSize: tokens.typography.headline,
          fontWeight: '700',
        }}>
        My Recipes
      </Text>
      <Text textStyle={{ color: colors.mutedForeground }}>
        Create, organize, and revisit your saved recipes.
      </Text>
      <Button label="Create a recipe" />
    </Screen>
  );
}
