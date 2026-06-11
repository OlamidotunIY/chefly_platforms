import type { User } from "@chefly/api"
import { create } from "zustand"


interface UserStore
{
    hydratedSessionId: string | null
    user: User | null
    status: "idle" | "loading" | "ready" | "error"
    setHydratedSessionId: (sessionId: string | null) => void
    setUser: (user: User | null) => void
    setStatus: (status: UserStore["status"]) => void
}

export const useUserStore = create<UserStore>((set) => ({
    hydratedSessionId: null,
    user: null,
    status: "idle",
    setHydratedSessionId: (hydratedSessionId) => set({ hydratedSessionId }),
    setUser: (user) => set({ user }),
    setStatus: (status) => set({ status }),
}))
