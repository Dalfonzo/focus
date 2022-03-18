import React from 'react'
import { useSelector } from 'react-redux'

export const useAuthGuard = () => {
  const isAuthenticated = useSelector((state) => state.auth.user.role)

  return { isAuthenticated }
}
