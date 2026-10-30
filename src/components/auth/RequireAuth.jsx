import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RequireAuth({ children }) {
  const { isAuthenticated, bootstrapped } = useAuth()
  const location = useLocation()

  if (!bootstrapped) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void text-sm text-muted">
        Loading…
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
    )
  }

  return children
}
