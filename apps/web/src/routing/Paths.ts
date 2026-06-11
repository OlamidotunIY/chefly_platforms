import type { Location } from "react-router-dom"

export const PATHS = {
  root: "/",
  auth: {
    root: "/auth",
    login: "/auth/login",
    signup: "/auth/signup",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyEmail: "/auth/verify-email",
  },
  app: {
    root: "/",
    account: "/account",
  },
}

export type AuthNavigationState = {
  email?: string
  from?: Pick<Location, "hash" | "pathname" | "search">
}

export function getAuthNavigationState(state: unknown): AuthNavigationState {
  return (state ?? {}) as AuthNavigationState
}

export function getAuthDestination(state: unknown): string {
  const { from } = getAuthNavigationState(state)

  if (
    !from?.pathname?.startsWith("/") ||
    from.pathname.startsWith("//")
  ) {
    return PATHS.root
  }

  return `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`
}
