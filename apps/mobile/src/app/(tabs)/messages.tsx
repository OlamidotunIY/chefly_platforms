import { TabHeader } from '@/components/custom/TabHeader';
import { Screen } from '@/components/ui';

export default function MessagesScreen() {
  return (
    <Screen>
      <TabHeader
        subtitle="Your conversations and cooking updates will appear here."
        title="Messages"
      />
    </Screen>
  );
}
