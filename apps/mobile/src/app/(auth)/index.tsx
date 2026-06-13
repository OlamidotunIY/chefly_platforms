import { AuthAccountPrompt } from '@/components/custom/AuthAccountPrompt';
import { Logo } from '@/components/custom/Logo';
import { SocialAuthButtons } from '@/components/custom/SocialAuthButtons';
import { tokens, useTheme } from '@/components/theme';
import { Button, Form, Row, Screen, Spacer, Text, TextInput } from '@/components/ui';
import { authClient } from '@/lib/auth-client';
import { validateEmail, validatePassword } from '@/lib/auth-validation';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

export default function LoginScreen()
{
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const blurBleed = 100;
  const contentWidth = width - tokens.spacing.xl * 2;

  async function handleSignIn() {
    const normalizedEmail = email.trim();
    const emailValidationError = validateEmail(normalizedEmail);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const result = await authClient.signIn.email({
        email: normalizedEmail,
        password,
      });

      if (result.error) {
        if (result.error.status === 403) {
          router.replace('/(auth)/email-verification');
          return;
        }

        setError(result.error.message ?? 'Unable to sign in.');
        return;
      }

      router.replace('/');
    } catch {
      setError('Unable to reach the authentication server.');
    } finally {
      setIsSubmitting(false);
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
          autoComplete="email"
          autoCorrect={false}
          containerStyle={[
            styles.inputCon,
            emailError && { borderBottomColor: colors.destructive },
          ]}
          iconColor={emailError ? colors.destructive : undefined}
          inputStyle={[
            styles.input,
            emailError && { color: colors.destructive },
          ]}
          keyboardType="email-address"
          leftIcon="mail"
          onBlur={() => setEmailError(validateEmail(email.trim()))}
          onChangeText={(value) => {
            setEmail(value);
            if (emailError) {
              setEmailError(validateEmail(value.trim()));
            }
          }}
          placeholder="Enter your email address"
          value={email}
        />
        {emailError ? (
          <Text
            textStyle={{
              color: colors.destructive,
              fontSize: tokens.typography.caption,
            }}>
            {emailError}
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
          <Button variant="link" label="Forgot password?" />
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
