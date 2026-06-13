const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^[a-zA-Z0-9_]+$/;

export function validateUsername(username: string): string | null {
  if (!username) {
    return 'Enter a username.';
  }

  if (username.length < 3) {
    return 'Username must be at least 3 characters.';
  }

  if (username.length > 30) {
    return 'Username must be no more than 30 characters.';
  }

  if (!USERNAME_PATTERN.test(username)) {
    return 'Use only letters, numbers, and underscores.';
  }

  return null;
}

export function validateEmail(email: string): string | null {
  if (!email) {
    return 'Enter your email address.';
  }

  if (!EMAIL_PATTERN.test(email)) {
    return 'Enter a valid email address.';
  }

  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Enter your password.';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters.';
  }

  return null;
}
