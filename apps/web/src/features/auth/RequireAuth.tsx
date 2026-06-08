import { PATHS } from "@/routing/Paths"
import { authClient } from "@chefly/api"
import { useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"

function RequireAuth()
{
    const session = authClient.useSession()

    useEffect(() =>
    {
        if (session.isPending)
        {
            return
        }

        if (!session.data)
        {
            return
        }

        
    }, [session])

    if (session.isPending)
    {
        return <div>Loading...</div>
    }

    if (!session.data)
    {
        return <Navigate to={PATHS.auth.login} replace />
    }

    return <Outlet />

}

export default RequireAuth