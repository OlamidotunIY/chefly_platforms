import { create } from "zustand"

export type stateType =
  | "sign-in"
  | "sign-up"
  | "forget-password"
  | "verify-otp"
  | "change-password"

interface AuthStore {
  state: stateType
  changeState: (state: stateType) => void
  open: boolean
  changeOpenState: (openState: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  state: "sign-in",
  changeState: (state) => set({ state }),
  open: false,
  changeOpenState(openState) {
    set({
      open: openState,
    })
  },
}))
