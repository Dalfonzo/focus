import { useAuthGuard } from '../hooks/useAuthGuard'
import { useRouter } from 'next/router'

const RouterGuard = ({ children }) => {
  const router = useRouter()
  const { isAuthenticated } = useAuthGuard()
  let protectedRoutes = ['/profile/[id]']

  let routeIsProtected = protectedRoutes.includes(router.pathname)

  if (!isAuthenticated && routeIsProtected) {
    router.push('/signin')
  }

  return children
}

export default RouterGuard
