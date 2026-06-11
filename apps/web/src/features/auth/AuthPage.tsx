import { PATHS } from '@/routing'
import { Navigate, useLocation } from 'react-router-dom'

export const AuthPage = () => {
  const location = useLocation()

  return <Navigate to={PATHS.auth.login} replace state={location.state} />
}
