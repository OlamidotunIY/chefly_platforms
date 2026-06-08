import { PATHS } from '@/routing'
import { Navigate } from 'react-router-dom'

export const AuthPage = () => {
  return <Navigate to={PATHS.auth.login} replace />
}
