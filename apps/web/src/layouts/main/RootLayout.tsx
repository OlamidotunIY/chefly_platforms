import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import
    {
        authClient,
        getCurrentUser,
        getRecipeCategory,
    } from "@chefly/api"
import { useCategoryStore, useUserStore } from "@chefly/store"

import { Header } from './header/MainHeader'
import { MainCategory } from "./category/MainCategory"
import { useDocumentTitle } from "@/components"

const USER_LOAD_ATTEMPTS = 3
const USER_LOAD_RETRY_DELAY_MS = 500
const CATEGORY_LOAD_ATTEMPTS = 3
const CATEGORY_LOAD_RETRY_DELAY_MS = 500

function wait(ms: number): Promise<void>
{
    return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export const RootLayout = () =>
{
    useDocumentTitle()
    const session = authClient.useSession()
    const setHydratedSessionId = useUserStore(
        (state) => state.setHydratedSessionId,
    )
    const setStatus = useUserStore((state) => state.setStatus)
    const setUser = useUserStore((state) => state.setUser)
    const setCategories = useCategoryStore((state) => state.setCategories)
    const setCategoryStatus = useCategoryStore((state) => state.setStatus)

    useEffect(() =>
    {
        let isCurrent = true

        async function loadCategories()
        {
            setCategoryStatus("loading")

            for (
                let attempt = 1;
                attempt <= CATEGORY_LOAD_ATTEMPTS;
                attempt++
            )
            {
                try
                {
                    const result = await getRecipeCategory()
                    const categories = result.data?.data

                    if (!isCurrent)
                    {
                        return
                    }

                    if (categories)
                    {
                        setCategories(categories)
                        setCategoryStatus("ready")
                        return
                    }
                } catch
                {
                    if (!isCurrent)
                    {
                        return
                    }
                }

                if (attempt < CATEGORY_LOAD_ATTEMPTS)
                {
                    await wait(
                        CATEGORY_LOAD_RETRY_DELAY_MS * 2 ** (attempt - 1),
                    )
                }
            }

            if (isCurrent)
            {
                setCategoryStatus("error")
            }
        }

        void loadCategories()

        return () =>
        {
            isCurrent = false
        }
    }, [setCategories, setCategoryStatus])

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
            <div>
                <Header />
                <div className="hidden lg:block">
                    <MainCategory />
                </div>
            </div>
            <Outlet />
        </div>
    )
}
