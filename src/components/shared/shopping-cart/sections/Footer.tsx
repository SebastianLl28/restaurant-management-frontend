import { Button } from '@/components/ui/button'
import { PUBLIC_ROUTER } from '@/config/path'
import useCartStore from '@/store/cartStore'
import { useModalStore } from '@/store/modalStore'
import Decimal from 'decimal.js-light'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const { items } = useCartStore()

  const navigate = useNavigate()

  const setIsOpen = useModalStore(state => state.setIsOpen)

  const handleClick = () => {
    // TODO: Implement the logic to create customer order
    setIsOpen(false)
    navigate(PUBLIC_ROUTER.PAYMENT)
  }

  const totalPrice = useMemo(() => {
    return items
      .reduce(
        (totalPrice, item) =>
          new Decimal(totalPrice).plus(
            new Decimal(item.quantity).times(item.price)
          ),
        new Decimal(0)
      )
      .toFixed(2)
      .toString()
  }, [items])

  return (
    <footer className='p-5'>
      <Button
        className='flex w-full items-center justify-between rounded-full px-7 py-7 text-lg'
        onClick={handleClick}
      >
        <span>S/ {totalPrice}</span>
        <span>Comprar</span>
      </Button>
    </footer>
  )
}

export default Footer
