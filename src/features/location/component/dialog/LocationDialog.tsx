import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useGetLocations } from '../../hook/location.hook'
import { Button } from '@/components/ui/button'
import { useLocationSelectedStore } from '@/store/locationSelectedStore'
import { Location } from '@/model/Location.model'
import { useCallback, useMemo } from 'react'
import LocationDialogCard from './LocationDialogCard'
import { useLocation, useNavigate } from 'react-router-dom'
import { PUBLIC_ROUTER } from '@/config/path'

interface Props {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const LocationDialog = ({ isOpen, setIsOpen }: Props) => {
  const navigate = useNavigate()
  const path = useLocation().pathname
  const { isSuccess, data: locations } = useGetLocations()
  const locationSelected = useLocationSelectedStore(state => state.selected)
  const setLocationSelected = useLocationSelectedStore(
    state => state.setSelected
  )

  const isLocationSelected = useCallback(
    (location: Location) => locationSelected?.id === location.id,
    [locationSelected]
  )

  const handleLocationSelected = (location: Location) => {
    if (locationSelected?.id === location.id) {
      setLocationSelected(null)
      return
    }
    setLocationSelected(location)
  }

  const handleCancel = useCallback(() => {
    setIsOpen(false)
    navigate(PUBLIC_ROUTER.PRODUCTS)
  }, [setIsOpen, navigate])

  const cancelButton = useMemo(() => {
    const regex = /^\/products\/\d+$/
    if (regex.test(path)) {
      return (
        <Button variant='ghost' onClick={handleCancel}>
          Volver
        </Button>
      )
    }
    return null
  }, [path, handleCancel])

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className='w-11/12 rounded-md'>
        <AlertDialogTitle className='text-center'>
          Seleccione la tienda más cercana
        </AlertDialogTitle>
        <ul className='space-y-4'>
          {isSuccess &&
            locations.map(location => (
              <LocationDialogCard
                key={location.id}
                location={location}
                handleLocationSelected={handleLocationSelected}
                isLocationSelected={isLocationSelected}
              />
            ))}
        </ul>
        <AlertDialogFooter>
          {cancelButton}
          <Button
            variant='default'
            onClick={() => setIsOpen(false)}
            disabled={locationSelected === null}
            className='ml-auto w-fit'
          >
            Cerrar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LocationDialog
