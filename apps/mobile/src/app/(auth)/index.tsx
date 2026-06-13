import { AuthAccountPrompt } from '@/components/custom/AuthAccountPrompt';
import { Logo } from '@/components/custom/Logo';
import { SocialAuthButtons } from '@/components/custom/SocialAuthButtons';
import { tokens, useTheme } from '@/components/theme';
import { Button, Form, Row, Screen, Spacer, Text, TextInput } from '@/components/ui';
import { resolveVerificationEmail } from '@chefly/api';
import { authClient } from '@/lib/auth-client';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '@/lib/auth-validation';
import { clearCurrentUser, hydrateCurrentUser } from '@/lib/current-user';
import { markOnboardingComplete } from '@/lib/onboarding-storage';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

export default function LoginScreen()
{
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const [identifier, setIdentifier] = useState('');
  const [identifierError, setIdentifierError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMounted = useRef(false);
  const blurBleed = 100;
  const contentWidth = width - tokens.spacing.xl * 2;

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  function validateIdentifier(value: string) {
    if (!value) {
      return 'Enter your username or email address.';
    }

    return value.includes('@')
      ? validateEmail(value)
      : validateUsername(value);
  }

  async function handleSignIn() {
    const normalizedIdentifier = identifier.trim();
    const identifierValidationError = validateIdentifier(normalizedIdentifier);
    const passwordValidationError = validatePassword(password);

    setIdentifierError(identifierValidationError);
    setPasswordError(passwordValidationError);

    if (identifierValidationError || passwordValidationError) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const isEmail = normalizedIdentifier.includes('@');
      const result = isEmail
        ? await authClient.signIn.email({
          email: normalizedIdentifier,
          password,
        })
        : await authClient.signIn.username({
          username: normalizedIdentifier,
          password,
        });

      if (result.error) {
        if (result.error.status === 403) {
          let verificationEmail = normalizedIdentifier;

          if (!isEmail) {
            const emailResult = await resolveVerificationEmail({
              body: {
                username: normalizedIdentifier,
                password,
              },
            });

            if (emailResult.error || !emailResult.data?.data.email) {
              if (isMounted.current) {
                setError('Unable to prepare email verification.');
              }
              return;
            }

            verificationEmail = emailResult.data.data.email;
          }

          clearCurrentUser();
          await markOnboardingComplete();

          if (!isMounted.current) {
            return;
          }

          setIsSubmitting(false);
          router.replace({
            pathname: '/(auth)/email-verification',
            params: { email: verificationEmail },
          });
          return;
        }

        if (isMounted.current) {
          setError(result.error.message ?? 'Unable to sign in.');
        }
        return;
      }

      const user = await hydrateCurrentUser(result.data.user.id);

      await markOnboardingComplete();

      if (!isMounted.current) {
        return;
      }

      setIsSubmitting(false);
      router.replace(
        user.emailVerified
          ? '/(tabs)'
          : {
            pathname: '/(auth)/email-verification',
            params: { email: user.email },
          },
      );
    } catch {
      clearCurrentUser('error');
      if (isMounted.current) {
        setError('Unable to reach the authentication server.');
      }
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <Screen
      background={
        <View
          pointerEvents="none"
          style={StyleSheet.absoluteFill}>
          <View
            style={[
              styles.oval,
              {
                backgroundColor: colors.brandPrimary,
                width: width + blurBleed * 2,
              },
            ]}
          />
          <Logo style={styles.logo} />
        </View>
      }
      contentBackgroundColor={colors.transparent}
    >
      <Spacer size={120} />
      <Text textStyle={{
        fontSize: tokens.typography.hero,
        lineHeight: tokens.typography.lineHeightHero
      }}>
        Sign in into your account
      </Text>
      <Spacer size={2} />
      <Form>
        <TextInput
          autoCapitalize="none"
          autoComplete="username"
          autoCorrect={false}
          containerStyle={[
            styles.inputCon,
            identifierError && { borderBottomColor: colors.destructive },
          ]}
          iconColor={identifierError ? colors.destructive : undefined}
          inputStyle={[
            styles.input,
            identifierError && { color: colors.destructive },
          ]}
          leftIcon="person"
          onBlur={() => setIdentifierError(validateIdentifier(identifier.trim()))}
          onChangeText={(value) => {
            setIdentifier(value);
            if (identifierError) {
              setIdentifierError(validateIdentifier(value.trim()));
            }
          }}
          placeholder="Username or email address"
          value={identifier}
        />
        {identifierError ? (
          <Text
            textStyle={{
              color: colors.destructive,
              fontSize: tokens.typography.caption,
            }}>
            {identifierError}
          </Text>
        ) : null}
        <TextInput
          autoCapitalize="none"
          autoComplete="current-password"
          containerStyle={[
            styles.inputCon,
            passwordError && { borderBottomColor: colors.destructive },
          ]}
          iconColor={passwordError ? colors.destructive : undefined}
          inputStyle={[
            styles.input,
            passwordError && { color: colors.destructive },
          ]}
          leftIcon="lock"
          onBlur={() => setPasswordError(validatePassword(password))}
          onChangeText={(value) => {
            setPassword(value);
            if (passwordError) {
              setPasswordError(validatePassword(value));
            }
          }}
          onRightIconPress={() => setPasswordVisible((visible) => !visible)}
          placeholder="Enter your password"
          rightIcon={passwordVisible ? "eye.slash" : "eye"}
          rightIconAccessibilityLabel={passwordVisible ? "Hide password" : "Show password"}
          secureTextEntry={!passwordVisible}
          value={password}
        />
        {passwordError ? (
          <Text
            textStyle={{
              color: colors.destructive,
              fontSize: tokens.typography.caption,
            }}>
            {passwordError}
          </Text>
        ) : null}
        <Row style={{ width }}>
          <Spacer flexible />
          <Button
            label="Forgot password?"
            onPress={() => router.push('/(auth)/forget-password')}
            variant="link"
          />
        </Row>
        {error ? (
          <Text textStyle={{ color: colors.destructive }}>
            {error}
          </Text>
        ) : null}
        <Button
          borderRadius={0}
          fullWidth
          height={50}
          label="Sign in"
          loading={isSubmitting}
          onPress={handleSignIn}
        />
      </Form>
      <SocialAuthButtons width={contentWidth} />
      <AuthAccountPrompt
        actionLabel="Sign up"
        message="Don't have an account?"
        onPress={() => router.replace('/(auth)/sign-up')}
        width={contentWidth}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  oval: {
    borderRadius: 999,
    filter: 'blur(72px)',
    height: 220,
    left: -100,
    position: 'absolute',
    top: -120,
  },
  logo: {
    alignSelf: 'center',
    position: 'absolute',
    top: 38,
    zIndex: 2,
  },
  inputCon: {
    borderWidth: 0,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderRadius: 0
  },
  input: {
    borderWidth: 0
  }
});
