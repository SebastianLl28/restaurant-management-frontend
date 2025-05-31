import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../../shared'
import ShoppingCart from '@/components/shared/shopping-cart/ShoppingCart'
import { useEffect } from 'react'
import Login from '@/features/auth/component/login/Login'
import NavigationBar from '@/components/shared/navigation-bar/NavigationBar'
import { useSearchStore } from '@/store/searchStore'
import NavigationMobile from '@/components/shared/navigation-mobile/NavigationMobile'
import { useNavigationMobileStore } from '@/store/navigationMobileStore'
import Footer from '@/components/shared/footer/Footer'
import LocationDialog from '@/features/location/component/dialog/LocationDialog'
import { useLocationSelectedStore } from '@/store/locationSelectedStore'

const PublicLayout = () => {
  const { pathname } = useLocation()
  const { closeSearch } = useSearchStore()
  const { close: closeNavigationMobile } = useNavigationMobileStore()
  const openLocationModal = useLocationSelectedStore(state => state.openModal)
  const setLocationModal = useLocationSelectedStore(state => state.setOpenModal)

  useEffect(() => {
    window.scrollTo(0, 0)

    // close all modals
    closeSearch()
    closeNavigationMobile()
  }, [pathname, closeSearch, closeNavigationMobile])

  // TODO: Tambien validar las dirección del cliente seleccionado ( district )
  // const [locationOpen, setLocationOpen] = useState(locationSelected === null)

  return (
    <main className='relative grid min-h-dvh grid-rows-[auto_1fr_auto]'>
      <LocationDialog isOpen={openLocationModal} setIsOpen={setLocationModal} />

      <Login />
      <ShoppingCart />
      <Header />
      <Outlet />
      <Footer />

      {/* buttons for mobile */}
      <NavigationBar />

      {/* modal navigation for mobile */}
      <NavigationMobile />
    </main>
  )
}

export default PublicLayout
