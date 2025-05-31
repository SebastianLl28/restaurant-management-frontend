import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { useModalStore } from '@/store/modalStore'
import Footer from './sections/Footer'
import Body from './sections/Body'
import Header from './sections/Header'
import useCartStore from '@/store/cartStore'

const ShoppingCart = () => {
  const isOpen = useModalStore(state => state.isOpen)
  const setIsOpen = useModalStore(state => state.setIsOpen)
  const items = useCartStore(state => state.items)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent>
        <SheetTitle>Carrito de Compras</SheetTitle>
        <SheetContent
          className='flex w-11/12 flex-col border-none bg-gray-100 p-0'
          hideCloseButton
        >
          <Header />
          <div className='relative flex flex-grow basis-1 flex-col justify-between'>
            <Body />
            {items.length !== 0 && <Footer />}
          </div>
        </SheetContent>
      </SheetContent>
    </Sheet>
  )
}

export default ShoppingCart
