import { RNHostView } from '@/components/ui';
import { authClient } from '@/lib/auth-client';
import { Image } from 'expo-image';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useTheme } from '../theme';

const appleIcon = require('../../assets/images/social/apple.svg');
const googleIcon = require('../../assets/images/social/google.svg');

export type SocialAuthButtonsProps = {
  onApplePress?: () => void;
  onGooglePress?: () => void;
  width: number;
};

export function SocialAuthButtons({
  onApplePress,
  onGooglePress,
  width,
}: SocialAuthButtonsProps) {
  const { colors, tokens } = useTheme();
  const [googlePending, setGooglePending] = useState(false);
  const [socialError, setSocialError] = useState<string | null>(null);
  const sectionHeight =
    tokens.control.height +
    tokens.spacing.xl +
    tokens.typography.body +
    (socialError ? tokens.spacing.lg + tokens.typography.body : 0);

  async function handleGooglePress() {
    if (onGooglePress) {
      onGooglePress();
      return;
    }

    setGooglePending(true);
    setSocialError(null);

    try {
      const result = await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/',
        errorCallbackURL: '/(auth)',
      });

      if (result?.error) {
        setSocialError(result.error.message ?? 'Unable to continue with Google.');
      }
    } catch {
      setSocialError('Unable to continue with Google.');
    } finally {
      setGooglePending(false);
    }
  }

  return (
    <RNHostView
      matchContents
      style={{
        backgroundColor: colors.transparent,
        height: sectionHeight,
        width,
      }}>
      <View
        style={[
          styles.section,
          {
            gap: tokens.spacing.lg,
            height: sectionHeight,
            width,
          },
        ]}>
        <View style={styles.dividerRow}>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Text style={[styles.dividerLabel, { color: colors.mutedForeground }]}>
            Or continue with
          </Text>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
        </View>
        <View
          style={[
            styles.row,
            {
              gap: tokens.spacing.md,
              height: tokens.control.height,
              width,
            },
          ]}>
          <SocialButton
            borderColor={colors.border}
            icon={googleIcon}
            label="Google"
            loading={googlePending}
            onPress={() => void handleGooglePress()}
            textColor={colors.foreground}
          />
          <SocialButton
            borderColor={colors.border}
            icon={appleIcon}
            iconColor={colors.foreground}
            label="Apple"
            onPress={onApplePress}
            textColor={colors.foreground}
          />
        </View>
        {socialError ? (
          <Text
            accessibilityRole="alert"
            style={[styles.error, { color: colors.destructive }]}>
            {socialError}
          </Text>
        ) : null}
      </View>
    </RNHostView>
  );
}

type SocialButtonProps = {
  borderColor: string;
  icon: number;
  iconColor?: string;
  label: string;
  loading?: boolean;
  onPress?: () => void;
  textColor: string;
};

function SocialButton({
  borderColor,
  icon,
  iconColor,
  label,
  loading = false,
  onPress,
  textColor,
}: SocialButtonProps) {
  return (
    <Pressable
      accessibilityLabel={`Continue with ${label}`}
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: loading }}
      disabled={loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          borderColor,
          opacity: pressed || loading ? 0.72 : 1,
        },
      ]}>
      {loading ? (
        <ActivityIndicator color={textColor} size="small" style={styles.icon} />
      ) : (
        <Image
          contentFit="contain"
          source={icon}
          style={[styles.icon, iconColor ? { tintColor: iconColor } : undefined]}
        />
      )}
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 0,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  dividerLabel: {
    fontSize: 14,
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  error: {
    fontSize: 14,
    textAlign: 'center',
  },
  icon: {
    height: 22,
    width: 22,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  section: {
    width: '100%',
  },
});
