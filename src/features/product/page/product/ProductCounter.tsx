import { Button } from '@/components/ui/button'
import { ProductLocationStock } from '@/model/ProductLocationStock.model'
import useProductCounter from './hook/useProductCounter.hook'

interface Props {
  productLocationStock: ProductLocationStock | undefined
}

const ProductCounter = ({ productLocationStock }: Props) => {
  const { count, handleDecrement, handleIncrement } = useProductCounter({
    max: productLocationStock?.quantity || 0
  })

  return (
    <div className='select-none space-y-4'>
      <div className='flex w-36 items-center justify-between gap-4'>
        <Button
          onClick={handleDecrement}
          className='select-none bg-gray-700 hover:bg-gray-800'
          disabled={count <= 1 || !productLocationStock}
        >
          -
        </Button>
        <span className='font-semibold'>{count}</span>
        <Button
          onClick={handleIncrement}
          className='select-none bg-gray-700 hover:bg-gray-800'
          disabled={
            !productLocationStock || count >= productLocationStock.quantity
          }
        >
          +
        </Button>
      </div>
    </div>
  )
}

export default ProductCounter
