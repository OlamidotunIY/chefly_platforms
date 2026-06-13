import { getCurrentUser, type User } from '@chefly/api';
import { useUserStore, type StoreStatus } from '@chefly/store';

import { authClient } from './auth-client';

const USER_LOAD_ATTEMPTS = 3;
const USER_LOAD_RETRY_DELAY_MS = 500;

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function clearCurrentUser(status: StoreStatus = 'ready') {
  const store = useUserStore.getState();

  store.setHydratedSessionId(null);
  store.setUser(null);
  store.setStatus(status);
}

export async function hydrateCurrentUser(sessionId: string): Promise<User> {
  const store = useUserStore.getState();

  store.setStatus('loading');

  for (let attempt = 1; attempt <= USER_LOAD_ATTEMPTS; attempt += 1) {
    try {
      const result = await getCurrentUser({
        headers: {
          cookie: authClient.getCookie(),
        },
      });
      const user = result.data?.data;

      if (user) {
        store.setUser(user);
        store.setHydratedSessionId(sessionId);
        store.setStatus('ready');
        return user;
      }
    } catch {
      // Retry transient session and network failures before clearing auth state.
    }

    if (attempt < USER_LOAD_ATTEMPTS) {
      await wait(USER_LOAD_RETRY_DELAY_MS * 2 ** (attempt - 1));
    }
  }

  clearCurrentUser('error');
  throw new Error('Unable to load the current user.');
}
