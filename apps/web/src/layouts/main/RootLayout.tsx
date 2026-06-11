import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import { authClient, getCurrentUser } from "@chefly/api"

import { useUserStore } from "@/store/userStore"
import { Header } from './header/MainHeader'

const USER_LOAD_ATTEMPTS = 3
const USER_LOAD_RETRY_DELAY_MS = 500

function wait(ms: number): Promise<void>
{
    return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export const RootLayout = () =>
{
    const session = authClient.useSession()
    const setHydratedSessionId = useUserStore(
        (state) => state.setHydratedSessionId,
    )
    const setStatus = useUserStore((state) => state.setStatus)
    const setUser = useUserStore((state) => state.setUser)

    useEffect(() =>
    {
        if (session.isPending)
        {
            setStatus("loading")
            return
        }

        if (!session.data)
        {
            setHydratedSessionId(null)
            setUser(null)
            setStatus("ready")
            return
        }

        const sessionId = session.data.user.id
        let isCurrent = true

        async function loadCurrentUser()
        {
            setStatus("loading")

            for (let attempt = 1; attempt <= USER_LOAD_ATTEMPTS; attempt++)
            {
                try
                {
                    const result = await getCurrentUser()
                    const user = result.data?.data

                    if (!isCurrent)
                    {
                        return
                    }

                    if (user)
                    {
                        setUser(user)
                        setHydratedSessionId(sessionId)
                        setStatus("ready")
                        return
                    }
                } catch
                {
                    if (!isCurrent)
                    {
                        return
                    }
                }

                if (attempt < USER_LOAD_ATTEMPTS)
                {
                    await wait(USER_LOAD_RETRY_DELAY_MS * 2 ** (attempt - 1))
                }
            }

            if (isCurrent)
            {
                setHydratedSessionId(null)
                setUser(null)
                setStatus("error")
                await authClient.signOut()
            }
        }

        void loadCurrentUser()

        return () =>
        {
            isCurrent = false
        }
    }, [
        session.data?.user.id,
        session.isPending,
        setHydratedSessionId,
        setStatus,
        setUser,
    ])

    return (
        <div className='flex flex-col w-screen h-screen overflow-x-hidden overflow-y-auto'>
            <Header />
            <Outlet />
        </div>
    )
}
