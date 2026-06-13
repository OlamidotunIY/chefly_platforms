import { Logo } from '@/components/custom/Logo';
import { tokens, useTheme } from '@/components/theme';
import { Button, Form, Screen, Spacer, Text, TextInput } from '@/components/ui';
import { authClient } from '@/lib/auth-client';
import { validateEmail } from '@/lib/auth-validation';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

export default function ForgetPasswordScreen()
{
    const { width } = useWindowDimensions();
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const blurBleed = 100;

    async function handleContinue()
    {
        const normalizedEmail = email.trim();
        const validationError = validateEmail(normalizedEmail);

        setEmailError(validationError);

        if (validationError)
        {
            return;
        }

        setError(null);
        setIsSubmitting(true);

        try
        {
            const result = await authClient.emailOtp.requestPasswordReset({
                email: normalizedEmail,
            });

            if (result.error)
            {
                setError(result.error.message ?? 'Unable to send the reset code.');
                return;
            }

            router.replace({
                pathname: '/(auth)/email-verification',
                params: {
                    email: normalizedEmail,
                    purpose: 'password-reset',
                },
            });
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
                Reset your password
            </Text>
            <Text textStyle={{ color: colors.mutedForeground }}>
                Enter your account email and we will send you a six-digit reset code.
            </Text>
            <Spacer />
            <Form>
                <TextInput
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    containerStyle={[
                        styles.inputContainer,
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
                    onChangeText={(value) =>
                    {
                        setEmail(value);
                        if (emailError)
                        {
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
                {error ? (
                    <Text textStyle={{ color: colors.destructive }}>{error}</Text>
                ) : null}
                <Spacer />
                <Button
                    borderRadius={0}
                    fullWidth
                    height={50}
                    label="Send reset code"
                    loading={isSubmitting}
                    onPress={handleContinue}
                />
            </Form>
            <Button
                contentPadding={0}
                label="Back to sign in"
                onPress={() => router.replace('/(auth)')}
                variant="link"
            />
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
