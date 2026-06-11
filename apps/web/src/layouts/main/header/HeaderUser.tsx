import { authClient, type User } from "@chefly/api"
import { useLocation, useNavigate } from "react-router-dom"
import { useUserStore } from "@/store/userStore"
import { AuthButtons, UserMenu } from "@workspace/ui/components"

import { PATHS } from "@/routing"

export const HeaderUser = () =>
{
  const location = useLocation()
  const navigate = useNavigate()
  const session = authClient.useSession()
  const user = useUserStore((state) => state.user)
  const authState = { from: location }

  if (session.isPending)
  {
    return null
  }

  return (
    <div>
      {session.data ? (
        <UserMenu user={user as User ?? session.data.user} />
      ) : (
        <AuthButtons
          onJoin={() => navigate(PATHS.auth.signup, { state: authState })}
          onSignIn={() => navigate(PATHS.auth.login, { state: authState })}
        />
      )}
    </div>
  )
}
