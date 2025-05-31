import PrivateHeader from '@/components/shared/private-header/PrivateHeader'
import { useVerifyToken } from '@/features/auth/hooks/auth.hook'
import { Outlet } from 'react-router-dom'

const PrivateLayout = () => {
  useVerifyToken()

  return (
    <div>
      <PrivateHeader />
      <Outlet />
    </div>
  )
}

export default PrivateLayout
