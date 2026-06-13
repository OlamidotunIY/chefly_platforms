import { useTheme } from '@/components/theme';
import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabsLayout() {
  const { colors, tokens } = useTheme();

  return (
    <NativeTabs
      backgroundColor={colors.secondary}
      iconColor={{
        default: colors.mutedForeground,
        selected: colors.primary,
      }}
      indicatorColor={colors.accent}
      labelStyle={{
        default: {
          color: colors.mutedForeground,
          fontSize: tokens.typography.caption,
        },
        selected: {
          color: colors.primary,
          fontSize: tokens.typography.caption,
          fontWeight: '600',
        },
      }}
      rippleColor={colors.accent}
      shadowColor={colors.border}
      tintColor={colors.primary}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          md={{ default: 'auto_awesome', selected: 'auto_awesome' }}
          sf={{ default: 'sparkles', selected: 'sparkles' }}
        />
        <NativeTabs.Trigger.Label>Features</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="messages">
        <NativeTabs.Trigger.Icon
          md={{ default: 'chat_bubble', selected: 'chat_bubble' }}
          sf={{ default: 'message', selected: 'message.fill' }}
        />
        <NativeTabs.Trigger.Label>Messages</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search" role="search">
        <NativeTabs.Trigger.Icon
          md={{ default: 'search', selected: 'search' }}
          sf="magnifyingglass"
        />
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="my-recipes">
        <NativeTabs.Trigger.Icon
          md={{ default: 'menu_book', selected: 'menu_book' }}
          sf={{ default: 'book.closed', selected: 'book.closed.fill' }}
        />
        <NativeTabs.Trigger.Label>My Recipes</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="account">
        <NativeTabs.Trigger.Icon
          md={{ default: 'person', selected: 'person' }}
          sf={{ default: 'person.crop.circle', selected: 'person.crop.circle.fill' }}
        />
        <NativeTabs.Trigger.Label>Account</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
