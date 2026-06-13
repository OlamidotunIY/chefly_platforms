import { AuthAccountPrompt } from '@/components/custom/AuthAccountPrompt';
import { Logo } from '@/components/custom/Logo';
import { SocialAuthButtons } from '@/components/custom/SocialAuthButtons';
import { tokens, useTheme } from '@/components/theme';
import { Button, Form, Screen, Spacer, Text, TextInput } from '@/components/ui';
import {
    validateEmail,
    validatePassword,
    validateUsername,
} from '@/lib/auth-validation';
import { authClient } from '@chefly/api';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

type UsernameStatus = 'idle' | 'checking' | 'available' | 'unavailable' | 'invalid';

export default function SignUpScreen()
{
    const { width } = useWindowDimensions();
    const { colors } = useTheme();
    const [username, setUsername] = useState('');
    const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>('idle');
    const [usernameMessage, setUsernameMessage] = useState<string | null>(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const blurBleed = 100;
    const contentWidth = width - tokens.spacing.xl * 2;

    useEffect(() => {
        if (usernameStatus !== 'checking') {
            return;
        }

        const normalizedUsername = username.trim();

        let isCurrent = true;
        const timeout = setTimeout(async () => {
            try {
                const result = await authClient.isUsernameAvailable({
                    username: normalizedUsername,
                });

                if (!isCurrent) {
                    return;
                }

                if (result.error) {
                    setUsernameStatus('invalid');
                    setUsernameMessage(result.error.message ?? 'Unable to check username.');
                    return;
                }

                setUsernameStatus(result.data.available ? 'available' : 'unavailable');
                setUsernameMessage(
                    result.data.available
                        ? 'Username is available.'
                        : 'Username is already taken.',
                );
            } catch {
                if (isCurrent) {
                    setUsernameStatus('invalid');
                    setUsernameMessage('Unable to check username availability.');
                }
            }
        }, 400);

        return () => {
            isCurrent = false;
            clearTimeout(timeout);
        };
    }, [username, usernameStatus]);

    function handleUsernameChange(value: string) {
        setUsername(value);

        const normalizedUsername = value.trim();

        if (!normalizedUsername) {
            setUsernameStatus('idle');
            setUsernameMessage(null);
            return;
        }

        const validationError = validateUsername(normalizedUsername);

        if (validationError) {
            setUsernameStatus('invalid');
            setUsernameMessage(validationError);
            return;
        }

        setUsernameStatus('checking');
        setUsernameMessage(null);
    }

    async function handleSignUp() {
        const normalizedUsername = username.trim();
        const normalizedEmail = email.trim();
        const usernameValidationError = validateUsername(normalizedUsername);
        const emailValidationError = validateEmail(normalizedEmail);
        const passwordValidationError = validatePassword(password);

        setEmailError(emailValidationError);
        setPasswordError(passwordValidationError);

        if (usernameValidationError) {
            setUsernameStatus('invalid');
            setUsernameMessage(usernameValidationError);
        }

        if (usernameValidationError || emailValidationError || passwordValidationError) {
            return;
        }

        setError(null);
        setIsSubmitting(true);

        try {
            const availability = await authClient.isUsernameAvailable({
                username: normalizedUsername,
            });

            if (availability.error || !availability.data.available) {
                setUsernameStatus('unavailable');
                setUsernameMessage(
                    availability.error?.message ?? 'Username is already taken.',
                );
                return;
            }

            const result = await authClient.signUp.email({
                email: normalizedEmail,
                name: normalizedUsername,
                password,
                username: normalizedUsername,
            });

            if (result.error) {
                setError(result.error.message ?? 'Unable to create your account.');
                return;
            }

            router.replace('/(auth)/email-verification');
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
                lineHeight: tokens.typography.lineHeightHero,

            }}>
                Sign up to get started
            </Text>
            <Spacer size={2} />
            <Form>
                <TextInput
                    autoCapitalize="none"
                    autoComplete="username"
                    autoCorrect={false}
                    containerStyle={[
                        styles.inputCon,
                        usernameStatus === 'available' && { borderBottomColor: colors.success },
                        (usernameStatus === 'invalid' || usernameStatus === 'unavailable') && {
                            borderBottomColor: colors.destructive,
                        },
                    ]}
                    iconColor={
                        usernameStatus === 'available'
                            ? colors.success
                            : usernameStatus === 'invalid' || usernameStatus === 'unavailable'
                                ? colors.destructive
                                : undefined
                    }
                    inputStyle={[
                        styles.input,
                        usernameStatus === 'available' && { color: colors.success },
                        (usernameStatus === 'invalid' || usernameStatus === 'unavailable') && {
                            color: colors.destructive,
                        },
                    ]}
                    leftIcon="person"
                    maxLength={30}
                    onChangeText={handleUsernameChange}
                    placeholder="Choose a username"
                    rightIcon={
                        usernameStatus === 'available'
                            ? 'checkmark'
                            : usernameStatus === 'invalid' || usernameStatus === 'unavailable'
                                ? 'xmark'
                                : undefined
                    }
                    rightIconLoading={usernameStatus === 'checking'}
                    value={username}
                />
                {usernameMessage ? (
                    <Text
                        textStyle={{
                            color:
                                usernameStatus === 'available'
                                    ? colors.success
                                    : colors.destructive,
                            fontSize: tokens.typography.caption,
                        }}>
                        {usernameMessage}
                    </Text>
                ) : null}
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
                    autoComplete="new-password"
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
                    placeholder="Create a password"
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
                {error ? (
                    <Text textStyle={{ color: colors.destructive }}>
                        {error}
                    </Text>
                ) : null}
                <Button
                    borderRadius={0}
                    disabled={
                        usernameStatus === 'checking' ||
                        usernameStatus === 'invalid' ||
                        usernameStatus === 'unavailable'
                    }
                    fullWidth
                    height={50}
                    label="Create account"
                    loading={isSubmitting}
                    onPress={handleSignUp}
                />
            </Form>
            <SocialAuthButtons width={contentWidth} />
            <AuthAccountPrompt
                actionLabel="Sign in"
                message="Already have an account?"
                onPress={() => router.replace('/(auth)')}
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
        top: 30,
        zIndex: 2,
        width: 160,
        height: 160
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
