import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { PRIVATE_ROUTER, PUBLIC_ROUTER } from './config/path'
import { Toaster } from 'sonner'

// import LocationsPage from './page/locations/LocationsPage'
import LoadingPage from './components/shared/loading-page/LoadingPage'
import { PublicLayout } from './components/layouts'
import PrivateLayout from './components/layouts/private-layout/PrivateLayout'
import ProductPage from './features/product/page/product/ProductPage'
import LocationsPage from './features/location/page/locations/LocationsPage'
import ProfilePage from './features/user/page/ProfilePage'
import PaymentPage from './features/payment/PaymentPage'

const HomePage = lazy(() => import('./page/home/HomePage'))
const ProductsPage = lazy(
  () => import('./features/product/page/products/ProductsPage')
)

const FavoritePage = lazy(() => import('./page/favorite/FavoritePage'))
const PurcharsePage = lazy(() => import('./page/purcharse/PurcharsePage'))
const AddressPage = lazy(() => import('./page/address/AddressPage'))
// const LocationDetailPage = lazy(() => import('./page/location-detail/LocationDetailPage'))
const ContactPage = lazy(() => import('./page/contact/ContactPage'))

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path={PUBLIC_ROUTER.HOME} element={<HomePage />} />
            <Route path={PUBLIC_ROUTER.PRODUCTS} element={<ProductsPage />} />
            <Route
              path={PUBLIC_ROUTER.PRODUCT_DETAIL}
              element={<ProductPage />}
            />

            <Route path={PUBLIC_ROUTER.LOCATIONS} element={<LocationsPage />} />
            {/* <Route
              path={PUBLIC_ROUTER.LOCATION_DETAIL}
              element={<LocationDetailPage />}
            /> */}
            <Route path={PUBLIC_ROUTER.CONTACT} element={<ContactPage />} />
            <Route path={PUBLIC_ROUTER.PAYMENT} element={<PaymentPage />} />

            <Route element={<PrivateLayout />}>
              <Route path={PRIVATE_ROUTER.PROFILE} element={<ProfilePage />} />
              <Route
                path={PRIVATE_ROUTER.FAVORITE}
                element={<FavoritePage />}
              />
              <Route
                path={PRIVATE_ROUTER.PURCHASE}
                element={<PurcharsePage />}
              />
              <Route path={PRIVATE_ROUTER.ADDRESS} element={<AddressPage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
