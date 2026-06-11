import { Navigate, Outlet, useLocation } from "react-router-dom"

import { authClient } from "@chefly/api"

import { Loader } from "@/components/loader"
import { PATHS } from "@/routing"
import { useUserStore } from "@/store/userStore"

export const RequireAuth = () =>
{
    const location = useLocation()
    const session = authClient.useSession()
    const hydratedSessionId = useUserStore(
        (state) => state.hydratedSessionId,
    )
    const user = useUserStore((state) => state.user)
    const userStatus = useUserStore((state) => state.status)

    if (
        session.isPending ||
        userStatus === "idle" ||
        userStatus === "loading"
    )
    {
        return <Loader />
    }

    if (!session.data)
    {
        return (
            <Navigate
                replace
                state={{ from: location }}
                to={PATHS.auth.login}
            />
        )
    }

    if (
        userStatus === "error" ||
        !user ||
        hydratedSessionId !== session.data.user.id
    )
    {
        return <div>Unable to load your account. Please refresh the page.</div>
    }

    return <Outlet />
}
