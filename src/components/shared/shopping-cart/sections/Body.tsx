import useCartStore from '@/store/cartStore'
import CardStore from '../components/CardStore'
import { Button } from '@/components/ui/button'
import { useModalStore } from '@/store/modalStore'
import { useNavigate } from 'react-router-dom'

const Body = () => {
  const items = useCartStore(state => state.items)
  const setIsOpen = useModalStore(state => state.setIsOpen)
  const navigate = useNavigate()

  const handleClickProduct = () => {
    setIsOpen(false)
    navigate('/products')
  }

  return (
    <>
      {items.length === 0 ? (
        <div className='flex h-full flex-col justify-center space-y-2'>
          <p className='self-center text-pretty text-center font-semibold'>
            No hay Productos en el Carrito de Compras
          </p>
          <Button
            variant='outline'
            className='self-center'
            onClick={handleClickProduct}
          >
            Productos
          </Button>
        </div>
      ) : (
        <ul className='space-y-5 p-5'>
          {items.map(item => (
            <CardStore key={item.id} {...item} />
          ))}
        </ul>
      )}
    </>
  )
}

export default Body
