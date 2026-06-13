import { Logo } from '@/components/custom/Logo';
import { tokens, useTheme } from '@/components/theme';
import { Button, Form, Screen, Spacer, Text, TextInput } from '@/components/ui';
import { authClient } from '@/lib/auth-client';
import { validatePassword } from '@/lib/auth-validation';
import { clearCurrentUser } from '@/lib/current-user';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

export default function ChangePasswordScreen()
{
    const { width } = useWindowDimensions();
    const { colors } = useTheme();
    const params = useLocalSearchParams<{
        email?: string | string[];
        otp?: string | string[];
    }>();
    const email = typeof params.email === 'string' ? params.email : '';
    const otp = typeof params.otp === 'string' ? params.otp : '';
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const blurBleed = 100;

    function validateConfirmation(value: string)
    {
        if (!value)
        {
            return 'Confirm your new password.';
        }

        return value === password ? null : 'Passwords do not match.';
    }

    async function handleChangePassword()
    {
        const nextPasswordError = validatePassword(password);
        const nextConfirmationError = validateConfirmation(confirmPassword);

        setPasswordError(nextPasswordError);
        setConfirmPasswordError(nextConfirmationError);

        if (nextPasswordError || nextConfirmationError)
        {
            return;
        }

        if (!email || !otp)
        {
            setError('Your reset session is incomplete. Request a new reset code.');
            return;
        }

        setError(null);
        setIsSubmitting(true);

        try
        {
            const result = await authClient.emailOtp.resetPassword({
                email,
                otp,
                password,
            });

            if (result.error)
            {
                setError(result.error.message ?? 'Unable to change your password.');
                return;
            }

            clearCurrentUser();
            router.replace('/(auth)');
        } catch
        {
            setError('Unable to reach the authentication server.');
        } finally
        {
            setIsSubmitting(false);
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
                Choose a new password
            </Text>
            <Text textStyle={{ color: colors.mutedForeground }}>
                Create a secure password you have not used for this account before.
            </Text>
            <Spacer />
            <Form>
                <TextInput
                    autoCapitalize="none"
                    autoComplete="new-password"
                    containerStyle={[
                        styles.inputContainer,
                        passwordError && { borderBottomColor: colors.destructive },
                    ]}
                    iconColor={passwordError ? colors.destructive : undefined}
                    inputStyle={[
                        styles.input,
                        passwordError && { color: colors.destructive },
                    ]}
                    leftIcon="lock"
                    onBlur={() => setPasswordError(validatePassword(password))}
                    onChangeText={(value) =>
                    {
                        setPassword(value);
                        if (passwordError)
                        {
                            setPasswordError(validatePassword(value));
                        }
                        if (confirmPassword)
                        {
                            setConfirmPasswordError(
                                value === confirmPassword ? null : 'Passwords do not match.',
                            );
                        }
                    }}
                    onRightIconPress={() => setPasswordVisible((visible) => !visible)}
                    placeholder="Enter your new password"
                    rightIcon={passwordVisible ? 'eye.slash' : 'eye'}
                    rightIconAccessibilityLabel={
                        passwordVisible ? 'Hide password' : 'Show password'
                    }
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
                
                <TextInput
                    autoCapitalize="none"
                    autoComplete="new-password"
                    containerStyle={[
                        styles.inputContainer,
                        confirmPasswordError && { borderBottomColor: colors.destructive },
                    ]}
                    iconColor={confirmPasswordError ? colors.destructive : undefined}
                    inputStyle={[
                        styles.input,
                        confirmPasswordError && { color: colors.destructive },
                    ]}
                    leftIcon="lock"
                    onBlur={() => setConfirmPasswordError(validateConfirmation(confirmPassword))}
                    onChangeText={(value) =>
                    {
                        setConfirmPassword(value);
                        if (confirmPasswordError)
                        {
                            setConfirmPasswordError(
                                !value
                                    ? 'Confirm your new password.'
                                    : value === password
                                        ? null
                                        : 'Passwords do not match.',
                            );
                        }
                    }}
                    onRightIconPress={() =>
                        setConfirmPasswordVisible((visible) => !visible)
                    }
                    placeholder="Confirm your new password"
                    rightIcon={confirmPasswordVisible ? 'eye.slash' : 'eye'}
                    rightIconAccessibilityLabel={
                        confirmPasswordVisible ? 'Hide password' : 'Show password'
                    }
                    secureTextEntry={!confirmPasswordVisible}
                    value={confirmPassword}
                />
                {confirmPasswordError ? (
                    <Text
                        textStyle={{
                            color: colors.destructive,
                            fontSize: tokens.typography.caption,
                        }}>
                        {confirmPasswordError}
                    </Text>
                ) : null}
                {error ? (
                    <Text textStyle={{ color: colors.destructive }}>{error}</Text>
                ) : null}
                <Spacer />
                <Button
                    borderRadius={0}
                    fullWidth
                    height={50}
                    label="Change password"
                    loading={isSubmitting}
                    onPress={handleChangePassword}
                />
            </Form>
        </Screen>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 0,
    },
    inputContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
        borderRadius: 0,
        borderWidth: 0,
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
});
