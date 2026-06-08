import { PATHS } from '@/routing/Paths'
import { Navigate } from 'react-router-dom'

function AuthPage() {
  return <Navigate to={PATHS.auth.login} replace />
}

export default AuthPage