import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { authClient, getCurrentUser } from "@chefly/api"

import { Loader } from "@/components/loader"
import { PATHS } from "@/routing"
import { useUserStore } from "@/store/userStore"

export const RequireAuth = () =>
{
    const session = authClient.useSession()
    const setUser = useUserStore((state) => state.setUser)
    const [isLoadingUser, setIsLoadingUser] = useState(false)
    const [validatedSessionId, setValidatedSessionId] = useState<string | null>(
        null,
    )
    const [validationFailed, setValidationFailed] = useState(false)

    useEffect(() =>
    {
        if (!session.data)
        {
            setUser(null)
            setValidatedSessionId(null)
            setValidationFailed(false)
            setIsLoadingUser(false)
            return
        }

        let isCurrent = true

        async function loadCurrentUser()
        {
            setIsLoadingUser(true)
            setValidationFailed(false)

            try
            {
                const result = await getCurrentUser()
                const user = result.data?.data

                if (!isCurrent)
                {
                    return
                }

                if (!user)
                {
                    setUser(null)
                    setValidatedSessionId(null)
                    setValidationFailed(true)
                    await authClient.signOut()
                    return
                }

                setUser(user)
                setValidatedSessionId(session?.data?.user?.id ?? null)
            } catch
            {
                if (isCurrent)
                {
                    setUser(null)
                    setValidatedSessionId(null)
                    setValidationFailed(true)
                    await authClient.signOut()
                }
            } finally
            {
                if (isCurrent)
                {
                    setIsLoadingUser(false)
                }
            }
        }

        void loadCurrentUser()

        return () =>
        {
            isCurrent = false
        }
    }, [session.data?.user.id, setUser])

    if (session.isPending)
    {
        return <Loader />
    }

    if (!session.data || validationFailed)
    {
        return <Navigate replace to={PATHS.auth.login} />
    }

    if (
        isLoadingUser ||
        validatedSessionId !== session?.data?.user.id
    )
    {
        return <Loader />
    }

    return <Outlet />
}
