import { Logo } from '@/components/custom/Logo';
import { tokens, useTheme } from '@/components/theme';
import {
  Button,
  Column,
  RNHostView,
  Row,
  Screen,
  Spacer,
  Text,
} from '@/components/ui';
import { authClient } from '@/lib/auth-client';
import { clearCurrentUser, hydrateCurrentUser } from '@/lib/current-user';
import { useUserStore } from '@chefly/store';
import { SymbolView } from 'expo-symbols';
import { router, useLocalSearchParams, type Href } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text as RNText,
  TextInput as RNTextInput,
  View,
  useWindowDimensions,
  type TextInputKeyPressEventData,
  type NativeSyntheticEvent,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const CODE_LENGTH = 6;

type VerificationStatus = 'idle' | 'error' | 'notice' | 'success';
type VerificationPurpose = 'email-verification' | 'password-reset';

type DigitInputProps = {
  digit: string;
  editable: boolean;
  errorVersion: number;
  index: number;
  inputRef: (input: RNTextInput | null) => void;
  onChange: (index: number, value: string) => void;
  onKeyPress: (
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => void;
  status: VerificationStatus;
};

function DigitInput({
  digit,
  editable,
  errorVersion,
  index,
  inputRef,
  onChange,
  onKeyPress,
  status,
}: DigitInputProps) {
  const { colors } = useTheme();
  const offset = useSharedValue(0);

  useEffect(() => {
    if (errorVersion === 0) {
      return;
    }

    offset.value = withSequence(
      withTiming(-4, { duration: 45, easing: Easing.out(Easing.quad) }),
      withTiming(4, { duration: 70 }),
      withTiming(-2, { duration: 55 }),
      withTiming(0, { duration: 45 }),
    );
  }, [errorVersion, offset]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  const statusColor =
    status === 'error'
      ? colors.destructive
      : status === 'success'
        ? colors.success
        : digit
          ? colors.primary
          : colors.input;

  return (
    <Animated.View style={[styles.digitContainer, animatedStyle]}>
      <RNTextInput
        accessibilityLabel={`Verification code digit ${index + 1}`}
        autoComplete={index === 0 ? 'one-time-code' : 'off'}
        caretHidden
        editable={editable}
        keyboardType="number-pad"
        maxLength={index === 0 ? CODE_LENGTH : 1}
        onChangeText={(value) => onChange(index, value)}
        onKeyPress={(event) => onKeyPress(index, event)}
        ref={inputRef}
        selectionColor={colors.primary}
        style={[
          styles.digitInput,
          {
            borderBottomColor: statusColor,
            color:
              status === 'error'
                ? colors.destructive
                : status === 'success'
                  ? colors.success
                  : colors.foreground,
          },
        ]}
        value={digit}
      />
    </Animated.View>
  );
}

type StatusMessageProps = {
  errorVersion: number;
  message: string;
  status: Exclude<VerificationStatus, 'idle'>;
};

function StatusMessage({
  errorVersion,
  message,
  status,
}: StatusMessageProps) {
  const { colors } = useTheme();
  const offset = useSharedValue(0);

  useEffect(() => {
    if (status !== 'error' || errorVersion === 0) {
      return;
    }

    offset.value = withSequence(
      withTiming(-3, { duration: 45 }),
      withTiming(3, { duration: 65 }),
      withTiming(0, { duration: 45 }),
    );
  }, [errorVersion, offset, status]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));
  const color = status === 'error' ? colors.destructive : colors.success;

  return (
    <Animated.View style={[styles.statusRow, animatedStyle]}>
      <SymbolView
        name={{
          android: status === 'error' ? 'close' : 'check',
          ios: status === 'error' ? 'xmark.circle.fill' : 'checkmark.circle.fill',
        }}
        size={18}
        tintColor={color}
      />
      <RNText style={[styles.statusText, { color }]}>{message}</RNText>
    </Animated.View>
  );
}

export default function EmailVerificationScreen() {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const params = useLocalSearchParams<{
    email?: string | string[];
    purpose?: string | string[];
  }>();
  const storedEmail = useUserStore((state) => state.user?.email);
  const purpose: VerificationPurpose =
    params.purpose === 'password-reset'
      ? 'password-reset'
      : 'email-verification';
  const isPasswordReset = purpose === 'password-reset';
  const [email, setEmail] = useState(
    typeof params.email === 'string' ? params.email : storedEmail ?? '',
  );
  const [digits, setDigits] = useState(() => Array(CODE_LENGTH).fill('') as string[]);
  const [status, setStatus] = useState<VerificationStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [errorVersion, setErrorVersion] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [continueRoute, setContinueRoute] = useState<Href | null>(null);
  const inputRefs = useRef<(RNTextInput | null)[]>([]);
  const lastSubmittedCode = useRef<string | null>(null);
  const blurBleed = 100;
  const code = digits.join('');
  const otpWidth = Math.min(width - tokens.spacing.xl * 2, 320);
  const verificationMessage = email
    ? `Enter the six-digit ${isPasswordReset ? 'password reset' : 'verification'} code sent to ${email}.`
    : `Enter the six-digit ${isPasswordReset ? 'password reset' : 'verification'} code sent to your email address.`;

  useEffect(() => {
    if (email) {
      return;
    }

    let active = true;

    void authClient.getSession().then((session) => {
      if (active && session.data?.user.email) {
        setEmail(session.data.user.email);
      }
    });

    return () => {
      active = false;
    };
  }, [email]);

  const showError = useCallback((errorMessage: string) => {
    setStatus('error');
    setMessage(errorMessage);
    setErrorVersion((version) => version + 1);
  }, []);

  function updateDigits(index: number, value: string) {
    if (status === 'success') {
      return;
    }

    lastSubmittedCode.current = null;
    const numbers = value.replace(/\D/g, '');

    if (!numbers) {
      setDigits((current) => {
        const next = [...current];
        next[index] = '';
        return next;
      });
      setStatus('idle');
      setMessage(null);
      return;
    }

    setDigits((current) => {
      const next = [...current];

      numbers.slice(0, CODE_LENGTH - index).split('').forEach((number, offset) => {
        next[index + offset] = number;
      });

      return next;
    });
    setStatus('idle');
    setMessage(null);
    inputRefs.current[Math.min(index + numbers.length, CODE_LENGTH - 1)]?.focus();
  }

  function handleKeyPress(
    index: number,
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) {
    if (event.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  const handleVerify = useCallback(async (verificationCode: string) => {
    if (!email) {
      showError('We could not determine which email to verify.');
      return;
    }

    setIsSubmitting(true);
    setStatus('idle');
    setMessage(null);

    try {
      const result = isPasswordReset
        ? await authClient.emailOtp.checkVerificationOtp({
          email,
          otp: verificationCode,
          type: 'forget-password',
        })
        : await authClient.emailOtp.verifyEmail({
          email,
          otp: verificationCode,
        });

      if (result.error) {
        showError(result.error.message ?? 'That verification code is incorrect.');
        return;
      }

      setStatus('success');
      setMessage(
        isPasswordReset
          ? 'Reset code verified successfully.'
          : 'Email verified successfully.',
      );

      if (isPasswordReset) {
        setContinueRoute({
          pathname: '/(auth)/change-password',
          params: {
            email,
            otp: verificationCode,
          },
        });
        return;
      }

      const session = await authClient.getSession();

      if (!session.data?.user) {
        clearCurrentUser();
        setContinueRoute('/(auth)');
        return;
      }

      try {
        await hydrateCurrentUser(session.data.user.id);
        setContinueRoute('/(tabs)');
      } catch {
        setContinueRoute('/');
      }
    } catch {
      showError('Unable to verify the code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [email, isPasswordReset, showError]);

  useEffect(() => {
    if (
      code.length !== CODE_LENGTH ||
      isSubmitting ||
      status === 'success' ||
      lastSubmittedCode.current === code
    ) {
      return;
    }

    lastSubmittedCode.current = code;
    void handleVerify(code);
  }, [code, handleVerify, isSubmitting, status]);

  function handleContinue() {
    if (continueRoute) {
      router.replace(continueRoute);
    }
  }

  async function handleResend() {
    if (!email) {
      showError('We could not determine which email to verify.');
      return;
    }

    setIsResending(true);

    try {
      const result = isPasswordReset
        ? await authClient.emailOtp.requestPasswordReset({ email })
        : await authClient.emailOtp.sendVerificationOtp({
          email,
          type: 'email-verification',
        });

      if (result.error) {
        showError(result.error.message ?? 'Unable to resend the code.');
        return;
      }

      setDigits(Array(CODE_LENGTH).fill('') as string[]);
      setContinueRoute(null);
      lastSubmittedCode.current = null;
      setStatus('notice');
      setMessage('A new verification code was sent.');
      inputRefs.current[0]?.focus();
    } catch {
      showError('Unable to resend the code. Please try again.');
    } finally {
      setIsResending(false);
    }
  }

  return (
    <Screen
      background={
        <View pointerEvents="none" style={StyleSheet.absoluteFill}>
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
      contentBackgroundColor={colors.transparent}>
      <Spacer size={120} />
      <Text
        textStyle={{
          fontSize: tokens.typography.hero,
          lineHeight: tokens.typography.lineHeightHero,
        }}>
        {isPasswordReset ? 'Verify reset code' : 'Verify your email'}
      </Text>
      <Text textStyle={{ color: colors.mutedForeground }}>
        {verificationMessage}
      </Text>
      <Row
        spacing={0}
        style={{
          height: message ? 94 : 58,
          width: width - tokens.spacing.lg * 2,
        }}>
        <Spacer flexible />
        <RNHostView
          matchContents
          style={{
            backgroundColor: colors.transparent,
            height: message ? 94 : 58,
            width: otpWidth,
          }}>
          <View style={[styles.codeSection, { width: otpWidth }]}>
            <View style={styles.codeRow}>
              {digits.map((digit, index) => (
                <DigitInput
                  digit={digit}
                  editable={!isSubmitting && status !== 'success'}
                  errorVersion={errorVersion}
                  index={index}
                  inputRef={(input) => {
                    inputRefs.current[index] = input;
                  }}
                  key={index}
                  onChange={updateDigits}
                  onKeyPress={handleKeyPress}
                  status={status}
                />
              ))}
            </View>
            {message && status !== 'idle' ? (
              <StatusMessage
                errorVersion={errorVersion}
                message={message}
                status={status}
              />
            ) : null}
          </View>
        </RNHostView>
        <Spacer flexible />
      </Row>
      <Spacer />
      <Column
        spacing={tokens.spacing.md}
        style={{
          height: 50 + tokens.control.compactHeight + tokens.spacing.md,
          width: width - tokens.spacing.lg * 2,
        }}>
        <Button
          borderRadius={0}
          disabled={!continueRoute}
          fullWidth
          height={50}
          label={isSubmitting ? 'Verifying code...' : 'Continue'}
          onPress={handleContinue}
        />
        <Button
          contentPadding={0}
          disabled={isResending || isSubmitting || status === 'success'}
          fullWidth
          height={tokens.control.compactHeight}
          label={isResending ? 'Sending code...' : 'Resend code'}
          loading={isResending}
          onPress={handleResend}
          variant="link"
        />
      </Column>
    </Screen>
  );
}

const styles = StyleSheet.create({
  codeRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    width: '100%',
  },
  codeSection: {
    width: '100%',
  },
  digitContainer: {
    flex: 1,
    height: 54,
  },
  digitInput: {
    borderBottomWidth: 1.5,
    fontSize: 24,
    fontWeight: '700',
    height: 54,
    paddingHorizontal: 0,
    paddingVertical: 0,
    textAlign: 'center',
  },
  logo: {
    alignSelf: 'center',
    height: 160,
    position: 'absolute',
    top: 30,
    width: 160,
    zIndex: 2,
  },
  oval: {
    borderRadius: 999,
    filter: 'blur(72px)',
    height: 220,
    left: -100,
    position: 'absolute',
    top: -120,
  },
  statusRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    marginTop: 12,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
