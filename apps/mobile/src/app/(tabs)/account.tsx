import { useTheme } from '@/components/theme';
import { Button, Screen, Text } from '@/components/ui';
import { authClient } from '@/lib/auth-client';
import { clearCurrentUser } from '@/lib/current-user';
import { useUserStore } from '@chefly/store';
import { router } from 'expo-router';
import { useState } from 'react';

export default function AccountScreen() {
  const { colors, tokens } = useTheme();
  const user = useUserStore((state) => state.user);
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      await authClient.signOut();
      clearCurrentUser();
      setIsSigningOut(false);
      router.replace('/(auth)');
    } catch {
      setIsSigningOut(false);
    }
  }

  return (
    <Screen>
      <Text
        textStyle={{
          fontSize: tokens.typography.headline,
          fontWeight: '700',
        }}>
        Account
      </Text>
      <Text textStyle={{ color: colors.foreground }}>
        {user?.displayUsername || user?.username || user?.name || 'Chefly user'}
      </Text>
      <Text textStyle={{ color: colors.mutedForeground }}>
        {user?.email ?? 'Manage your profile and account settings.'}
      </Text>
      <Button
        label="Sign out"
        loading={isSigningOut}
        onPress={handleSignOut}
        variant="outlined"
      />
    </Screen>
  );
}
