import { TabHeader } from '@/components/custom/TabHeader';
import { Button, Screen } from '@/components/ui';

export default function MyRecipesScreen() {
  return (
    <Screen>
      <TabHeader
        subtitle="Create, organize, and revisit your saved recipes."
        title="My Recipes"
      />
      <Button label="Create a recipe" />
    </Screen>
  );
}
