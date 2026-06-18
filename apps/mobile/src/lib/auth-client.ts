import { expoClient } from '@better-auth/expo/client';
import { client } from '@chefly/api';
import { createAuthClient } from 'better-auth/react';
import Constants from 'expo-constants';
import 'expo-network';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { emailOTPClient, usernameClient } from 'better-auth/client/plugins';

function resolveApiBaseUrl(): string {
  const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');

  if (configuredUrl) {
    return configuredUrl;
  }

  const expoHost = Constants.expoConfig?.hostUri?.split(':')[0];

  if (__DEV__ && expoHost) {
    return `http://${expoHost}:5000`;
  }

  return Platform.OS === 'android'
    ? 'http://10.0.2.2:5000'
    : 'http://localhost:5000';
}

export const apiBaseUrl = resolveApiBaseUrl();

const configuredScheme = Constants.expoConfig?.scheme;
const appScheme = Array.isArray(configuredScheme)
  ? configuredScheme[0]
  : (configuredScheme ?? 'mise');

client.setConfig({
  baseUrl: apiBaseUrl,
  credentials: 'include',
});

export const authClient = createAuthClient({
  baseURL: apiBaseUrl,
  plugins: [
    expoClient({
      scheme: appScheme,
      storage: SecureStore,
      storagePrefix: 'chefly',
    }),
    usernameClient(),
    emailOTPClient(),
  ],
});
