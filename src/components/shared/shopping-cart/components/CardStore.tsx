import useCartStore, { IProductstore } from '@/store/cartStore'
import Decimal from 'decimal.js-light'
import { Button } from '@/components/ui/button'
import { useLocationSelectedStore } from '@/store/locationSelectedStore'
import { useCallback, useEffect, useMemo } from 'react'
import { Minus, Plus, X } from 'lucide-react'

const CardStore = ({
  id,
  name,
  imageUrl,
  quantity,
  price,
  stock,
  description,
  ...args
}: IProductstore) => {
  const { removeItem, addItem, findItem, setQuantity, deleteItem } =
    useCartStore()
  const { selected } = useLocationSelectedStore()

  const findStock = useCallback(() => {
    if (!selected) return
    return stock.find(store => store.store === selected.name)
  }, [selected, stock])

  const handleAddItem = () => {
    const item = findItem(id)
    if (!item) return

    if (!selected) return

    const stockSelected = findStock()
    if (!stockSelected) return

    if (item.quantity >= stockSelected.quantity) return
    addItem({ id, name, imageUrl, price, description, stock, ...args })
  }

  // TODO: check if the item is in stock | verify
  // // Check if the location is selected and if the item is in stock
  // useEffect(() => {
  //   // If the store is not selected, return
  //   if (!selected) return

  //   // If the item is not found, return
  //   const item = findItem(id)
  //   if (!item) return

  //   // If the stock is not found, return
  //   const stockSelected = findStock()
  //   if (!stockSelected) {
  //     deleteItem(id)
  //     return
  //   }

  //   if (item.quantity > stockSelected.quantity) {
  //     setQuantity(id, 1)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selected, setQuantity, findItem, id, findStock, removeItem])

  const priceTotal = useMemo(
    () => new Decimal(quantity).times(price).toFixed(2).toString(),
    [price, quantity]
  )

  return (
    <li key={id} className='relative overflow-hidden rounded bg-white pr-4'>
      <button onClick={() => deleteItem(id)} className='absolute right-2 top-2'>
        <X size={20} />
      </button>
      <img src={name} alt='' />
      <div className='flex items-center justify-between gap-3 p-3'>
        <img src={imageUrl} className='w-20 rounded' alt={name} />
        <div className='flex h-20 flex-col justify-between pb-0.5'>
          <div>
            <p className='line-clamp-1 font-bold'>{name}</p>
            <p className='line-clamp-1 text-sm text-gray-600'>{description}</p>
          </div>
          <div className='flex items-center justify-between'>
            <p key={id} className='font-semibold'>
              S/ {priceTotal}
            </p>
            <div className='flex select-none items-center'>
              <Button
                className='size-6'
                onClick={() =>
                  removeItem({
                    id,
                    name,
                    description,
                    imageUrl,
                    price,
                    stock,
                    ...args
                  })
                }
                variant='outline'
                size='icon'
              >
                <Minus size={12} />
              </Button>
              <p className='mx-2'>{quantity}</p>
              <Button
                className='size-6'
                onClick={handleAddItem}
                variant='outline'
                size='icon'
              >
                <Plus size={12} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CardStore
