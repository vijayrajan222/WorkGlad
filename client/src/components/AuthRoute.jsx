import { Navigate } from 'react-router-dom'
import { authService } from '../services'

const hasAuth = () => authService.getStoredToken() && authService.getStoredUser()

export const PublicOnlyRoute = ({ children }) => {
  if (hasAuth()) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export const ProtectedRoute = ({ children }) => {
  if (!hasAuth()) {
    authService.logout()
    return <Navigate to="/login" replace />
  }

  return children
}
