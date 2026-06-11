import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { authClient } from '@chefly/api'
import { Loader } from '@/components/loader'
import { getAuthDestination } from '@/routing'

export const AuthLayout = () => {
  const location = useLocation()
  const session = authClient.useSession()

  if (session.isPending) {
    return <Loader />
  }

  if (session.data) {
    return <Navigate replace to={getAuthDestination(location.state)} />
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
