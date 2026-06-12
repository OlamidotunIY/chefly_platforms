import type { User } from "@chefly/api"
import { create } from "zustand"

export type StoreStatus = "idle" | "loading" | "ready" | "error"

interface UserStore
{
    hydratedSessionId: string | null
    user: User | null
    status: StoreStatus
    setHydratedSessionId: (sessionId: string | null) => void
    setUser: (user: User | null) => void
    setStatus: (status: StoreStatus) => void
}

export const useUserStore = create<UserStore>((set) => ({
    hydratedSessionId: null,
    user: null,
    status: "idle",
    setHydratedSessionId: (hydratedSessionId) => set({ hydratedSessionId }),
    setUser: (user) => set({ user }),
    setStatus: (status) => set({ status }),
}))
