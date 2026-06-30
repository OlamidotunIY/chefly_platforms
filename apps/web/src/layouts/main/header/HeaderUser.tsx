import { useState } from "react"
import { authClient } from "@chefly/api"
import { useUserStore } from "@chefly/store"
import { useNavigate } from "react-router-dom"
import { AuthButtons, toast, UserMenu } from "@workspace/ui/components"

import { useTheme } from "@/components"
import { PATHS } from "@/routing"

export const HeaderUser = () =>
{
  const navigate = useNavigate()
  const session = authClient.useSession()
  const { setTheme, theme } = useTheme()
  const {setHydratedSessionId, setStatus, setUser} = useUserStore()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () =>
  {
    if (isLoggingOut)
    {
      return
    }

    setIsLoggingOut(true)

    try
    {
      const result = await authClient.signOut()

      if (result.error)
      {
        throw result.error
      }

      setHydratedSessionId(null)
      setUser(null)
      setStatus("ready")
      navigate(PATHS.root, { replace: true })
      toast.success("You have been logged out.")
    } catch
    {
      toast.error("Unable to log out. Please try again.")
    } finally
    {
      setIsLoggingOut(false)
    }
  }

  if (session.isPending)
  {
    return null
  }

  return (
    <div>
      {session.data ? (
        <UserMenu
          isLoggingOut={isLoggingOut}
          onLogout={handleLogout}
          theme={theme}
          onThemeChange={setTheme}
        />
      ) : (
          <AuthButtons />
      )}
    </div>
  )
}
