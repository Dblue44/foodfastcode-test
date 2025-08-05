import {Navigate, Outlet, useLocation} from 'react-router-dom'
import { selectAccessToken } from '@entities/user'
import { useAppSelector } from '@shared/lib'

export const ProtectedRoute = () => {
  const token = useAppSelector(selectAccessToken)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return <Outlet />
}