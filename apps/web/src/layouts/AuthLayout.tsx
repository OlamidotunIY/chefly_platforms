import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { authClient } from '@chefly/api'
import { Loader, PageContainer } from '@/components'
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
      <PageContainer className="flex max-w-none flex-col gap-4 py-6 md:py-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </PageContainer>
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
