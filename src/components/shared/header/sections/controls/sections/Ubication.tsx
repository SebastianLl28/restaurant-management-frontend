import { useLocationSelectedStore } from '@/store/locationSelectedStore'
import { MapPin } from 'lucide-react'

const Ubication = () => {
  const setOpenLocationModal = useLocationSelectedStore(
    state => state.setOpenModal
  )
  const locationSelected = useLocationSelectedStore(state => state.selected)

  return (
    <button
      type='button'
      className='cursor-pointer rounded-md p-3 pr-4 hover:bg-slate-100 md:flex md:items-center md:gap-2'
      onClick={() => setOpenLocationModal(true)}
    >
      <MapPin />
      <p className='font-semibold'>
        {locationSelected
          ? locationSelected.name
          : '¿De qué tienda quieres recibir tu pedido?'}
      </p>
    </button>
  )
}

export default Ubication
