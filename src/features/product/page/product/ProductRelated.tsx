import Skeleton from '@/components/shared/skeleton/Skeleton'
import { useGetRelatedProducts } from '../../hook/useProduct.hook'
import { Link } from 'react-router-dom'
import { PUBLIC_ROUTER } from '@/config/path'

interface Props {
  productId: number
}

const ProductRelated = ({ productId }: Props) => {
  // TODO: implemente customerId from user logged
  const { data, isLoading } = useGetRelatedProducts({ productId })

  return (
    <Skeleton isLoading={isLoading}>
      <div className='grid grid-cols-1 space-y-6'>
        {data?.map(product => (
          <Link
            to={`${PUBLIC_ROUTER.PRODUCTS}/${product.id}`}
            key={product.id}
            className='flex w-full gap-4 shadow transition-colors hover:bg-gray-200'
          >
            <img
              src={product.cardImage}
              alt={product.name}
              className='h-24 w-24 rounded-md object-cover'
            />
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg font-bold'>{product.name}</h3>
              <p className='text-sm text-gray-500'>{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </Skeleton>
  )
}

export default ProductRelated
